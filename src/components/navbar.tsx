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
          <Text className="text-md">{item.title}</Text>
          <Text className="text-sm text-[#C2C2C2]">{item.description}</Text>
        </div>
      </div>
    </UnstyledButton>
  ));

  return (
    <>
      <div className="fixed z-10 flex w-screen flex-row items-center justify-items-stretch bg-[#1F1F1F] p-3">
        <Image src={logo} alt="Whiz Kids Logo" className="mx-5 h-12 w-auto" />

        <div className="hidden grow flex-row md:flex">
          <a
            href="#"
            className="mx-2 block font-extrabold text-[#FFFFFF] hover:text-[#CC0007]"
          >
            Home
          </a>

          <HoverCard>
            <HoverCard.Target>
              <a
                href="#"
                className="mx-2 block font-extrabold text-[#FFFFFF] hover:text-[#CC0007]"
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
            className="mx-2 block font-extrabold text-[#FFFFFF] hover:text-[#CC0007]"
          >
            Training
          </a>
          <a
            href="#"
            className="mx-2 block font-extrabold text-[#FFFFFF] hover:text-[#CC0007]"
          >
            Tryouts
          </a>
          <a
            href="#"
            className="mx-2 block font-extrabold text-[#FFFFFF] hover:text-[#CC0007]"
          >
            Alumni
          </a>
        </div>

        <div className="hidden justify-self-end md:flex">
          <Button className="mx-3 bg-gradient-to-r from-[#CC0007] to-[#FF141A]">
            Log in
          </Button>
          <Button className="mx-3 bg-gradient-to-r from-[#CC0007] to-[#FF141A]">
            Sign up
          </Button>
        </div>

        <div className="flex grow justify-end md:hidden">
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            color="#FFFFFF"
            size={25}
            className="z-10"
          />
        </div>
      </div>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        withOverlay={false}
        title="Whiz Kids"
        className="z-0 h-[100%] w-[100%] p-md text-5xl font-extrabold text-[#1F1F1F] md:hidden"
      >
        <ScrollArea className="mx-8 h-[calc(100vh-120px)] text-[#C2C2C2]">
          <a
            href="#"
            className="my-2 block font-extrabold text-[#1F1F1F] hover:text-[#CC0007]"
          >
            Home
          </a>

          <UnstyledButton onClick={toggleLinks}>
            <Text className="my-2 block text-5xl font-extrabold text-[#1F1F1F] hover:text-[#CC0007]">
              Teams
            </Text>
          </UnstyledButton>

          <Collapse className="mx-5 p-5" in={linksOpened}>
            <div className="flex flex-col">{links}</div>
          </Collapse>

          <a
            href="#"
            className="my-2 block font-extrabold text-[#1F1F1F] hover:text-[#CC0007]"
          >
            Training
          </a>
          <a
            href="#"
            className="my-4 block font-extrabold text-[#1F1F1F] hover:text-[#CC0007]"
          >
            Tryouts
          </a>
          <a
            href="#"
            className="my-6 block font-extrabold text-[#1F1F1F] hover:text-[#CC0007]"
          >
            Alumni
          </a>

          <div className="mt-20 flex grow items-center justify-center">
            <Button className="mx-7 w-[30%] bg-gradient-to-r from-[#CC0007] to-[#FF141A]">
              Log in
            </Button>
            <Button className="mx-7 w-[30%] bg-gradient-to-r from-[#CC0007] to-[#FF141A]">
              Sign up
            </Button>
          </div>
        </ScrollArea>
      </Drawer>
    </>
  );
}
