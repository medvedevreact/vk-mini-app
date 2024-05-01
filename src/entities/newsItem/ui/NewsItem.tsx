import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { FC } from "react";
import { newsItem } from "../../../app/types/types";
import { Card } from "@vkontakte/vkui";
import styles from "./NewsItem.module.scss";

interface NewsItemProps {
  item: newsItem;
  number: number;
}

const formatDate = (time: number) => {
  const now = new Date();
  const diff = (now.getTime() - time * 1000) / 1000;

  if (diff < 60) {
    return `${Math.floor(diff)} seconds ago`;
  } else if (diff < 3600) {
    return `${Math.floor(diff / 60)} minutes ago`;
  } else if (diff < 86400) {
    return `${Math.floor(diff / 3600)} hours ago`;
  } else if (diff < 2592000) {
    return `${Math.floor(diff / 86400)} days ago`;
  } else {
    return new Date(time * 1000).toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }
};

export const NewsItem: FC<NewsItemProps> = ({ item, number }) => {
  const routeNavigator = useRouteNavigator();
  return (
    <Card
      className={styles.card}
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
      <h3>{number}</h3>
      <div>
        <h3 style={{ marginBottom: "10px" }}>{item.title}</h3>

        <p>
          {item.score} {item.score === 1 ? "point" : "points"} by {item.by} |{" "}
          {formatDate(item.time)}
        </p>
      </div>
    </Card>
  );
};
