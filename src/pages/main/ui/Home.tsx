import { Panel, Spinner, NavIdProps } from "@vkontakte/vkui";
import { FC, useEffect } from "react";
import { fetchNewStories } from "../api/newsSlice";
import { NewsList } from "../../../widgets/news/ui/NewsList";
import { Header } from "../../../widgets/header/ui/Header";
import { useAppDispatch, useAppSelector } from "../../../app/appStore";

export const Home: FC<NavIdProps> = ({ id }) => {
  const dispatch = useAppDispatch();

  const { news, loading } = useAppSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNewStories());
  }, [dispatch]);

  if (loading) {
    return <Spinner size="large" style={{ marginTop: 20 }} />;
  }

  return (
    <Panel id={id}>
      <Header />
      <NewsList news={news} />
    </Panel>
  );
};
