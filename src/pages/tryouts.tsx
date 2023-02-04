import MainLayout from "../layouts/MainLayout";
import type { ReactElement } from "react";

import type { NextPageWithLayout } from "./_app";
import React from "react";
import { TextInput, Select, MultiSelect, Checkbox } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { IconSend } from "@tabler/icons";

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
      <main className="w-full bg-white py-12">
        <div className="inline-flex w-full items-center justify-center">
          <hr className="mt-8 h-1 w-[75%] -translate-y-4 border-0 bg-red" />
          <span className="absolute left-1/2 -translate-x-1/2 bg-white px-3 text-white">
            <h1 className="text-3xl font-extrabold uppercase tracking-wide text-dark-gray md:text-6xl">
              Tryouts
            </h1>
          </span>
        </div>

        <h5 className="mx-5 flex justify-center pt-[2vh] text-center text-base font-black uppercase tracking-wide text-light-gray">
          Interested in trying out? Check out our tryout schedule and fill out
          the form if you are interested
        </h5>
      </main>

      <main className="flex flex-col items-center pb-[5vh]">
        <table className="w-4/5 table-auto pb-[10vh] md:w-7/12 ">
          <thead>
            <tr className="w-full">
              <th className="py-2 px-5 text-base font-black text-red">
                Location
              </th>
              <th className="py-2 px-5 text-base font-black text-red">Date</th>
              <th className="py-2 px-5 text-base font-black text-red">Time</th>
            </tr>
          </thead>

          <tbody>
            {mockdata?.map((tryoutData: TryoutData, index) => {
              return (
                <React.Fragment key={index}>
                  <tr
                    className="border-y border-light-gray"
                    key={`tryout${index}`}
                  >
                    <td className="whitespace-nowrap py-2 text-center text-sm font-light text-dark-gray">
                      {tryoutData.location}
                    </td>
                    <td className="whitespace-nowrap py-2 text-center text-sm font-light text-dark-gray">
                      {tryoutData.date}
                    </td>
                    <td className="whitespace-nowrap py-2 text-center text-sm font-light text-dark-gray">
                      {tryoutData.time}
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </main>

      <main
        id="contact-form"
        className="relative mt-10 bg-dark-gray py-10 lg:px-4"
      >
        <div className="flex w-full flex-col items-center lg:mx-auto lg:max-w-6xl">
          <div className="mb-10 inline-flex w-full items-center justify-center">
            <hr className="mt-8 h-1 w-[40%] -translate-y-4 border-0 bg-red" />
            <span className="absolute left-1/2 -translate-x-1/2 bg-dark-gray px-3 text-center text-3xl font-bold uppercase tracking-wide text-white">
              Interest Form
            </span>
          </div>

          <div className="flex w-full flex-col lg:flex-row lg:space-x-20">
            <div className="flex w-full flex-col place-content-center space-y-3 py-5  ">
              <form className="mx-[4%] flex flex-col items-center gap-5 space-y-3 md:mx-20 lg:m-0">
                <div className="flex w-full flex-col place-content-start gap-5 md:flex-row">
                  <div className="w-full">
                    <h1 className="text-sm font-black uppercase tracking-wide text-white">
                      Player Name
                    </h1>
                    <TextInput placeholder="Name" />
                  </div>

                  <div className="w-full">
                    <h1 className="text-sm font-black uppercase tracking-wide text-white ">
                      Email
                    </h1>
                    <TextInput placeholder="info@example.com" />
                  </div>
                </div>

                <div className="flex w-full flex-row items-end justify-center gap-5">
                  <div className="flex w-full flex-col justify-end">
                    <h1 className="text-sm font-black uppercase tracking-wide text-white">
                      Which Team Are You Interested In?
                    </h1>
                    <Select
                      placeholder="Pick one"
                      data={[
                        {
                          value: "Whiz Kids National",
                          label: "Whiz Kids National",
                        },
                        {
                          value: "Whiz Kids American",
                          label: "Whiz Kids American",
                        },
                        {
                          value: "Whiz Kids Futures",
                          label: "Whiz Kids Futures",
                        },
                        { value: "Whiz Kids Stars", label: "Whiz Kids Stars" },
                      ]}
                      styles={(theme) => ({
                        item: {
                          // applies styles to selected item
                          "&[data-selected]": {
                            "&, &:hover": {
                              backgroundColor: theme.colors.red,
                              color: theme.white,
                            },
                          },

                          // applies styles to hovered item (with mouse or keyboard)
                          "&[data-hovered]": {},
                        },
                      })}
                    />
                  </div>
                </div>

                <div className="flex w-full flex-col place-content-start items-end gap-5 md:flex-row">
                  <div className="w-full">
                    <h1 className="text-sm font-black uppercase tracking-wide text-white ">
                      City or Town
                    </h1>
                    <TextInput placeholder="City or Town" />
                  </div>

                  <div className="w-full">
                    <h1 className="text-sm font-black uppercase tracking-wide text-white ">
                      Current School
                    </h1>
                    <TextInput placeholder="School" />
                  </div>

                  <div className="w-full">
                    <h1 className="text-sm font-black uppercase tracking-wide text-white ">
                      Date of Birth
                    </h1>
                    <DatePicker placeholder="Pick date" />
                  </div>
                </div>

                <div className="flex w-full flex-col items-center gap-5 md:flex-row">
                  <div className="w-full">
                    <h1 className="text-sm font-black uppercase tracking-wide text-white ">
                      Position
                    </h1>
                    <MultiSelect
                      placeholder="Position"
                      data={[
                        { label: "RHP", value: "RHP" },
                        { label: "LHP", value: "LHP" },
                        { label: "Cat", value: "Cat" },
                        { label: "1st", value: "1st" },
                        { label: "2nd", value: "2nd" },
                        { label: "SS", value: "SS" },
                        { label: "3rd", value: "3rd" },
                        { label: "LF", value: "LF" },
                        { label: "Cen", value: "Cen" },
                        { label: "RF", value: "RF" },
                      ]}
                      maxSelectedValues={3}
                      styles={(theme) => ({
                        item: {
                          // applies styles to selected item
                          "&[data-selected]": {
                            "&, &:hover": {
                              backgroundColor: theme.colors.red,
                              color: theme.white,
                            },
                          },

                          // applies styles to hovered item (with mouse or keyboard)
                          "&[data-hovered]": {},
                        },
                      })}
                    />
                  </div>
                  <div className="w-full">
                    <h1 className="text-sm font-black uppercase tracking-wide text-white ">
                      Bats
                    </h1>
                    <Select
                      placeholder="Bats"
                      data={[
                        { label: "Right", value: "right" },
                        { label: "Left", value: "left" },
                        { label: "Switch", value: "switch" },
                      ]}
                      styles={(theme) => ({
                        item: {
                          // applies styles to selected item
                          "&[data-selected]": {
                            "&, &:hover": {
                              backgroundColor: theme.colors.red,
                              color: theme.white,
                            },
                          },

                          // applies styles to hovered item (with mouse or keyboard)
                          "&[data-hovered]": {},
                        },
                      })}
                    />
                  </div>
                  <div className="flex w-full flex-col">
                    <h1 className="text-sm font-black uppercase tracking-wide text-white ">
                      Throws
                    </h1>
                    <Select
                      placeholder="Throws"
                      data={[
                        { label: "Right", value: "right" },
                        { label: "Left", value: "left" },
                      ]}
                      styles={(theme) => ({
                        item: {
                          // applies styles to selected item
                          "&[data-selected]": {
                            "&, &:hover": {
                              backgroundColor: theme.colors.red,
                              color: theme.white,
                            },
                          },

                          // applies styles to hovered item (with mouse or keyboard)
                          "&[data-hovered]": {},
                        },
                      })}
                    />
                  </div>
                </div>

                <div className="flex flex-row justify-center md:w-[50%]">
                  <Checkbox className="pr-5" size="md" color="red.8"></Checkbox>
                  <h1 className="text-center text-sm font-black uppercase tracking-wide text-white">
                    Have You Played With Whiz Kids Before?
                  </h1>
                </div>

                <div className="p-5">
                  <button
                    type="submit"
                    className="mx-auto flex max-w-min items-center justify-center space-x-1 rounded-full bg-red py-2 px-4 font-bold text-white transition duration-150 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-white  hover:text-red "
                  >
                    <IconSend /> <span className="px-2">Send</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
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
