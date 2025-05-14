#!/bin/bash

if [ -z "$1" ]; then
    echo "Usage: $0 <benchmark-executable>"
    exit 1
fi

BENCH_CMD=$1
RESULTS_HEADER="init_time run_time options"
RESULTS_FORMAT="%-12s %-12s %s\n"


get_results_file() {
    local dir=$1
    local sub=$2

    local test=$(basename "${dir}")

    local results_file="out/bench_raw/${test}/${sub}.csv"
    if [ ! -f "${results_file}" ]; then
        mkdir -p "$(dirname "${results_file}")"
    fi
    echo "${results_file}"
}


run_benchmark() {
    local dir=$1
    local sub=$2
    local options=$3

    echo "${dir}/${sub} with options: ${options}"

    pushd "${dir}/${sub}"
    res=$( ${BENCH_CMD} ${options} )
    popd

    if [ $? -ne 0 ]; then
        echo "Benchmark ${dir}/${sub} failed with options: ${options}"
        exit 1
    fi

    printf "${RESULTS_FORMAT}" \
        "$(echo "${res}" | cut -d';' -f1)" \
        "$(echo "${res}" | cut -d';' -f2)" \
        "${options}" \
    >> $( get_results_file "${dir}" "${sub}" )


    echo "-------------------------------"
}

run_benchmark_variants() {
    local dir=$1
    local sub=$2

    printf "${RESULTS_FORMAT}" ${RESULTS_HEADER} > $( get_results_file "${dir}" "${sub}" )

    if [ ! -f "${dir}/${sub}/variants.txt" ]; then
        echo "No variants.txt file found in ${dir}/${sub}"
        return
    fi

    echo "Running benchmarks in ${dir}/${sub}..."
    while IFS= read -r line; do
        run_benchmark "$dir" "$sub" "$line"
    done < "${dir}/${sub}/variants.txt"
}

run_benchmark_sub() {
    local dir=$1

    for sub in $(ls "${dir}"); do
        if [ -d "${dir}/${sub}" ]; then
            run_benchmark_variants "$dir" "$sub"
        else
            echo "Skipping non-directory ${dir}/${sub}"
        fi
    done
}

if [ -n "$2" ]; then
    if [ -d "$2" ]; then
        run_benchmark_sub "$2"
        exit 0
    else
        echo "Benchmark $2 does not exist."
        exit 1
    fi
fi


for dir in benchmarks/*/; do
    if [ -d "$dir" ]; then
        echo "Running benchmarks in ${dir}..."
        run_benchmark_sub "$dir"
    else
        echo "Skipping non-directory $dir"
    fi
done
