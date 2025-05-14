#!/bin/python3

import os


TIME_COLS = 2
INIT_COL = 0

INPUT_DIR = 'out/bench_raw'
AVG_FILE = 'out/bench_avg.csv'


def process_output(rel_path: str) -> None:
    data: list[list[str]] = []

    with open(rel_path, 'r') as f:
        f_iter = iter(f)
        headers = next(f_iter).strip().split()[:TIME_COLS]
        for line in f_iter:
            line = line.strip()
            if not line:
                continue
            data.append(line.split(maxsplit=TIME_COLS))

    additional_headers = set()

    for row in data:
        options = row[TIME_COLS]
        for option in options.split():
            if option.startswith('-D'):
                key, _ = option.split('=', 1)
                additional_headers.add(key)

    headers.extend(sorted(additional_headers))

    out_rows = []
    for row in data:
        options = row[TIME_COLS]
        option_dict = {}
        for opt in options.split():
            if opt.startswith('-D'):
                key, value = opt.split('=', 1)
                option_dict[key] = value

        out_row = [str(float(val)) for val in row[:TIME_COLS]]
        for header in headers[TIME_COLS:]:
            out_row.append(option_dict.get(header, ''))
        out_rows.append(out_row)

    output_file = rel_path.replace('bench_raw/', 'bench_processed/')
    os.makedirs(os.path.dirname(output_file), exist_ok=True)

    print(f'Writing to {output_file}')
    with open(output_file, 'w', newline='') as out:
        col_widths = [max(len(row[i]) for row in out_rows) for i in range(len(headers))]
        col_widths = [max(len(header), width) for header, width in zip(headers, col_widths)]
        print(col_widths)

        def write_row(row):
            out.write(('  '.join('{:<{}}'.format(item, col_widths[i]) for i, item in enumerate(row))).strip() + '\n')

        write_row(headers)
        for row in out_rows:
            write_row(row)

    init_time_sum = 0
    for row in out_rows:
        init_time_sum += float(row[INIT_COL])

    avg_init_time = init_time_sum / len(out_rows)
    with open(AVG_FILE, 'a') as avg_file:
        avg_file.write(f'{rel_path[len(INPUT_DIR)+1:]:<25} {avg_init_time:.3f}\n')


if __name__ == '__main__':
    if os.path.exists(AVG_FILE):
        os.remove(AVG_FILE)

    for root, _, files in os.walk(INPUT_DIR):
        for file in files:
            if file.endswith('.csv'):
                rel_path = os.path.join(root, file)
                print(f'Processing {rel_path}')
                process_output(rel_path)
