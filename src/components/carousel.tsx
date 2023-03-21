import banner from "../../assets/images/whizkidsbanner.png";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaOptionsType } from "embla-carousel-react";
import useEmblaCarousel from "embla-carousel-react";
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
            <div className="embla__slide" key={index}>
              <div className="absolute h-screen w-full bg-gradient-to-b from-red to-white opacity-40" />
              <Image
                priority
                className="h-screen object-cover"
                src={image}
                alt="Whiz Kids Photo"
              />
            </div>
          ))}
        </div>
        <button
          className="embla__prev absolute left-0 top-[50%] hidden md:block"
          onClick={scrollPrev}
        >
          <IconChevronLeft className="h-20 w-20 text-white" />
        </button>
        <button
          className="embla__next absolute right-0 top-[50%] hidden md:block"
          onClick={scrollNext}
        >
          <IconChevronRight className="h-20 w-20 text-white" />
        </button>
      </div>

      <Image
        className="absolute h-auto w-[75vh] "
        src={banner}
        alt="Whiz Kids Banner"
        priority
      />
    </>
  );
};

export default Carousel;
