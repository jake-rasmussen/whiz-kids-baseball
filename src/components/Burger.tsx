import { useEffect, useState } from "react";
import MenuList from "./MenuList";
import { AnimatePresence, motion } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons";

const BurgerMenu = (isAdmin: boolean) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleClickOutsideMenu(event: MouseEvent) {
      const menu = document.getElementById("menu");
      if (menu && !menu.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutsideMenu);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    };
  }, []);

  return (
    <div className="relative z-50">
      <button onClick={() => setIsOpen(!isOpen)}>
        <AnimatePresence>
          {isOpen ? (
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

      <MenuList isOpen={isOpen} isAdmin={isAdmin} />
    </div>
  );
};

export default BurgerMenu;
