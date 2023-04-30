import { motion } from "framer-motion";
import sample1 from "../../assets/images/sample1.png";
import sample2 from "../../assets/images/sample2.png";
import Carousel from "../components/Carousel";
import MainLayout from "../layouts/MainLayout";
import type { NextPageWithLayout } from "./_app";
import { IconMail, IconMapPin, IconPhone } from "@tabler/icons";
import type { EmblaOptionsType } from "embla-carousel-react";
import Image from "next/image";
import { ReactElement } from "react";
import React from "react";
import { useInView } from "react-intersection-observer";

const Home: NextPageWithLayout = () => {
  const images = [sample1, sample2];

  const { ref: refTeams, inView: inViewTeams } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const { ref: refTournaments, inView: inViewTournaments } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const { ref: refPlayers, inView: inViewPlayers } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const options: EmblaOptionsType = {
    inViewThreshold: 0,
    loop: true,
    draggable: false,
  };

  return (
    <>
      <main className="h-screen w-full bg-dark-gray">
        <div className="fixed flex h-screen min-w-full flex-col items-center justify-center overflow-hidden">
          <Carousel images={images} options={options} />
        </div>
      </main>

      <main className="relative flex w-full flex-col items-center bg-dark-gray">
        <section className="my-8 text-white">
          <div className="container mx-auto flex flex-col items-center justify-center space-y-8 p-4 md:p-10 md:px-12 xl:px-24">
            <h1 className="text-center text-3xl font-bold leading-none md:text-5xl">
              All substance, <span className="text-red">little show</span>
            </h1>
            <p className="pt-2 pb-8 text-center text-xl font-medium">
              This is an environment where normal baseball players with big
              dreams show up to work consistently and ultimately transform
              themselves. We aim to mentor players who eventually get recruited.
              We are passionate, straight forward and very well informed. Our
              mission is to always be equipped to push you further.
            </p>
          </div>
        </section>
      </main>

      <main className="relative flex w-full flex-col items-center overflow-x-hidden bg-dark-gray">
        <section className="w-full bg-white p-4 dark:text-gray-100 lg:p-8">
          <div className="container mx-auto space-y-12">
            <motion.div
              ref={refTeams}
              initial="hidden"
              animate={inViewTeams ? "visible" : "hidden"}
              variants={{
                visible: { opacity: 1, x: 0 },
                hidden: { opacity: 0, x: "-2rem" },
              }}
              transition={{ duration: 1 }}
              className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row"
            >
              <Image
                src={sample2}
                className="h-80 w-auto object-cover dark:bg-gray-500"
                alt="Whiz Kids Photo"
              />
              <div className="flex flex-1 flex-col justify-center bg-dark-gray p-6">
                <h3 className="text-4xl font-bold">
                  Numerous Competitive Teams
                </h3>
                <div className="h-0.5 w-[30%] bg-red" />
                <p className="my-6 dark:text-gray-400">
                  We have 12 teams, which range from ages 12U to 18U. Each team
                  is equipped with a dedicated coaching staff and will have many
                  practices throughout the season
                </p>
              </div>
            </motion.div>
            <motion.div
              ref={refTournaments}
              initial="hidden"
              animate={inViewTournaments ? "visible" : "hidden"}
              variants={{
                visible: { opacity: 1, x: 0 },
                hidden: { opacity: 0, x: "2rem" },
              }}
              transition={{ duration: 1 }}
              className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row"
            >
              <Image
                src={sample1}
                className="block h-80 w-auto object-cover dark:bg-gray-500 lg:hidden"
                alt="Whiz Kids Photo"
              />
              <div className="flex flex-1 flex-col justify-center bg-dark-gray p-6">
                <h3 className="text-4xl font-bold">
                  Robust Tournament Schedule
                </h3>
                <div className="h-0.5 w-[30%] bg-red" />
                <p className="my-6 dark:text-gray-400">
                  Each team will play in 8+ summer tournaments and 6+ fall
                  tournaments ranging across the east coast to gain exposure.
                  These tournaments will consist of a combination of showcase
                  and tournaments, depending on the team&apos;s age
                </p>
              </div>
              <Image
                src={sample1}
                className="hidden h-80 w-auto object-cover dark:bg-gray-500 lg:block"
                alt="Whiz Kids Photo"
              />
            </motion.div>
            <motion.div
              ref={refPlayers}
              initial="hidden"
              animate={inViewPlayers ? "visible" : "hidden"}
              variants={{
                visible: { opacity: 1, x: 0 },
                hidden: { opacity: 0, x: "-2rem" },
              }}
              transition={{ duration: 1 }}
              className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row"
            >
              <Image
                src={sample2}
                className="h-80 w-auto object-cover dark:bg-gray-500"
                alt="Whiz Kids Photo"
              />
              <div className="flex flex-1 flex-col justify-center bg-dark-gray p-6">
                <h3 className="text-4xl font-bold">
                  Hundreds of Passionate Players
                </h3>
                <div className="h-0.5 w-[30%] bg-red" />
                <p className="my-6 dark:text-gray-400">
                  We are proud to have well over 300 active players within our
                  Whiz Kids family, and boast a large supporting alumni network
                  that frequently contribute to the organization today
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <main className="relative flex w-full flex-col items-center bg-dark-gray">
        <section className="w-full py-20 text-white">
          <div className="mx-auto grid max-w-6xl grid-cols-1 px-6 md:grid-cols-2 md:divide-x lg:px-8">
            <div className="py-6 md:py-0 md:px-6">
              <div className="py-8 text-dark-gray">
                <h1 className="text-3xl font-black uppercase tracking-wide text-white">
                  Get in touch
                </h1>
                <p className="text-md text-light-gray">
                  Fill in the form to start a conversation
                </p>
              </div>

              <div className="space-y-4">
                <p className="flex items-center">
                  <IconMapPin className="mr-2 h-8 w-8 justify-start p-1 text-red" />
                  <span>Conshohocken, PA 19428</span>
                </p>
                <p className="flex items-center">
                  <IconPhone className="mr-2 h-8 w-8 justify-start p-1 text-red" />
                  <span>(267) 228-3615</span>
                </p>
                <p className="flex items-center">
                  <IconMail className="mr-2 h-8 w-8 justify-start p-1 text-red" />
                  <span>angelabing@aol.com</span>
                </p>
              </div>
            </div>
            <form className="ng-untouched ng-pristine ng-valid flex flex-col space-y-6 py-6 md:py-0 md:px-6">
              {" "}
              <label className="block">
                <span className="mb-1">Full name</span>
                <input className="input-bordered input block h-10 w-full rounded-md bg-white font-semibold text-dark-gray shadow-sm" />
              </label>
              <label className="block">
                <span className="mb-1">Email address</span>
                <input className="input-bordered input block h-10 w-full rounded-md bg-white font-semibold text-dark-gray shadow-sm" />
              </label>
              <label className="block">
                <span className="mb-1">Message</span>
                <textarea className="text-md textarea-bordered textarea block w-full rounded-md bg-white font-semibold text-dark-gray"></textarea>
              </label>
              <button
                className="btn mx-3 self-center rounded-lg rounded border-none bg-gradient-to-r from-red to-secondary-red px-8 py-3 text-lg font-black uppercase tracking-wide text-white
                  text-white transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
              >
                Submit
              </button>
            </form>
          </div>
        </section>
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
