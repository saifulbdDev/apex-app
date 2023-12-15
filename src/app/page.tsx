"use client";
import { useState, useMemo } from "react";
import Table from "@/components/Table";
import Image from "next/image";
import { DebouncedInput } from "@/components/DebouncedInput";
import { Company } from "@/types/company";
import { createColumnHelper, ColumnDef } from "@tanstack/react-table";
import { useGetCompanysQuery } from "@/features/company/companyApi";
const Home = () => {
  const [company_name, setCompanyName] = useState("");
  const [sort, setSort] = useState("");
  const { data, isLoading } = useGetCompanysQuery(
    { company_name, sort },
    {
      refetchOnMountOrArgChange: true
    }
  );

  const columnHelper = createColumnHelper<Company>();

  const columns = useMemo(
    () =>
      [
        columnHelper.accessor("company_name", {
          cell: (info) => (
            <span>{info.getValue() ? info.getValue() : "-"}</span>
          ),
          header: () => <span>Company Name</span>
        }),
        columnHelper.accessor("company_phone", {
          cell: (info) => (
            <span>{info.getValue() ? info.getValue() : "-"}</span>
          ),
          header: () => <span>company phone</span>
        }),
        columnHelper.accessor(
          (row) =>
            `${row?.address1 ? row?.address1 : "-"} ${
              row?.address2 ? row?.address2 : "-"
            }`,
          {
            id: "address",
            cell: (info) => (
              <span>{info.getValue() ? info.getValue() : "-"}</span>
            ),
            header: () => <span>Address</span>
          }
        )
      ] as ColumnDef<Company>[],
    []
  );
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Table
        globalFilter={company_name}
        isLoading={isLoading}
        data={data?.companys?.data || []}
        columns={columns}>
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
