import banner from "../../assets/images/whizkidsbanner.png";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaOptionsType } from "embla-carousel-react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import React from "react";
import { useCallback } from "react";

type PropType = {
  options?: EmblaOptionsType;
  images: StaticImageData[];
};

const Carousel = (props: PropType) => {
  const { options, images } = props;

  const autoplay = Autoplay({ delay: 3500, stopOnInteraction: false });
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [autoplay]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
    emblaApi?.plugins().autoplay?.reset();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
    emblaApi?.plugins().autoplay?.reset();
  }, [emblaApi]);

  return (
    <>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container grid auto-cols-[100%] grid-flow-col">
          {images.map((image, index) => (
            <div className="embla__slide flex justify-center" key={index}>
              <div className="absolute z-20 h-[40rem] w-screen bg-gradient-to-b from-red to-white opacity-40 md:h-[60rem]" />
              <Image
                priority
                className="z-10 h-[40rem] object-cover md:h-[60rem]"
                src={image}
                alt="Whiz Kids Cover"
              />
            </div>
          ))}
        </div>
        <button
          className="embla__prev z-30 absolute left-0 top-[20rem] hidden transition duration-300 ease-in-out hover:scale-[200%] md:top-[30rem] lg:block"
          onClick={scrollPrev}
        >
          <IconChevronLeft className="h-20 w-20 text-white" />
        </button>
        <button
          className="embla__next z-30 absolute right-0 top-[20rem] hidden transition duration-300 ease-in-out hover:scale-[200%] md:top-[30rem] lg:block"
          onClick={scrollNext}
        >
          <IconChevronRight className="h-20 w-20 text-white" />
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 1.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="absolute mx-6 max-w-2xl lg:max-w-3xl xl:max-w-4xl"
      >
        <Image src={banner} alt="Whiz Kids Banner" className="z-50" priority />
      </motion.div>
    </>
  );
};

export default Carousel;
