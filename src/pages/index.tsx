import type { ReactElement } from "react";
import { useRef } from "react";
import type { NextPageWithLayout } from "./_app";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import sampleImg1 from "../../assets/images/sample.jpg";
import sampleImg2 from "../../assets/images/sample2.webp";
import Image from "next/image";
import MainLayout from "../components/layouts/MainLayout";
import { createStyles } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons";

const useStyles = createStyles((_theme, _params, getRef) => ({
  controls: {
    ref: getRef("controls"),
    transition: "opacity 150ms ease",
    opacity: 0,
  },

  root: {
    "&:hover": {
      [`& .${getRef("controls")}`]: {
        opacity: 0.75,
      },
    },
  },
}));

const Home: NextPageWithLayout = () => {
  const autoplay = useRef(Autoplay({ delay: 5000 }));
  const { classes } = useStyles();
  const images = [sampleImg1, sampleImg2];
  const slides = images.map((image) => {
    return (
      <>
        <Carousel.Slide className="flex items-center">
          <Image
            className="mx-auto h-full w-full object-cover "
            src={image}
            alt="Whiz Kids Photo"
          />
        </Carousel.Slide>
      </>
    );
  });

  return (
    <>
      <main className="flex flex-col items-center justify-center">
        <Carousel
          classNames={classes}
          loop
          align="center"
          plugins={[autoplay.current]}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
          controlsOffset="xs"
          nextControlIcon={<IconChevronRight color="white" size={50} />}
          previousControlIcon={<IconChevronLeft color="white" size={50} />}
          //TODO: Remove border around control icon
        >
          {slides}
        </Carousel>
      </main>

      <main className="flex flex-col items-center bg-dark-gray">
        <div className="container flex flex-col items-center px-[5vh] pt-12 pb-16 text-center">
          <div className="inline-flex w-full items-center justify-center">
            <hr className="mt-8 h-px w-96 -translate-y-4 border-0 bg-red" />
            <span className="font-md absolute left-1/2 -translate-x-1/2 bg-dark-gray px-3 text-white">
              <h1 className="text-3xl font-extrabold uppercase tracking-wide text-white">
                About Us
              </h1>
            </span>
          </div>

          <h2 className="pb-5 text-lg tracking-wide text-light-gray">
            All substance, little show. Get in the drivers seat
          </h2>

          <div className="text-left text-lg font-light text-light-gray lg:grid lg:grid-cols-2">
            <div className="px-3 pt-5">
              <h5>
                At Whiz Kids baseball, we provide many resources to support
                success. Among all our teams we proivde...
              </h5>
              <div className="pl-10 text-sm">
                <ul className="list-disc tracking-wide text-light-gray marker:text-red">
                  <li>
                    Numerous tournaments and practices throughout the summer and
                    spring season
                  </li>
                  <li>
                    Year-round training clinics to work on various skillsets
                  </li>
                  <li>
                    A dedicated and experienced coaching staff throughout all
                    age groups
                  </li>
                </ul>
              </div>
            </div>

            <div className="px-3 pt-5">
              <h5 className="text-md text-left font-light text-white">
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

      <main className="flex flex-col items-center justify-center bg-gradient-to-b from-white to-light-gray pb-[10vh]">
        <div className="flex flex-col items-center gap-2 p-10">
          <h1 className="text-5xl text-[4rem] font-extrabold tracking-tight text-dark-gray">
            Contact Us
          </h1>
          <h5 className="block text-xs font-bold uppercase tracking-wide text-dark-gray">
            Interested in Whiz Kids and have any questions? Feel free to reach
            out to us!
          </h5>
        </div>

        <form action="#" method="POST" className="">
          <div className="max-w-[75vh] rounded-[40px] bg-dark-gray p-10">
            <div className="row-auto grid grid-cols-6 gap-6">
              <div className="col-span-3 my-2">
                <label
                  htmlFor="given-name"
                  className="mb-2 block text-xs font-bold uppercase tracking-wide text-white"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="given-name"
                  id="given-name"
                  autoComplete="given-name"
                  className="
                    bg-gray-200 
                    text-gray-700 
                    mb-3 
                    block 
                    w-full 
                    rounded-[10px]
                    border
                    border-red 
                    py-3 
                    px-4 
                    leading-tight 
                    focus:bg-white 
                    focus:outline-none
                  "
                />
              </div>

              <div className="col-span-3 my-2">
                <label
                  htmlFor="family-name"
                  className="mb-2 block text-xs font-bold uppercase tracking-wide text-white"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="family-name"
                  id="family-name"
                  autoComplete="family-name"
                  className="
                    bg-gray-200 
                    text-gray-700 
                    mb-3 
                    block 
                    w-full 
                    rounded-[10px]
                    border
                    border-red 
                    py-3 
                    px-4 
                    leading-tight 
                    focus:bg-white 
                    focus:outline-none
                  "
                />
              </div>

              <div className="col-span-4 my-2">
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-bold uppercase tracking-wide text-white"
                >
                  Email Address
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  autoComplete="email"
                  className="
                    bg-gray-200 
                    text-gray-700 
                    mb-3 
                    block 
                    w-full 
                    rounded-[10px]
                    border
                    border-red 
                    py-3 
                    px-4 
                    leading-tight 
                    focus:bg-white 
                    focus:outline-none
                  "
                />
              </div>

              <div className="col-span-2 my-2">
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-bold uppercase tracking-wide text-white"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  name="tel"
                  id="tel"
                  autoComplete="tel"
                  className="
                    bg-gray-200 
                    text-gray-700 
                    mb-3 
                    block 
                    w-full 
                    rounded-[10px]
                    border
                    border-red 
                    py-3 
                    px-4 
                    leading-tight 
                    focus:bg-white 
                    focus:outline-none
                  "
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="message"
                  className="mb-2 block text-xs font-bold uppercase tracking-wide text-white"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  autoComplete="message"
                  className="
                    bg-gray-200
                    text-gray-700 
                    mb-3
                    block 
                    min-h-[45px] 
                    w-full 
                    rounded-[10px]
                    border
                    border-red 
                    py-3 
                    px-4 
                    leading-tight 
                    focus:bg-white 
                    focus:outline-none
                  "
                />
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="
                    m-5
                    rounded-lg
                    bg-red
                    px-10
                    py-3
                    text-[20px]
                    font-medium 
                    text-white 
                    hover:bg-secondary-red
                  "
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </main>
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
