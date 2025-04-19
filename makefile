latexcmd = latexmk -shell-escape -pdf
chapters = $(wildcard chapters/*.tex)
template = thesis.tex titlepage.tex frontmatter.tex
deps = $(template) bibliography.bib $(chapters)
bench_exec = ${BENCH_EXEC}

.PHONY: all benchmarks pvc clean clean-all

all: thesis.pdf

benchmarks:
	cd assets; ./bench_runner.sh $(bench_exec) && ./bench_process.py

thesis.pdf: $(deps)
	$(latexcmd) $< < /dev/null

pvc: $(deps)
	-$(latexcmd) -pvc $< < /dev/null

clean:
	latexmk -c thesis.pdf

clean-all:
	latexmk -C thesis.pdf
