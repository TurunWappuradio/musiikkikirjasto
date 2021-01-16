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
      </div>
      <InfiniteScroll
        dataLength={rows.length}
        next={update}
        hasMore={true}
        loader={<h4>Hetkinen...</h4>}
      >
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

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
      </InfiniteScroll>
    </div>
  );
}

export default Table;
