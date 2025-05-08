#!/bin/bash

out_dir="./build"

function build() {
    local dir=$1

    dot "$dir/pre.dot" -Tpdf -Gmargin=0 -o "$out_dir/$dir-pre.pdf" \
    && dot "$dir/post.dot" -Tpdf -Gmargin=0 -o "$out_dir/$dir-post.pdf"
    if [ $? -ne 0 ]; then
        echo "Error: Failed to generate PDF for $dir"
        exit 1
    fi
}

mkdir -p "$out_dir"

for dir in */; do
    dir=`basename "$dir"`
    if [ -d "$dir" ] && [ "$dir" != "build" ]; then
        build "$dir"
    fi
done
