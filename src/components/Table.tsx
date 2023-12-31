import React, { useState, useMemo, useEffect } from 'react';
import Pagination from './Pagination';
import {
  PaginationState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  OnChangeFn,
} from '@tanstack/react-table';
import { rankItem } from '@tanstack/match-sorter-utils';




type TableProps = {
  children: React.ReactNode,
  data: any[];
  columns: any[];
  pageCount:number;
  pagination:{
    pageIndex:number
    pageSize:number
  }
  onPageChange?:  OnChangeFn<PaginationState>;
  globalFilter:string;
  isLoading?: boolean;
};

const fuzzyFilter = (row: any, columnId: string, value: string, addMeta: Function) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export const Table: React.FC<TableProps> = ({
  children,
  pageCount,
  pagination,
  data: tableData,
  columns: tableColumns,
  onPageChange,
  globalFilter,
 
  isLoading = false,
}) => {
  
  const data = useMemo(() => tableData, [tableData]);
  const columns = useMemo(() => tableColumns, [tableColumns]);

  const table = useReactTable({
    data,
    pageCount,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      globalFilter,
      pagination,

    },
    // onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: onPageChange,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    manualPagination: true,
    manualFiltering: true,
  });

  
  return (
    <div className="flex flex-col">
      <div className={`align-middle inline-block w-full overflow-hidden `}>
        <div className="sm:px-6 px-3 bg-white rounded-lg shadow-lg">
        {children}

          <div className="overflow-x-auto w-full ">
            <table className="w-full">
              <thead className="text-left border-b rounded-t-lg bg-gray-50">
                {table.getHeaderGroups().map((headerGroup, index) => (
                  <tr key={`${headerGroup.id}-tr-${index}`}>
                    {headerGroup.headers.map((header, i) => {
                      return (
                        <th
                          key={`${header.id}-th-${i}`}
                          colSpan={header.colSpan}
                          scope="col"
                          className="px-6 py-4 text-left text-xs font-medium text-gray-500"
                        >
                          {header.isPlaceholder ? null : (
                            <button
                              {...{
                                className: header.column.getCanSort()
                                  ? 'cursor-pointer select-none'
                                  : '',
                                onClick: header.column.getToggleSortingHandler(),
                              }}
                            >
                              <div className="flex items-center">
                                <span className="">
                                  {flexRender(header.column.columnDef.header, header.getContext())}
                                </span>

                                {/* sort icons  */}
                                {header.column.getCanSort() && (
                                  <div className="flex flex-col ml-3">
                                    {{
                                      asc: (
                                        <svg
                                          className="w-2 h-2"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 15l7-7 7 7"
                                          ></path>
                                        </svg>
                                      ),
                                      desc: (
                                        <svg
                                          className="w-2 h-2"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                          ></path>
                                        </svg>
                                      ),
                                      // @ts-ignore
                                    }[header.column.getIsSorted()] ?? (
                                      <>
                                        {' '}
                                        <svg
                                          className="w-2 h-2"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 15l7-7 7 7"
                                          ></path>
                                        </svg>
                                        <svg
                                          className="w-2 h-2"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                          ></path>
                                        </svg>
                                      </>
                                    )}
                                  </div>
                                )}
                              </div>
                            </button>
                          )}
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>
              <tbody className="">
                {/* if isLoading, use skeleton rows  */}
                {isLoading &&
                  [...Array(5)].map((_, i) => (
                    <tr key={i} className="border-b">
                      {table.getHeaderGroups()[0].headers.map((header, i) => {
                        return (
                          <td
                            key={`${header.id}-loader-${i}`}
                            colSpan={header.colSpan}
                            className="px-6 py-4 truncate"
                          >
                            <div className="flex items-center w-full">
                              <div className="text-sm text-gray-900 w-full">
                                <TdSkeleton />
                              </div>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                {!isLoading &&
                  table?.getRowModel()?.rows.map((row) => {
                    return (
                      <tr key={row.id + '_row'} className="border-b">
                        {row.getVisibleCells().map((cell, i) => {
                          return (
                            <td
                              key={`${cell.id}-${i}`}
                              className="truncate w-[200px] max-w-[200px] px-6 py-4 text-sm"
                            >
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                {!isLoading && !table?.getRowModel()?.rows?.length && (
                   //@ts-ignore
                  <tr className="border-b text-center" ><td colSpan={20} className='text-center h-40 max-w-[200px]'><div className='p-4'>Data Not found</div></td></tr>
                )}
              </tbody>
            </table>
          </div>

          <Pagination  maxDisplayedPages={5} table={table} />
        </div>
      </div>
    </div>
  );
};

const TdSkeleton = () => {
  return (
    <div className="w-full h-full">
      <div className="w-full h-5 bg-gray-200 animate-pulse"></div>
    </div>
  );
};

export default Table;
