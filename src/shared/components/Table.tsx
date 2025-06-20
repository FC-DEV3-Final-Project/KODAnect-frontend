interface Column<T> {
  key: keyof T;
  header: string;
}

interface DynamicTableProps<T extends Record<string, any>> {
  data: T[];
  label: string;
  className?: string;
  columns?: Column<T>[];
  renderCell?: (key: keyof T, value: any, row: T) => React.ReactNode;
  onRowClick?: (row: T) => void;
}

export default function Table<T extends Record<string, any>>({
  data,
  label,
  className,
  columns,
  renderCell,
  onRowClick,
}: DynamicTableProps<T>) {
  const defaultKeys = data.length > 0 ? (Object.keys(data[0]) as (keyof T)[]) : [];
  const displayColumns: Column<T>[] = columns
    ? columns
    : defaultKeys.map((key) => ({ key, header: String(key) }));

  return (
    <div className="w-full">
      <table className={`w-full text-left ${className}`}>
        <caption className="sr-only">{label}</caption>
        <thead>
          <tr className="border-b border-secondary-10 bg-secondary-5">
            {displayColumns.map(({ key, header }) => (
              <th
                key={`${String(key)}-${header}`}
                className="px-p6 py-p5 text-h-2xs font-bold text-gray-95"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr className="border-b border-gray-20">
              <td
                colSpan={displayColumns.length || 1}
                className="px-p6 py-p5 text-center text-b-md text-gray-40"
              >
                검색 결과가 없습니다.
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="cursor-pointer border-b border-gray-20"
                onClick={() => onRowClick?.(row)}
              >
                {displayColumns.map(({ key }) => (
                  <td key={String(key)} className="px-p6 py-p5 text-b-md text-gray-70">
                    {renderCell ? renderCell(key, row[key], row) : row[key]?.toString()}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
