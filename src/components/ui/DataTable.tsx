interface DataTableProps {
  headers: string[];
  rows: (string | React.ReactNode)[][];
  source?: string;
  className?: string;
}

export function DataTable({ headers, rows, source, className }: DataTableProps) {
  return (
    <div className={className}>
      <div className="overflow-x-auto rounded-lg ring-1 ring-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-navy">
            <tr>
              {headers.map((header, i) => (
                <th
                  key={i}
                  className="px-4 py-3.5 text-left text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-white"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {rows.map((row, i) => (
              <tr key={i} className={i % 2 === 1 ? 'bg-cream/50' : ''}>
                {row.map((cell, j) => (
                  <td key={j} className="whitespace-nowrap px-4 py-3 text-sm leading-snug text-gray-700">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {source && (
        <p className="mt-2 text-right text-xs text-gray-500">Source: {source}</p>
      )}
    </div>
  );
}
