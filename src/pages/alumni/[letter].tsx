import MainLayout from "../../layouts/MainLayout";
import type { NextPageWithLayout } from "../_app";
import Link from "next/link";
import type { ReactElement } from "react";
import React from "react";
import { useRouter } from "next/router";
import { api } from "../../utils/api";
import { Alumni } from "@prisma/client";
import Loading from "../../components/LoadingPage";

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
  } = api.alumni.getAlumniByLastNameLetter.useQuery(
    { letter: page },
    { refetchOnWindowFocus: false }
  );

  if (isLoading) {
    return <Loading />;
  } else if (isError) {
    return <div>Error...</div>;
  }

  const pagination = [];
  const pageNumber: number = page.charCodeAt(0) - "a".charCodeAt(0) + 1;

  for (let i = 0; i < 26; i++) {
    pagination.push(
      <React.Fragment key={i}>
        {i + 1 === pageNumber ? (
          <li
            key={`key${i}`}
            className="scale-[150%] px-3 font-black text-red transition duration-300 ease-in-out"
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
            className="px-3 font-black text-dark-gray transition duration-300 ease-in-out hover:scale-[150%] hover:text-red"
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

  let sortedAlumniMap = getYearsAndSort(alumni);
  sortedAlumniMap = new Map([...sortedAlumniMap.entries()].sort());

  return (
    <div className="flex flex-col md:bg-dark-gray">
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
            {pagination}
          </ul>
        </nav>
      </main>

      <main className="mx-auto flex min-h-[60vh] w-full flex-col items-center bg-white md:w-[85%]">
        {Array.from(sortedAlumniMap.keys()).map(
          (key: number, index: number) => {
            return (
              <div key={`key${index}`} className="w-full items-center">
                <table className="mx-auto w-[80%]">
                  <thead className="border-b border-dark-gray">
                    <tr>
                      <th className="text-left text-5xl font-black tracking-wide text-dark-gray">
                        {key}
                      </th>
                    </tr>
                    <tr>
                      <th className="py-2 text-base font-black text-red">
                        Player
                      </th>
                      <th className="py-2 text-base font-black text-red">
                        School or Organization
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedAlumniMap
                      .get(key)
                      ?.map((alumn: Alumni, alumnIndex: number) => {
                        return (
                          <tr
                            className="border-b border-dark-gray"
                            key={`alumn${key}${alumnIndex}`}
                          >
                            <td className="whitespace-nowrap py-2 text-center text-sm font-medium text-dark-gray">
                              {alumn.lastName + ", " + alumn.firstName}
                            </td>
                            <td className="whitespace-nowrap py-2 text-center text-sm font-light text-dark-gray">
                              {alumn.organization}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            );
          }
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
