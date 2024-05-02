import { FC } from "react";
import { Button } from "@vkontakte/vkui";
import styles from "./RefreshComments.module.scss";

interface RefreshCommentsBtnProps {
  fetchData: () => void;
}

export const RefreshCommentsBtn: FC<RefreshCommentsBtnProps> = ({
  fetchData,
}) => {
  return (
    <Button onClick={fetchData} className={styles.button}>
      Update comments
    </Button>
  );
};
