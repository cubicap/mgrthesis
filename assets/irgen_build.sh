#!/bin/bash

out_dir="out/irgen"

function build() {
    local dir=$1
    name=`basename "$dir"`

    dot "$dir/pre.dot" -Tpdf -Gmargin=0 -o "$out_dir/$name-pre.pdf" \
    && dot "$dir/post.dot" -Tpdf -Gmargin=0 -o "$out_dir/$name-post.pdf"

    if [ $? -ne 0 ]; then
        echo "Error: Failed to generate PDF for $dir"
        exit 1
    fi
}

mkdir -p "$out_dir"

for dir in irgen/*; do
    build "$dir"
done
