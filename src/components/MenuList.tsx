import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const MenuList = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <motion.ul
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      variants={{
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: '10px' },
      }}
      className="absolute top-full bg-white right-0 w-full mt-4"
      id='menu'
    >
      <div>
        <ul
          tabIndex={0}
          className="menu rounded-box absolute right-0 mt-4 w-52 bg-white p-4 text-xl shadow
          transition duration-300 ease-in-out"
        >
          <Link
            href="/"
            className="tracking-none btn-ghost btn text-3xl font-black text-dark-gray hover:text-red"
          >
            Home
          </Link>
          <Link
            href="/teams"
            className="tracking-none btn-ghost btn text-3xl font-black text-dark-gray hover:text-red"
          >
            Teams
          </Link>
          <Link
            href="/training"
            className="tracking-none btn-ghost btn text-3xl font-black text-dark-gray hover:text-red"
          >
            Training
          </Link>
          <Link
            href="/tryout"
            className="tracking-none btn-ghost btn text-3xl font-black text-dark-gray hover:text-red"
          >
            Tryout
          </Link>
          <Link
            href="/alumni/a"
            className="tracking-none btn-ghost btn text-3xl font-black text-dark-gray hover:text-red"
          >
            Alumni
          </Link>
        </ul>
      </div>
    </motion.ul>
  );
};

export default MenuList;