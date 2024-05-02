import { Panel, Spinner, NavIdProps } from "@vkontakte/vkui";
import { FC, useEffect } from "react";
import { fetchNewStories } from "../api/newsSlice";

import { Header, NewsList } from "../../../widgets";
import { useAppDispatch, useAppSelector } from "../../../app/appStore";
import { RefreshNewsBtn } from "../../../features";

export const Home: FC<NavIdProps> = ({ id }) => {
  const dispatch = useAppDispatch();

  const { news, loading } = useAppSelector((state) => state.news);

  useEffect(() => {
    const fetchNews = () => dispatch(fetchNewStories());
    fetchNews();
    const intervalId = setInterval(fetchNews, 60000);
    return () => clearInterval(intervalId);
  }, [dispatch]);

  if (loading) {
    return <Spinner size="large" style={{ marginTop: 20 }} />;
  }

  return (
    <Panel id={id}>
      <Header />
      <RefreshNewsBtn />
      <NewsList news={news} />
    </Panel>
  );
};
