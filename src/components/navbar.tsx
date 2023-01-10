import {
  createStyles,
  Header,
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
} from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";
import { IconPlaceholder } from "@tabler/icons";
import React from "react";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: "#FFF",
    fontWeight: 800,
    fontSize: theme.fontSizes.md,

    [theme.fn.smallerThan("sm")]: {
      height: 42,
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      color: "#CC0007",
    }),
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    borderRadius: theme.radius.md,
    color: "#FFF",

    ...theme.fn.hover({
      color: "#CC0007",
    }),

    "&:active": theme.activeStyles,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
    backgroundColor: "#1F1F1F",
    color: "#FFF",
    fontWeight: 800,
    fontSize: 50,
  },
}));

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

const NavBar: React.FC = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes } = useStyles();

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group noWrap align="flex-start">
        <div>
          <Text size="sm" weight={500}>
            {item.title}
          </Text>
          <Text size="xs" color="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Box pb={20}>
      <Header height={60} px="md" fixed={true} bg="#1F1F1F">
        <Group position="apart" sx={{ height: "100%" }}>
          <IconPlaceholder /> {/*TODO: Replace with Whiz Kids Logo*/}
          <Group
            sx={{ height: "100%" }}
            spacing={0}
            className={classes.hiddenMobile}
          >
            <a href="#" className={classes.link}>
              Home
            </a>
            <a href="#" className={classes.link}>
              Services
            </a>
            <HoverCard
              width={600}
              position="bottom"
              radius="md"
              shadow="md"
              withinPortal
            >
              <HoverCard.Target>
                <a href="#" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Teams
                    </Box>
                  </Center>
                </a>
              </HoverCard.Target>

              <HoverCard.Dropdown sx={{ overflow: "hidden" }}>
                <SimpleGrid cols={2} spacing={0}>
                  {links}
                </SimpleGrid>
              </HoverCard.Dropdown>
            </HoverCard>

            <a href="#" className={classes.link}>
              Pricing
            </a>
          </Group>
          <Group className={classes.hiddenMobile}>
            <Button variant="default">Log in</Button>
            <Button variant="default">Sign up</Button>
          </Group>
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>

      {/* Mobile/Small Screen View */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Whiz Kids"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea bg="#1F1F1F" sx={{ height: "calc(100vh - 60px)" }} mx="-md">
          <Divider my="sm" color="#C2C2C2" />

          <a href="#" className={classes.link}>
            Home
          </a>
          <a href="#" className={classes.link}>
            Services
          </a>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Teams
              </Box>
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>

          <a href="#" className={classes.link}>
            Pricing
          </a>

          <Divider my="sm" color="#C2C2C2" />

          <Group position="center" grow pb="xl" px="md">
            <Button variant="default">Log in</Button>
            <Button variant="default">Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
};

export default NavBar;
