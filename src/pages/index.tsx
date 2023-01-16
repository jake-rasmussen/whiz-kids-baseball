import type { ReactElement } from "react";
import React, { useRef } from "react";
import type { NextPageWithLayout } from "./_app";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import sample from "../../assets/images/sample.png";
import banner from "../../assets/images/whizkidsbanner.png";
import Image from "next/image";
import MainLayout from "../components/layouts/MainLayout";
import { createStyles } from "@mantine/core";
import {
  IconChevronLeft,
  IconChevronRight,
  IconBallBaseball,
  IconUsers,
  IconCalendarEvent,
} from "@tabler/icons";
import ContactForm from "../components/contactForm";

const useStyles = createStyles((_theme, _params, getRef) => ({
  controls: {
    ref: getRef("controls"),
    transition: "opacity 150ms ease",
    opacity: 0,
  },
  control: {
    outline: 0,
    border: 0,
    background: "transparent",
    boxShadow: "none",
  },
  root: {
    "&:hover": {
      [`& .${getRef("controls")}`]: {
        opacity: 1,
      },
    },
  },
}));

const Home: NextPageWithLayout = () => {
  const autoplay = useRef(Autoplay({ delay: 5000 }));
  const { classes } = useStyles();
  const images = [sample, sample, sample];

  const slides = images.map((image, index) => {
    return (
      <React.Fragment key={`carousel${index}`}>
        <Carousel.Slide className="flex items-center">
          <Image
            className="mx-auto h-screen w-full object-cover "
            src={image}
            alt="Whiz Kids Photo"
          />
          <div className="absolute h-screen w-screen bg-gradient-to-b from-red to-white opacity-40" />
        </Carousel.Slide>
      </React.Fragment>
    );
  });

  const controllerIconSize = 35;

  return (
    <>
      <div className="h-screen w-screen">
        <main className="fixed flex h-screen flex-col items-center justify-center overflow-hidden">
          <Carousel
            classNames={classes}
            loop
            align="center"
            plugins={[autoplay.current]}
            controlsOffset="xs"
            nextControlIcon={
              <IconChevronRight color="white" size={controllerIconSize} />
            }
            previousControlIcon={
              <IconChevronLeft color="white" size={controllerIconSize} />
            }
            withIndicators={false}
          >
            {slides}
          </Carousel>

          <Image
            className="absolute h-auto w-[75vh] "
            src={banner}
            alt="Whiz Kids Banner"
            priority
          />
        </main>
      </div>

      <main className="relative flex flex-col items-center bg-dark-gray">
        <div className="container flex flex-col items-center pt-12 pb-16 text-center">
          <div className="inline-flex w-full items-center justify-center">
            <hr className="mt-8 h-1 w-96 -translate-y-4 border-0 bg-red" />
            <span className="absolute left-1/2 -translate-x-1/2 bg-dark-gray px-3 text-white">
              <h1 className="text-3xl font-extrabold uppercase tracking-wide text-white">
                About Us
              </h1>
            </span>
          </div>

          <h2 className="2pb-5 hidden text-lg tracking-wide text-light-gray sm:contents">
            All substance, little show. Get in the drivers seat
          </h2>

          <div className="text-left text-lg font-light lg:grid lg:grid-cols-2">
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
              <h5 className="text-md text-justify font-light text-white">
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

      <main className="relative grid bg-light-gray pb-3 lg:grid-cols-3 lg:p-0">
        <div className="group mt-3 flex w-full justify-center lg:m-5 lg:mx-2 lg:w-auto lg:justify-end">
          <div
            className="w-screen rounded-2xl p-5 px-[10%] transition duration-300 ease-in-out group-hover:bg-red
          lg:my-[10%] lg:w-[40vh] lg:border-dark-gray lg:bg-white lg:p-8 lg:shadow-lg lg:group-hover:scale-110"
          >
            <IconCalendarEvent
              size={55}
              className="text-red group-hover:text-white"
            />
            <div>
              <div className="block pt-5 text-xl font-black uppercase text-dark-gray lg:text-2xl">
                Competitive Teams
              </div>
              <div className="my-5 h-1 w-[30%] bg-red group-hover:bg-white" />
              <div className="leading-tight text-dark-gray group-hover:text-white lg:text-light-gray">
                We have 12 teams, which range from ages 12U to 18U. Each team is
                equipped with a dedicated coaching staff and will have many
                practices throughout the season
              </div>
            </div>
          </div>
        </div>

        <div className="group mt-3 flex justify-center lg:m-5 lg:mx-2 lg:justify-center">
          <div
            className="w-screen rounded-2xl p-5 px-[10%] transition duration-300 ease-in-out group-hover:bg-red 
          lg:my-[10%] lg:w-[40vh] lg:border-dark-gray lg:bg-white lg:p-8 lg:shadow-lg lg:group-hover:scale-110"
          >
            <IconBallBaseball
              size={55}
              className="text-red group-hover:text-white"
            />
            <div className="group">
              <div className="block pt-5 text-xl font-black uppercase text-dark-gray lg:text-2xl">
                Robust Tournament Schedule
              </div>
              <div className="my-5 h-1 w-[30%] bg-red group-hover:bg-white" />
              <div className="leading-tight text-dark-gray group-hover:text-white lg:text-light-gray">
                Each team will play in
                <span className="text-secondary-red group-hover:text-white">
                  {" "}
                  8+{" "}
                </span>
                summer and
                <span className="text-secondary-red group-hover:text-white">
                  {" "}
                  6+
                </span>{" "}
                fall tournaments ranging across the east coast to gain exposure
              </div>
            </div>
          </div>
        </div>

        <div className="group mt-3 flex justify-center lg:m-5 lg:mx-2 lg:justify-start">
          <div
            className="w-screen rounded-2xl p-5 px-[10%] transition duration-300 ease-in-out group-hover:bg-red
          lg:my-[10%] lg:w-[40vh] lg:border-dark-gray lg:bg-white lg:p-8 lg:shadow-lg lg:group-hover:scale-110"
          >
            <IconUsers size={55} className="text-red group-hover:text-white" />
            <div>
              <div className="block pt-5 text-xl font-black uppercase text-dark-gray lg:text-2xl">
                Hundreds of Passionate Players
              </div>
              <div className="my-5 h-1 w-[30%] bg-red group-hover:bg-white" />
              <div className="leading-tight text-dark-gray group-hover:text-white lg:text-light-gray">
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
