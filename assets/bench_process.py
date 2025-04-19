#!/bin/python3

import os


def process_output(rel_path: str) -> None:
    data: list[list[str]] = []

    with open(rel_path, 'r') as f:
        f_iter = iter(f)
        headers = next(f_iter).strip().split()[:3]
        for line in f_iter:
            line = line.strip()
            if not line:
                continue
            data.append(line.split(maxsplit=3))

    additional_headers = set()

    for row in data:
        options = row[3]
        for option in options.split():
            if option.startswith('-D'):
                key, _ = option.split('=', 1)
                additional_headers.add(key)

    headers.extend(sorted(additional_headers))

    out_rows = []
    for row in data:
        count = 1

        options = row[3]
        option_dict = {}
        next_count = False
        for opt in options.split():
            if next_count:
                count = int(opt)
                next_count = False
            elif opt.startswith('-D'):
                key, value = opt.split('=', 1)
                option_dict[key] = value
            elif opt == '--count':
                next_count = True

        out_row = [str(float(val) / count * 1000) for val in row[:3]]
        for header in headers[3:]:
            out_row.append(option_dict.get(header, ''))
        out_rows.append(out_row)

    output_file = rel_path.replace('results/', 'processed/')
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


if __name__ == '__main__':
    for root, _, files in os.walk('results'):
        for file in files:
            if file.endswith('.csv'):
                rel_path = os.path.join(root, file)
                print(f'Processing {rel_path}')
                process_output(rel_path)
