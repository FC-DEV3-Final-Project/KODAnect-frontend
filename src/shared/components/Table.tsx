interface DynamicTableProps<T extends Record<string, any>> {
  data: T[];
  label: string;
  className?: string;
  columns?: (keyof T)[];
  renderCell?: (key: keyof T, value: any, row: T) => React.ReactNode;
}

export default function Table<T extends Record<string, any>>({
  data,
  label,
  className,
  columns,
  renderCell,
}: DynamicTableProps<T>) {
  const keys = columns || (data.length > 0 ? (Object.keys(data[0]) as (keyof T)[]) : []);

  return (
    <div className="w-full">
      <table className={`w-full text-left ${className}`}>
        <caption className="sr-only">{label}</caption>
        <thead>
          <tr className="border-b border-secondary-10 bg-secondary-5">
            {keys.map((key) => (
              <th key={String(key)} className="px-p6 py-p5 text-h-2xs font-bold text-gray-95">
                {String(key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-gray-20">
              {keys.map((key) => (
                <td key={String(key)} className="px-p6 py-p5 text-b-md text-gray-70">
                  {renderCell ? renderCell(key, row[key], row) : row[key]?.toString()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
