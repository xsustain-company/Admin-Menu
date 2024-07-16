import React from 'react';

export const Filter = ({ column }: any) => {

  return (
    <>
      {column.Filter && (
        <div style={{ marginTop: 5 }}>
          {column.render('Filter')}
        </div>
      )}
    </>
  )
}

interface DefaultColumnProps {
  column?: any;
  filterValue?: any;
  setFilter?: any;
  preFilteredRows?: any;
}

export const DefaultColumnFilter = ({
  column: {
    filterValue,
    setFilter,
    preFilteredRows: { length },
  },
}: DefaultColumnProps) => {
  return (
    <input
      value={filterValue || ''}
      onChange={(e: any) => {
        setFilter(e.target.value || undefined);
      }}
      placeholder={`search (${length}) ...`}
    />
  );
};

interface SelectColumnFilterProps {
  column?: any;
  filterValue?: any;
  setFilter?: any;
  preFilteredRows?: any;
  id?: any;
}

export const SelectColumnFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id },
}: SelectColumnFilterProps) => {
  const options = React.useMemo(() => {
    const options: any = new Set();
    preFilteredRows.forEach((row: any) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <select
      id='custom-select'
      className="form-select"
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value=''>All</option>
      {options.map((option: any) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
