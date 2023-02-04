import type { NextPage } from "next";
import type { ReactElement } from "react";

import type MainLayout from "../layouts/MainLayout";

export type pageWithMainLayoutType = NextPage & { layout: typeof MainLayout };

export type LayoutProps = ({
  children,
}: {
  children: ReactElement;
}) => ReactElement;

export default pageWithMainLayoutType;
