import {
  createHashRouter,
  RouterProvider as VKRouterProvider,
} from "@vkontakte/vk-mini-apps-router";
import { routes } from "../appRoutes";
import { ReactNode } from "react";

const router = createHashRouter(routes.getRoutes());

interface RouterProviderProps {
  children: ReactNode;
}

export const RouterProvider = ({ children }: RouterProviderProps) => {
  return <VKRouterProvider router={router}>{children}</VKRouterProvider>;
};
