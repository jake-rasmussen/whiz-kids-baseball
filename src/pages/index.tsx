import type { ReactElement } from "react";
import React from "react";
import type { NextPageWithLayout } from "./_app";
import Carousel from "../components/carousel";
import MainLayout from "../layouts/MainLayout";
import { IconBallBaseball, IconUsers, IconCalendarEvent } from "@tabler/icons";
import ContactForm from "../components/contactForm";

import sample1 from "../../assets/images/sample.png";
import sample2 from "../../assets/images/sample2.png";

import type { EmblaOptionsType } from "embla-carousel-react";

const Home: NextPageWithLayout = () => {
  const images = [sample1, sample2];
  const options: EmblaOptionsType = {
    inViewThreshold: 0,
    loop: true,
    draggable: false,
  };

  return (
    <>
      <div className="h-screen w-full bg-dark-gray">
        <main className="fixed flex h-screen min-w-full flex-col items-center justify-center overflow-hidden">
          <Carousel images={images} options={options} />
        </main>
      </div>

      <main className="relative flex w-full flex-col items-center bg-dark-gray">
        <div className="container flex flex-col items-center pt-12 pb-16 text-center">
          <div className="inline-flex w-full items-center justify-center">
            <hr className="mt-8 h-1 w-96 -translate-y-4 border-0 bg-red" />
            <span className="absolute left-1/2 -translate-x-1/2 bg-dark-gray px-3 text-white">
              <h1 className="text-3xl font-extrabold uppercase tracking-wide text-white">
                About Us
              </h1>
            </span>
          </div>

          <h2 className="2pb-5 hidden text-lg tracking-tight tracking-wide text-light-gray sm:contents">
            All substance, little show. Get in the drivers seat
          </h2>

          <div className="mx-5 text-left text-lg font-light lg:grid lg:grid-cols-2">
            <div className="px-3 pt-5 text-white">
              <h5>
                At Whiz Kids baseball, we provide many resources to support
                success. Among all our teams we proivde...
              </h5>
              <div className="pl-10 text-sm">
                <ul className="list-disc py-2 tracking-wide text-light-gray marker:text-red">
                  <li key="tournaments">
                    Numerous tournaments and practices throughout the summer and
                    spring season
                  </li>
                  <li key="training">
                    Year-round training clinics to work on various skillsets
                  </li>
                  <li key="coaches">
                    A dedicated and experienced coaching staff throughout all
                    age groups
                  </li>
                </ul>
              </div>
            </div>

            <div className="px-3 pt-5">
              <h5 className="text-justify text-lg font-light text-white">
                This is an environment where normal baseball players with big
                dreams show up to work consistently and ultimately transform
                themselves. We aim to mentor players who eventually get
                recruited. We are passionate, straight forward and very well
                informed. Our mission is to always be equipped to push you
                further.
              </h5>
            </div>
          </div>
        </div>
      </main>

      <main className="relative grid bg-white pb-3 lg:grid-cols-3 lg:bg-light-gray lg:p-0">
        <div className="group mt-3 flex w-full justify-center lg:m-5 lg:mx-2 lg:w-auto lg:justify-end">
          <div
            className="w-full p-5 px-12 md:px-[20%] lg:my-[10%] lg:ml-[4vw] lg:rounded-2xl lg:border-dark-gray lg:bg-white lg:p-8
          lg:shadow-lg lg:transition lg:duration-300 lg:ease-in-out lg:group-hover:scale-110 lg:group-hover:bg-red"
          >
            <IconCalendarEvent
              size={55}
              className="text-red lg:group-hover:text-white"
            />
            <div>
              <div className="block pt-5 text-xl font-black uppercase text-dark-gray lg:text-2xl">
                Competitive Teams
              </div>
              <div className="my-5 h-1 w-[30%] bg-red lg:group-hover:bg-white" />
              <div className="leading-tight text-dark-gray lg:text-light-gray lg:group-hover:text-white">
                We have 12 teams, which range from ages 12U to 18U. Each team is
                equipped with a dedicated coaching staff and will have many
                practices throughout the season
              </div>
            </div>
          </div>
        </div>

        <div className="group mt-3 flex w-full justify-center lg:m-5 lg:mx-2 lg:w-auto lg:justify-end">
          <div
            className="w-full p-5 px-12 md:px-[20%] lg:mx-[2vw] lg:my-[10%] lg:rounded-2xl lg:border-dark-gray lg:bg-white lg:p-8
          lg:shadow-lg lg:transition lg:duration-300 lg:ease-in-out lg:group-hover:scale-110 lg:group-hover:bg-red"
          >
            <IconBallBaseball
              size={55}
              className="text-red lg:group-hover:text-white"
            />
            <div>
              <div className="block pt-5 text-xl font-black uppercase text-dark-gray lg:text-2xl">
                Robust Tournament Schedule
              </div>
              <div className="my-5 h-1 w-[30%] bg-red lg:group-hover:bg-white" />
              <div className="leading-tight text-dark-gray lg:text-light-gray lg:group-hover:text-white">
                Each team will play in
                <span className="font-bold text-secondary-red lg:group-hover:text-white">
                  {" "}
                  8+{" "}
                </span>
                summer and
                <span className="font-bold text-secondary-red lg:group-hover:text-white">
                  {" "}
                  6+
                </span>{" "}
                fall tournaments ranging across the east coast to gain exposure
              </div>
            </div>
          </div>
        </div>

        <div className="group mt-3 flex w-full justify-center lg:m-5 lg:mx-2 lg:w-auto lg:justify-end">
          <div
            className="w-full p-5 px-12 md:px-[20%] lg:my-[10%] lg:mr-[4vw] lg:rounded-2xl lg:border-dark-gray lg:bg-white lg:p-8
          lg:shadow-lg lg:transition lg:duration-300 lg:ease-in-out lg:group-hover:scale-110 lg:group-hover:bg-red"
          >
            <IconUsers
              size={55}
              className="text-red lg:group-hover:text-white"
            />
            <div>
              <div className="block pt-5 text-xl font-black uppercase text-dark-gray lg:text-2xl">
                Hundreds of Passionate Players
              </div>
              <div className="my-5 h-1 w-[30%] bg-red lg:group-hover:bg-white" />
              <div className="leading-tight text-dark-gray lg:text-light-gray lg:group-hover:text-white">
                We are proud to have well over 300 active players within our
                organization, and a large supporting alumni network
              </div>
            </div>
          </div>
        </div>
      </main>

      <ContactForm />
    </>
  );
};

Home.getLayout = (page: ReactElement) => {
  return (
    <>
      <MainLayout>{page}</MainLayout>
    </>
  );
};

export default Home;
