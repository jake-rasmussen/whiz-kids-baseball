import MainLayout from "../../layouts/mainLayout";
import type { NextPageWithLayout } from "../_app";
import Link from "next/link";
import type { ReactElement } from "react";
import React from "react";
import { useRouter } from "next/router";
import { api } from "../../utils/api";
import { Alumni } from "@prisma/client";
import LoadingComponent from "../../components/LoadingComponent";
import AlumniTable from "../../components/AlumniTable";
import Error from "next/error";

const getYearsAndSort = (alumni: Alumni[]) => {
  const alumniMap = new Map<number, Alumni[]>();

  alumni.forEach((alumn: Alumni) => {
    if (alumniMap.has(alumn.year)) {
      alumniMap.get(alumn.year)?.push(alumn);
    } else {
      alumniMap.set(alumn.year, [alumn]);
    }
  });

  return alumniMap;
};

const Alumni: NextPageWithLayout = () => {
  const router = useRouter();
  const page = ((router.query.letter as string) || "a").toUpperCase();

  const {
    data: alumni,
    isError,
    isLoading,
    error,
  } = api.alumni.getAlumniByLastNameLetter.useQuery(
    { letter: page },
    { refetchOnWindowFocus: false }
  );

  if (isError) {
    return <Error statusCode={error.data?.httpStatus || 500} />;
  }

  const pagination: [JSX.Element[], JSX.Element[], JSX.Element[]] = [
    [],
    [],
    [],
  ];
  const pageNumber: number = page.charCodeAt(0) - "A".charCodeAt(0) + 1;

  for (let i = 0; i < 26; i++) {
    let paginationRow = 0;

    if (i < 9) paginationRow = 0;
    else if (i < 17) paginationRow = 1;
    else paginationRow = 2;

    pagination[paginationRow]?.push(
      <React.Fragment key={i}>
        {i + 1 === pageNumber || (pageNumber == -31 && i === 0) ? (
          <li
            key={`key${i}`}
            className="scale-[175%] px-2 text-lg font-black text-red transition duration-300 ease-in-out sm:px-3 md:text-2xl"
          >
            <Link
              key={`link${i}`}
              href={`/alumni/${String.fromCharCode(65 + i).toLowerCase()}`}
            >
              {String.fromCharCode(65 + i)}
            </Link>
          </li>
        ) : (
          <li
            key={`key${i}`}
            className="px-2 text-lg font-black text-dark-gray transition duration-300 ease-in-out hover:scale-[150%] hover:text-red sm:px-3 md:text-2xl"
          >
            <Link
              key={`link${i}`}
              href={`/alumni/${String.fromCharCode(65 + i).toLowerCase()}`}
            >
              {String.fromCharCode(65 + i)}
            </Link>
          </li>
        )}
      </React.Fragment>
    );
  }

  const createAlumniSortedMap = (alumni: Alumni[]) => {
    const sortedAlumniMap = getYearsAndSort(alumni);
    return new Map([...sortedAlumniMap.entries()].sort().reverse());
  };

  return (
    <div className="flex flex-col overflow-x-scroll md:bg-dark-gray">
      <main className="mx-auto w-[85%] bg-white pt-12">
        <div className="inline-flex w-full items-center justify-center">
          <h1 className="text-center text-4xl font-black uppercase leading-none tracking-wide text-dark-gray lg:text-6xl">
            Alumni
          </h1>
        </div>
        <div className="divider"></div>
      </main>

      <main className="flex w-full items-center justify-center">
        <nav className="flex w-[85%] flex-row justify-center bg-white px-10 pb-12">
          <ul className="flex w-full flex-wrap items-center justify-center text-white">
            {pagination.map((row: JSX.Element[], index: number) => {
              return (
                <div
                  className="flex items-center justify-center"
                  key={`pagination${index}`}
                >
                  {row}
                </div>
              );
            })}
          </ul>
        </nav>
      </main>

      <main className="mx-auto flex min-h-[54vh] w-full flex-col items-center overflow-x-scroll bg-white md:w-[85%]">
        {isLoading ? (
          <div className="py-20">
            <LoadingComponent />
          </div>
        ) : (
          <div className="w-full items-center pb-10">
            {Array.from(createAlumniSortedMap(alumni).keys()).map(
              (key: number, index: number) => {
                return (
                  <div key={`key${index}`} className="w-full items-center pb-4">
                    <AlumniTable
                      letter={router.query.letter as string}
                      year={key}
                      alumni={createAlumniSortedMap(alumni)}
                    />
                  </div>
                );
              }
            )}
          </div>
        )}
      </main>
    </div>
  );
};

Alumni.getLayout = (page: ReactElement) => {
  return (
    <>
      <MainLayout>{page}</MainLayout>
    </>
  );
};

export default Alumni;
