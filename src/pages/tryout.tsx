import sample from "../../assets/images/sample2.png";
import MainLayout from "../layouts/MainLayout";
import type { NextPageWithLayout } from "./_app";
import Image from "next/image";
import type { ReactElement } from "react";
import React from "react";

interface TryoutData {
  location: string;
  date: string;
  time: string;
  ages: string;
}

const Tryouts: NextPageWithLayout = () => {
  const mockdata: TryoutData[] = [
    {
      location: "Proving Grounds",
      date: "10/24/2023",
      time: "5:00PM",
      ages: "14U-17U",
    },
    {
      location: "Proving Grounds",
      date: "10/24/2023",
      time: "5:00PM",
      ages: "14U-17U",
    },
    {
      location: "Proving Grounds",
      date: "10/24/2023",
      time: "5:00PM",
      ages: "14U-17U",
    },
  ];

  return (
    <>
      <section className="relative w-full text-white">
        <div className="flex flex-col bg-dark-gray p-8 md:flex-row md:p-0">
          <div className="flex flex-col items-center justify-center space-y-8 bg-dark-gray p-4 md:min-h-[93vh] md:max-w-[40vh] md:p-10 md:px-12 lg:max-w-[60vh] xl:px-24">
            <h1 className="text-center text-4xl font-bold leading-none text-white lg:text-6xl">
              Interested in becoming a{" "}
              <span className="text-red">Whiz Kid</span>?
            </h1>
            <p className="pt-2 pb-8 text-center text-xl font-medium text-white lg:text-2xl">
              Check out our available tryout schedule below, and fill out the
              interest form below!
            </p>
          </div>
          <div className="lg:w-1/2 xl:w-3/5">
            <Image
              priority
              src={sample}
              alt="Whiz Kids Photo"
              className="fixed hidden h-full w-full object-cover md:block"
            />
          </div>
        </div>
      </section>

      <main className="relative flex flex-col items-center bg-white py-10 md:p-10 md:pb-20">
        <h1 className="p-4 text-center text-3xl font-black uppercase leading-none tracking-wide text-dark-gray md:text-4xl">
          Tryout Dates
        </h1>
        <table className="w-full table-auto md:w-7/12">
          <thead>
            <tr className="w-full">
              <th className="text-md px-5 font-black text-red md:text-xl">
                Location
              </th>
              <th className="text-md px-5 font-black text-red md:text-xl">
                Date
              </th>
              <th className="text-md px-5 font-black text-red md:text-xl">
                Time
              </th>
            </tr>
          </thead>

          <tbody>
            {mockdata?.map((tryoutData: TryoutData, index) => {
              return (
                <React.Fragment key={index}>
                  <tr
                    className="border-y border-light-gray text-dark-gray"
                    key={`tryout${index}`}
                  >
                    <td className="whitespace-nowrap py-8 text-center text-base font-light text-dark-gray md:text-lg">
                      {tryoutData.location}
                    </td>
                    <td className="whitespace-nowrap py-8 text-center text-base font-light text-dark-gray md:text-lg">
                      {tryoutData.date}
                    </td>
                    <td className="whitespace-nowrap py-8 text-center text-base font-light text-dark-gray md:text-lg">
                      {tryoutData.time}
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </main>

      <section className="relative bg-dark-gray p-6 text-light-gray">
        <form
          action=""
          className="ng-untouched ng-pristine ng-valid container mx-auto flex flex-col space-y-12"
        >
          <fieldset className="grid grid-cols-4 gap-6 rounded-md bg-dark-gray p-6 shadow-sm">
            <div className="col-span-full space-y-2 text-dark-gray lg:col-span-1">
              <p className="text-3xl font-black uppercase tracking-wide text-white">
                Interest Form
              </p>
              <p className="text-md text-light-gray">
                Thank you for your interest in Whiz Kids Baseball! We will get
                back to you as soon as possible after you submit the form
              </p>
            </div>
            <div className="col-span-full grid grid-cols-6 gap-4 lg:col-span-3">
              <div className="col-span-full sm:col-span-3">
                <label className="text-sm">Player Name</label>
                <input
                  type="name"
                  className="input-bordered input block w-full rounded-md bg-white font-black text-dark-gray shadow-sm"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label className="text-sm">Email</label>
                <input
                  type="email"
                  className="input-bordered input block w-full rounded-md bg-white font-black text-dark-gray shadow-sm"
                />
              </div>
              <div className="col-span-full">
                <label className="text-sm">
                  Which Team Are You Interested In?
                </label>
                <select
                  className="select-bordered select w-full bg-white text-base text-dark-gray"
                  defaultValue={"Pick One"}
                >
                  <option disabled value={"Pick One"}></option>{" "}
                  {/* // TODO: Use actual Team Data */}
                  <option value={"Whiz Kids American"}>
                    Whiz Kids American
                  </option>
                  <option value={"Whiz Kids Future"}>Whiz Kids Future</option>
                </select>
              </div>
              <div className="col-span-full sm:col-span-2">
                <label className="text-sm">City or Town</label>
                <input
                  type="home"
                  className="input-bordered input block w-full rounded-md bg-white font-black text-dark-gray shadow-sm"
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <label className="text-sm">Current School</label>
                <input
                  type="school"
                  className="input-bordered input block w-full rounded-md bg-white font-black text-dark-gray shadow-sm"
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <label className="text-sm">Date Of Birth</label>
                <input
                  type="home"
                  className="input-bordered input block w-full rounded-md bg-white font-black text-dark-gray shadow-sm"
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <label className="text-sm">Position (Up to 3)</label>
                <input
                  type="position"
                  className="input-bordered input block w-full rounded-md bg-white font-black text-dark-gray shadow-sm"
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <label className="text-sm">Bats</label>
                <select
                  className="select-bordered select w-full bg-white text-base text-dark-gray"
                  defaultValue={"Pick One"}
                >
                  <option disabled value={"Pick One"}></option>
                  <option value={"Right"}>Right</option>
                  <option value={"Left"}>Left</option>
                  <option value={"Both"}>Both</option>
                </select>
              </div>
              <div className="col-span-full sm:col-span-2">
                <label className="text-sm">Throws</label>
                <select
                  className="select-bordered select w-full bg-white text-base text-dark-gray"
                  defaultValue={"Pick One"}
                >
                  <option disabled value={"Pick One"}></option>
                  <option value={"Right"}>Right</option>
                  <option value={"Left"}>Left</option>
                </select>
              </div>
              <div className="form-control col-span-6 items-center">
                <label className="label cursor-pointer">
                  <span className="text-white">
                    Have You Played Whiz Kids Before?
                  </span>
                  <input type="checkbox" className="checkbox m-5 bg-white" />
                </label>
              </div>
              <div className="form-control col-span-2 col-start-3 items-center md:col-start-6">
                <button
                  className="btn m-5 mx-3 self-center rounded-lg rounded border-none bg-gradient-to-r from-red to-secondary-red px-8 py-3 text-lg font-black uppercase tracking-wide
                    text-light-gray transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                >
                  Submit
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      </section>
    </>
  );
};

Tryouts.getLayout = (page: ReactElement) => {
  return (
    <>
      <MainLayout>{page}</MainLayout>
    </>
  );
};

export default Tryouts;
