import { forwardRef } from 'react';
import { useTable } from 'react-table';
import InfiniteScroll from 'react-infinite-scroll-component';
import './TableStyle.scss';

const Table = ({
  columns,
  data,
  update,
  children,
  ref,
  hiddenColumns = [],
}) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
      initialState: { hiddenColumns },
    });

  return (
    <div className="TableRoot" ref={ref}>
      <div className="TableHeader">
        {children}
        <div className="columnMain">
          {headerGroups.map((headerGroup) => (
            <div
              className="columnNamesBox"
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <div className="columnNames" {...column.getHeaderProps()}>
                  {column.render('Header')}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <InfiniteScroll dataLength={rows.length} next={update} hasMore={true}>
        <table {...getTableProps()}>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        {rows.length === 0 && <p className="Table-nodata">Ei osumia :(</p>}
      </InfiniteScroll>
    </div>
  );
};

const TableRefForwarded = forwardRef((props, ref) => (
  <Table ref={ref} {...props} />
));

export default TableRefForwarded;
