import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { FC } from "react";
import { newsItem } from "../../../app/types/types";
import { Card } from "@vkontakte/vkui";

interface NewsItemProps {
  item: newsItem;
}

const formatDate = (time: number) => {
  return new Date(time * 1000).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

export const NewsItem: FC<NewsItemProps> = ({ item }) => {
  const routeNavigator = useRouteNavigator();
  return (
    <Card
      key={item.id}
      onClick={() => {
        routeNavigator.push(`/news/${item.id}`);
      }}
      style={{
        padding: "5px 10px",
        cursor: "pointer",
        marginBottom: "10px",
      }}
    >
      <h2 style={{ marginBottom: "10px" }}>{item.title}</h2>
      <h3>{item.score}</h3>
      <p>{item.by}</p>
      <p>{formatDate(item.time)}</p>
    </Card>
  );
};
