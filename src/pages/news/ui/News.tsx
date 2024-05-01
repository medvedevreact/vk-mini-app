import { FC, useEffect, useState } from "react";
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
import { Comment } from "../../../entities/comment/ui/Comment";
import { newsItem } from "../../../app/types/types";
import { fetchNewsItem } from "../api/NewsApi";

export const News: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const [currentNews, setCurrentNews] = useState<newsItem | null>(null);

  const { newsId } = useParams() || { newsId: 0 };

  console.log(typeof newsId);

  useEffect(() => {
    fetchNewsItem(String(newsId))
      .then(setCurrentNews)
      .catch((error) => {
        console.error("Ошибка при получении данных новости:", error);
      });
  }, [newsId]);

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
      >
        Новость #{newsId}
      </PanelHeader>

      {currentNews && (
        <Group>
          <Header mode="secondary">Название</Header>
          <Div>{currentNews.title}</Div>

          <Header mode="secondary">Дата публикации</Header>
          <Div>{new Date(currentNews.time * 1000).toLocaleString()}</Div>

          <Header mode="secondary">Автор</Header>
          <Div>{currentNews.by}</Div>

          <Header mode="secondary">Комментарии</Header>
          <Div>Количество комментариев: {currentNews.descendants}</Div>
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
