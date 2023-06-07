import { Dispatch, SetStateAction, useEffect, useState } from "react";
import MenuList from "./MenuList";
import { AnimatePresence, motion } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons";

type Props = {
  isAdmin: boolean;
  menuIsOpen: boolean;
  setMenuIsOpen: Dispatch<SetStateAction<boolean>>;
};

const BurgerMenu = ({ isAdmin, menuIsOpen, setMenuIsOpen }: Props) => {
  useEffect(() => {
    function handleClickOutsideMenu(event: MouseEvent) {
      const menu = document.getElementById("menu");
      if (menu && !menu.contains(event.target as Node)) {
        setMenuIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutsideMenu);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    };
  }, []);

  return (
    <>
      <div className="relative z-50">
        <button onClick={() => setMenuIsOpen(!menuIsOpen)}>
          <AnimatePresence>
            {menuIsOpen ? (
              <motion.div
                className="absolute top-0 right-0"
                key="first"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <IconX />
              </motion.div>
            ) : (
              <motion.div
                className="absolute top-0 right-0"
                key="second"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <IconMenu2 />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
      <MenuList
        isOpen={menuIsOpen}
        isAdmin={isAdmin}
        setIsOpen={setMenuIsOpen}
      />
    </>
  );
};

export default BurgerMenu;
