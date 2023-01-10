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
import ContactForm from "../components/contactForm";

const useStyles = createStyles((_theme, _params, getRef) => ({
  controls: {
    ref: getRef("controls"),
    transition: "opacity 150ms ease",
    opacity: 0,
  },

  root: {
    "&:hover": {
      [`& .${getRef("controls")}`]: {
        opacity: 1,
      },
    },
  },

  control: {
    outline: 0,
    border: 0,
    background: "transparent",
    boxShadow: "none",
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
          nextControlIcon={<IconChevronRight color="white" size={40} />}
          previousControlIcon={<IconChevronLeft color="white" size={40} />}
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
