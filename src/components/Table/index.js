import { useTable } from "react-table";
import InfiniteScroll from "react-infinite-scroll-component";
import './TableStyle.scss';

const Table = ({ columns, data, update, children }) => {
  // Use the state and functions returned from useTable to build your UI

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data
    }
  );

  // Render the UI for your table
  return (
    <div className="TableRoot">
      <div className="TableHeader">
        {children}
        <div className="columnMain">
          {headerGroups.map(headerGroup => (
            <div className="columnNamesBox" {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <div className="columnNames" {...column.getHeaderProps()}>
                  {column.render("Header")}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <InfiniteScroll
        dataLength={rows.length}
        next={update}
        hasMore={true}>
        <table {...getTableProps()}>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        {rows.length === 0 && (
          <p className="Table-nodata">
            Ei osumia :(
          </p>
        )}
      </InfiniteScroll>
    </div>
  );
}

export default Table;
