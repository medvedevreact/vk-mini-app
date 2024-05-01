import { Group } from "@vkontakte/vkui";
import React from "react";
import { newsItem } from "../../../app/types/types";
import styles from "./NewsList.module.scss";
import { NewsItem } from "../../../entities/newsItem/ui/NewsItem";

interface NewsListProps {
  news: newsItem[];
}

export const NewsList: React.FC<NewsListProps> = ({ news }) => {
  return (
    <Group className={styles.newsList}>
      {news.map((item, index) => (
        <NewsItem item={item} key={item.id} number={index + 1} />
      ))}
    </Group>
  );
};
