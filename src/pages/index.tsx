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
            alt="sample"
          />
          <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-black bg-fixed opacity-30" />
          <h1 className=" absolute top-0 left-0 right-0 bottom-0 flex  flex-col items-center justify-center text-7xl font-extrabold text-[#CC0007]">
            Whiz Kids Baseball
          </h1>
        </Carousel.Slide>
      </>
    );
  });

  return (
    <>
      <main className="flex flex-col items-center justify-center bg-gradient-to-b from-[#FFFFFF] to-[#C2C2C2]">
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

      <main className="flex flex-col items-center bg-[#1F1F1F] pb-5">
        <div className="container flex flex-col items-center gap-12 py-16 px-20 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[4rem]">
            <span className="font-extrabold text-[#FFFFFF]">About Us</span>
          </h1>
          <h5>
            <span className="text-[1.25rem] font-light text-[#C2C2C2]">
              We aren&rsquo;t one of those organizations that makes claims like
              &apos;Only the best play here.&apos; We aren&rsquo;t going to
              posture for your business by promising exposure or leveraging
              relationships with head coaches. As far as exposure goes, our
              stance is pretty straight forward. If you aren&rsquo;t driven to
              be the best version of yourself in the game of baseball, you will
              eventually get exposed.
              <br />
              <br />
              Great players get recruited. Great players can play anywhere and
              get recruited. Great players need guidance to push themselves
              beyond the scope of their immediate competitive standing. There is
              a good chance that you aren&rsquo;t currently great. Perhaps you
              dream of greatness. That&rsquo;s awesome. We will do our best to
              educate you on where y ou currenlty stand and guide you through
              the process of reaching your potential. Stop worrying about your
              opportunities and your exposure. Get in the drivers seat.
              <br />
              <br />
              This is an environment where normal baseball players with big
              dreams show up to work consistently and ultimately transform
              themselves. We aim to mentor players who eventually get recruited.
              <br />
              <br />
              We are passionate, straight forward and very well informed. Our
              mission is to always be equipped to push you further.
            </span>
          </h5>
        </div>
      </main>

      <main className="flex flex-col items-center justify-center bg-gradient-to-b from-[#FFFFFF] to-[#C2C2C2] pb-[10vh]">
        <div className="flex flex-col items-center gap-2 p-10">
          <h1 className="text-5xl text-[4rem] font-extrabold tracking-tight text-[#1F1F1F]">
            Contact Us
          </h1>
          <h5 className="block text-xs font-bold uppercase tracking-wide text-[#C2C2C2]">
            Interested in Whiz Kids and have any questions? Feel free to reach
            out to us!
          </h5>
        </div>

        <form action="#" method="POST" className="">
          <div className="max-w-[75vh] rounded-[40px] bg-[#1F1F1F] p-10">
            <div className="row-auto grid grid-cols-6 gap-6">
              <div className="col-span-3 my-2">
                <label
                  htmlFor="given-name"
                  className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#FFFFFF]"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="given-name"
                  id="given-name"
                  autoComplete="given-name"
                  className="
                    mb-3 
                    block 
                    w-full 
                    rounded-[10px] 
                    border 
                    border-[#CC0007]
                    bg-gray-200
                    py-3 
                    px-4 
                    leading-tight 
                    text-gray-700 
                    focus:bg-white 
                    focus:outline-none
                  "
                />
              </div>

              <div className="col-span-3 my-2">
                <label
                  htmlFor="family-name"
                  className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#FFFFFF]"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="family-name"
                  id="family-name"
                  autoComplete="family-name"
                  className="
                    mb-3 
                    block 
                    w-full 
                    rounded-[10px] 
                    border 
                    border-[#CC0007]
                    bg-gray-200
                    py-3 
                    px-4 
                    leading-tight 
                    text-gray-700 
                    focus:bg-white 
                    focus:outline-none
                  "
                />
              </div>

              <div className="col-span-4 my-2">
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#FFFFFF]"
                >
                  Email Address
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  autoComplete="email"
                  className="
                    mb-3 
                    block 
                    w-full 
                    rounded-[10px] 
                    border 
                    border-[#CC0007]
                    bg-gray-200
                    py-3 
                    px-4 
                    leading-tight 
                    text-gray-700 
                    focus:bg-white 
                    focus:outline-none
                  "
                />
              </div>

              <div className="col-span-2 my-2">
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#FFFFFF]"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  name="tel"
                  id="tel"
                  autoComplete="tel"
                  className="
                    mb-3 
                    block 
                    w-full 
                    rounded-[10px] 
                    border 
                    border-[#CC0007]
                    bg-gray-200
                    py-3 
                    px-4 
                    leading-tight 
                    text-gray-700 
                    focus:bg-white 
                    focus:outline-none
                  "
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="message"
                  className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#FFFFFF]"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  autoComplete="message"
                  className="
                    mb-3
                    block 
                    min-h-[45px]
                    w-full 
                    rounded-[10px] 
                    border 
                    border-[#CC0007]
                    bg-gray-200
                    py-3 
                    px-4 
                    leading-tight 
                    text-gray-700 
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
                    bg-[#CC0007]
                    px-10
                    py-3
                    text-[20px]
                    font-medium 
                    text-white 
                    hover:bg-[#FF141A]
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
