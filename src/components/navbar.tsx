import {
  HoverCard,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
} from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import logo from "../../assets/images/logo.png";

const mockdata = [
  {
    title: "Team 1",
    description: "This Pokémon’s cry is very loud and distracting",
  },
  {
    title: "Team 2",
    description: "The fluid of Smeargle’s tail secretions changes",
  },
  {
    title: "Team 3",
    description: "Yanma is capable of seeing 360 degrees without",
  },
  {
    title: "Team 4",
    description: "The shell’s rounded shape and the grooves on its.",
  },
  {
    title: "Team 5",
    description: "This Pokémon uses its flying ability to quickly chase",
  },
  {
    title: "Team 6",
    description: "Combusken battles with the intensely hot flames it spews",
  },
];

export default function NavBar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);

  const links = mockdata.map((item) => (
    <UnstyledButton key={item.title}>
      <div className="flex-no-wrap flex-start">
        <div>
          <Text className="text-md font-extrabold text-dark-gray hover:text-red">
            {item.title}
          </Text>
          <Text className="text-sm text-light-gray">{item.description}</Text>
        </div>
      </div>
    </UnstyledButton>
  ));

  return (
    <>
      <div className="fixed z-10 flex w-screen flex-row items-center justify-items-stretch bg-white p-3 shadow-2xl">
        <Image src={logo} alt="Whiz Kids Logo" className="mr-5 h-12 w-auto" />

        <div className="hidden grow flex-row text-lg md:flex">
          <a
            href="#"
            className="link link-underline link-underline-black mx-2 block font-extrabold text-dark-gray hover:text-red"
          >
            Home
          </a>

          <HoverCard>
            <HoverCard.Target>
              <a
                href="#"
                className="link link-underline link-underline-black mx-2 block font-extrabold text-dark-gray hover:text-red"
              >
                Teams
              </a>
            </HoverCard.Target>

            <HoverCard.Dropdown className="mt-4">
              <SimpleGrid cols={2}>{links}</SimpleGrid>
            </HoverCard.Dropdown>
          </HoverCard>

          <a
            href="#"
            className="link link-underline link-underline-black mx-2 block font-extrabold text-dark-gray hover:text-red"
          >
            Training
          </a>
          <a
            href="#"
            className="link link-underline link-underline-black mx-2 block font-extrabold text-dark-gray hover:text-red"
          >
            Tryouts
          </a>
          <a
            href="#"
            className="link link-underline link-underline-black mx-2 block font-extrabold text-dark-gray hover:text-red"
          >
            Alumni
          </a>
        </div>

        <div className="hidden justify-self-end md:flex">
          <Button
            className="mx-3 bg-gradient-to-r from-red to-secondary-red
            transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
          >
            Log in
          </Button>
          <Button
            className="mx-3 bg-gradient-to-r from-red to-secondary-red
            transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
          >
            Sign up
          </Button>
        </div>

        <div className="flex grow justify-end md:hidden">
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            color="black"
            size={25}
            className="z-10"
          />
        </div>
      </div>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        withOverlay={false}
        withCloseButton={false}
        className="z-0 flex h-[100%] w-[100%] justify-center p-md text-5xl font-extrabold text-dark-gray md:hidden"
      >
        <ScrollArea className="mx-8 mt-[12vh] h-[calc(100vh-120px)] text-center text-dark-gray">
          <a
            href="#"
            className="my-2 block font-extrabold text-dark-gray hover:text-red"
          >
            Home
          </a>

          <UnstyledButton onClick={toggleLinks}>
            <Text className="my-2 block text-5xl font-extrabold text-dark-gray hover:text-red">
              Teams
            </Text>
          </UnstyledButton>

          <Collapse className="mx-5 p-5" in={linksOpened}>
            <div className="flex flex-col">{links}</div>
          </Collapse>

          <a
            href="#"
            className="my-2 block font-extrabold text-dark-gray hover:text-red"
          >
            Training
          </a>
          <a
            href="#"
            className="my-4 block font-extrabold text-dark-gray hover:text-red"
          >
            Tryouts
          </a>
          <a
            href="#"
            className="my-6 block font-extrabold text-dark-gray hover:text-red"
          >
            Alumni
          </a>

          <div className="mt-20 flex grow items-center justify-center">
            <Button
              className="mx-7 flex bg-gradient-to-r from-red to-secondary-red px-20 text-center
              transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
            >
              Log in
            </Button>
            <Button
              className="mx-7 flex bg-gradient-to-r from-red to-secondary-red px-20 text-center
              transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
            >
              Sign up
            </Button>
          </div>
        </ScrollArea>
      </Drawer>
    </>
  );
}
