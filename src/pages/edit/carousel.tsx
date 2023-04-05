import { useRouter } from "next/router";
import { useState, ReactElement } from "react";
import PracticeTable from "../../components/edit/team/PracticeTableEdit";
import Roster from "../../components/edit/Roster";
import TournamentTable from "../../components/edit/team/TournamentTableEdit";
import Loading from "../../components/Loading";
import Tab from "../../components/Tab";
import EditLayout from "../../layouts/editLayout";
import { api } from "../../utils/api";
import { NextPageWithLayout } from "../_app";

interface Props {
  teamId: number;
}

const Carousel: NextPageWithLayout<Props> = () => {
  return (
    <>
      <section className="w-full text-dark-gray">
        <div className="container flex h-full flex-col items-center justify-center px-4 py-16 text-center">
          <h1 className="px-5 text-4xl font-black uppercase text-red">
            Please Input Your Image Below
          </h1>
          <div className="flex flex-col p-10 text-left">
            <input
              type="file"
              className="file-input-red file-input-bordered file-input w-full"
            />
            <p className="tracking-none text-xs font-black uppercase text-light-gray">
              Minimum 1920x1080 and 16:9 Aspect Ratio
            </p>
          </div>
          <div className="flex flex-wrap justify-center p-10">
            <button className="btn">Submit</button>
          </div>
        </div>
      </section>
    </>
  );
};

Carousel.getLayout = (page: ReactElement) => {
  return (
    <>
      <EditLayout>{page}</EditLayout>
    </>
  );
};

export default Carousel;
