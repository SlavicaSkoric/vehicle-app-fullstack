import React, { useMemo, useEffect, useState } from 'react';
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
} from 'react-table';
// Below is the import for the first draft static DB.
// import vehicles from '../Common/vehicles.json';
import { ColumnFilter } from './ColumnFilter';
import { COLUMNS } from './columns';
import { GlobalFilter } from './GlobalFilter';
import './table.css';
import EntryEditor from './EntryEditor';
import axios from 'axios';

// Table created with React Table.

export const Table = () => {
  // Fetching data from MongoDB Atlas.

  const [vehiclesData, setVehiclesData] = useState([]);

  const fetchVehiclesData = async () => {
    const response = await axios
      // heroku fix
      .get('https://vehicle-app-fullstack.herokuapp.com:80')
      // hardcoded
      // .get('http://localhost:3001')
      .catch((err) => console.log(err));

    if (response) {
      const vehicles = response.data;

      console.log('Vehicles: ', vehicles);
      setVehiclesData(vehicles);
    }
  };

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => [...vehiclesData], [vehiclesData]);

  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state;

  useEffect(() => {
    fetchVehiclesData();
  }, []);

  return (
    <>
      <h1 className='my-4'>Vehicle App Mono</h1>
      <img
        src='https://cdn-icons-png.flaticon.com/512/3774/3774278.png'
        alt=''
        className='w-25'
      />
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <div>
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔼'
                          : ' 🔽'
                        : ' 🔽🔼'}
                    </span>
                  </div>
                  {/* <div>{column.canFilter ? column.render('Filter') : null}</div> */}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
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
        <tfoot>
          {footerGroups.map((footerGroup) => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map((column) => (
                <td {...column.getFooterProps}>{column.render('Footer')}</td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className='m-4'>
        <div>
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
          <span>
            | Go to page:{' '}
            <input
              type='number'
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const pageNumber = e.target.value
                  ? Number(e.target.value) - 1
                  : 0;
                gotoPage(pageNumber);
              }}
              style={{ width: '50px' }}
            />
          </span>
        </div>
        <div className='m-4'>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[10, 25, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className='m-4'>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </button>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </button>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {'>>'}
          </button>
        </div>
      </div>
      <EntryEditor />
    </>
  );
};
