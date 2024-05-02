import { View } from "@vkontakte/vkui";
import { useActiveVkuiLocation } from "@vkontakte/vk-mini-apps-router";

import { DEFAULT_VIEW_PANELS } from "../appRoutes";
import "../styles/BaseLayout.scss";

import { News, Home } from "../../pages";

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } =
    useActiveVkuiLocation();

  return (
    <View activePanel={activePanel}>
      <Home id="home" />
      <News id="news" />
    </View>
  );
};
