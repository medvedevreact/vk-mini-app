import { FC, useCallback, useEffect, useState } from "react";
import {
  Div,
  Header,
  NavIdProps,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Group,
} from "@vkontakte/vkui";
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import "../../News.scss";
import { Comment } from "../../../entities";
import { newsItem } from "../../../app/types/types";
import { fetchNewsItem } from "../api/NewsApi";
import { RefreshCommentsBtn } from "../../../features";

export const News: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const [currentNews, setCurrentNews] = useState<newsItem | null>(null);

  const { newsId } = useParams() || { newsId: 0 };

  const fetchData = useCallback(() => {
    fetchNewsItem(String(newsId))
      .then(setCurrentNews)
      .catch((error) => {
        console.error("Ошибка при получении данных новости:", error);
      });
  }, [newsId]);

  useEffect(() => {
    fetchData();
  }, [newsId, fetchData]);

  console.log(currentNews, "news");

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
      >
        News #{newsId}
      </PanelHeader>

      {currentNews && (
        <Group>
          <Header mode="secondary">Title</Header>
          <Div>{currentNews.title}</Div>

          <Header mode="secondary">Date of publication</Header>
          <Div>{new Date(currentNews.time * 1000).toLocaleString()}</Div>

          <Header mode="secondary">Author</Header>
          <Div>{currentNews.by}</Div>

          <Header mode="secondary">Comments</Header>
          <Div>Number of comments: {currentNews.descendants}</Div>
          <RefreshCommentsBtn fetchData={fetchData} />
          <Group>
            {currentNews.kids &&
              currentNews.kids.map((kidId) => (
                <Comment key={kidId} commentId={kidId} />
              ))}
          </Group>
        </Group>
      )}
    </Panel>
  );
};
