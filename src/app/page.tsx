"use client";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Table from "@/components/Table";
import { DebouncedInput } from "@/components/DebouncedInput";
import { Company, PaginationState } from "@/types/company";
import { createColumnHelper, ColumnDef } from "@tanstack/react-table";
import { useGetCompanysQuery } from "@/features/company/companyApi";



const Home = () => {
 
  const [{ pageIndex, pageSize }, setPagination] =
  useState<PaginationState>({
    pageIndex: 0,
    pageSize:5
  })
  const [company_name, setCompanyName] = useState('');

  const { data, isLoading } = useGetCompanysQuery(
    { company_name, currentPage:pageIndex+1 },
    {
      refetchOnMountOrArgChange: true,
    }
  );

 

  useEffect(() => {
  
    setPagination((prevState) => ({
      ...prevState,
      pageIndex: 0,
    }));
 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company_name])


  const pagination: PaginationState = {
    pageIndex: pageIndex,
    pageSize: pageSize,
  };

  const totalPage = Math.ceil((data?.companys?.total || 0) / pageSize);

  const columnHelper = createColumnHelper<Company>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("company_name", {
        cell: (info) => <span>{info.getValue() || "-"}</span>,
        header: () => <span>Company Name</span>,
      }),
      columnHelper.accessor("company_phone", {
        cell: (info) => <span>{info.getValue() || "-"}</span>,
        header: () => <span>Company Phone</span>,
      }),
      columnHelper.accessor(
        (row) => `${row?.address1 || "-"} ${row?.address2 || "-"}`,
        {
          id: "address",
          cell: (info) => <span className="truncate">{info.getValue() || "-"}</span>,
          header: () => <span>Address</span>,
        }
      ),
    ] as ColumnDef<Company>[],
    []
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Table
        onPageChange={setPagination}
        globalFilter={company_name}
        isLoading={isLoading}
        pageCount={totalPage}
        pagination={pagination}
        data={data?.companys?.data || []}
        
        columns={columns}
      >
        <div className="flex">
          <DebouncedInput
            value={company_name}
            onChange={(value: string) => setCompanyName(String(value))}
            placeholder="Search"
          />
        </div>
      </Table>
    </main>
  );
};

export default Home;