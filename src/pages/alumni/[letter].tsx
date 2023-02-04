import MainLayout from "../../layouts/MainLayout";
import type { ReactElement } from "react";

import type { NextPageWithLayout } from "../_app";
import type { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";

interface Props {
  letter: string;
}

interface AlumniData {
  name: string;
  team: string;
  year: number;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const letter = context.params?.letter as string;

  return {
    props: {
      letter,
    },
  };
};

const getYearsAndSort = (data: AlumniData[]) => {
  const dataMap = new Map();

  for (let i = 0; i < data.length; i++) {
    if (!data[i]) {
      return;
    } else if (dataMap.has(data[i]?.year)) {
      dataMap
        .get(data[i]?.year)
        .push({ name: data[i]?.name, team: data[i]?.team });
    } else {
      dataMap.set(data[i]?.year, [
        { name: data[i]?.name, team: data[i]?.team },
      ]);
    }
  }

  const sortedMap = new Map([...dataMap.entries()].sort());
  return Array.from(sortedMap).reverse();
};

const Alumni: NextPageWithLayout<Props> = ({ letter }) => {
  const page = letter.charCodeAt(0) - 26 - 70; // 97 is hexadecimal for 'a'

  if (page > 26) {
    // TODO redirect to 404
  }

  const mockdata: AlumniData[] = [
    { name: "Adam Estrada", team: "USciences", year: 2019 },
    { name: "Adam Exc", team: "USciences", year: 2019 },
    { name: "Andrew Sicinski", team: "UMBC", year: 2019 },
    { name: "Anthony Morabito", team: "Georgetown University", year: 2015 },
    { name: "Addison Bliss", team: "Bucknell University", year: 2013 },
    { name: "Mike Siani", team: "Cincinnati Reds", year: 2018 },
  ];

  const curData: AlumniData[] = mockdata.filter(
    (data) => data.name.charAt(0).toLowerCase() === letter
  );
  const sortedData = getYearsAndSort(curData);

  const paginationTable = [];

  for (let i = 0; i < 26; i++) {
    paginationTable.push(
      <React.Fragment key={i}>
        {i + 1 === page ? (
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

  return (
    <div className="flex flex-col md:bg-dark-gray">
      <main className="mx-auto w-[85%] bg-white py-12">
        <div className="inline-flex w-full items-center justify-center">
          <hr className="mt-8 h-1 w-[75%] -translate-y-4 border-0 bg-red" />
          <span className="absolute left-1/2 -translate-x-1/2 bg-white px-3 text-white">
            <h1 className="text-3xl font-extrabold uppercase tracking-wide text-dark-gray md:text-6xl">
              Alumni
            </h1>
          </span>
        </div>
      </main>

      <main className="flex w-full items-center justify-center">
        <nav className="flex w-[85%] flex-row justify-center bg-white px-10 pb-12">
          <ul className="flex w-full flex-wrap items-center justify-center text-white">
            {paginationTable}
          </ul>
        </nav>
      </main>

      <main className="mx-auto flex min-h-[60vh] w-full flex-col items-center bg-white md:w-[85%]">
        {sortedData?.map((data: [][], index) => {
          return (
            <div className="pb-10 md:w-[60%]" key={`${index}${letter}`}>
              <table className="w-full table-auto">
                <thead className="border-b border-dark-gray">
                  <tr>
                    <th className="text-left text-5xl font-black tracking-wide text-dark-gray">
                      {data[0]}
                    </th>
                  </tr>
                  <tr className="">
                    <th className="py-2 text-base font-black text-red">
                      Player
                    </th>
                    <th className="py-2 text-base font-black text-red">
                      School or Organization
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {data[1]?.map((playerInfo: AlumniData, playerIndex) => {
                    return (
                      <tr
                        className="border-b border-dark-gray"
                        key={`${data[0]}${letter}${playerIndex}`}
                      >
                        <td className="whitespace-nowrap py-2 text-center text-sm font-medium text-dark-gray">
                          {playerInfo.name}
                        </td>
                        <td className="whitespace-nowrap py-2 text-center text-sm font-light text-dark-gray">
                          {playerInfo.team}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })}
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
