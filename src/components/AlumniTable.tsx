import { Alumni } from "@prisma/client";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";

type PropType = {
  letter: string;
  year: number;
  alumni: Map<number, Alumni[]>;
};

const AlumniTable = (props: PropType) => {
  const { letter, year, alumni } = props;

  return (
    <motion.div
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1 },
      }}
      transition={{ duration: 0.2 }}
      initial="initial"
      animate="animate"
      exit="initial"
      key={`${year}-${letter}`}
    >
      <table className="mx-auto w-[70%]" key={`${year}-${letter}`}>
        <thead className="border-b border-dark-gray">
          <tr>
            <th className="text-left text-5xl font-black tracking-wide text-dark-gray">
              {year}
            </th>
          </tr>
          <tr>
            <th className="py-2 text-base font-black text-red">Player</th>
            <th className="py-2 text-base font-black text-red">
              School or Organization
            </th>
          </tr>
        </thead>
        <tbody>
          {alumni.get(year)?.map((alumn: Alumni, alumnIndex: number) => {
            return (
              <tr
                className="border-b border-dark-gray"
                key={`alumn${year}${alumnIndex}`}
              >
                <td className="whitespace-nowrap py-2 text-center text-sm font-medium text-dark-gray">
                  {alumn.lastName + ", " + alumn.firstName}
                </td>
                <td className="whitespace-nowrap py-2 text-center text-sm font-light text-dark-gray">
                  {alumn.organization}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </motion.div>
  );
};

export default AlumniTable;
