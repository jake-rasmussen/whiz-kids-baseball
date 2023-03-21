import type MainLayout from "../layouts/MainLayout";
import type { NextPage } from "next";
import type { ReactElement } from "react";

export type pageWithMainLayoutType = NextPage & { layout: typeof MainLayout };

export type LayoutProps = ({
  children,
}: {
  children: ReactElement;
}) => ReactElement;

export default pageWithMainLayoutType;
