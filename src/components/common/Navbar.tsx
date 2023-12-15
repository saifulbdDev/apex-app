/* eslint-disable react-hooks/exhaustive-deps */
"use client"; // This is a client component

import { useEffect } from "react";
import Link from "next/link";

export default function Example() {
 
  return (
    <header className="bg-red-600">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between py-3 lg:px-10"
        aria-label="Global">
        <Link href="/" className="-m-1.5 p-1.5">
          <span className="sr-only">Your Company</span>
          <h2 className="text-2xl text-white">Saiful</h2>
        </Link>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white dark:text-white">
            <span className="sr-only">Open main menu</span>
            {/* <Bars3Icon className="h-6 w-6" aria-hidden="true" /> */}
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <div className="relative text-left lg:inline-block">
           
          </div>
        </div>
      </nav>
    </header>
  );
}
