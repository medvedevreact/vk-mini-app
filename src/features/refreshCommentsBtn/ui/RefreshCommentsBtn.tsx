import { FC } from "react";
import { Button } from "@vkontakte/vkui";
import styles from "./RefreshComments.module.scss";

interface RefreshCommentsBtnProps {
  onRefresh: () => void;
}

export const RefreshCommentsBtn: FC<RefreshCommentsBtnProps> = ({
  onRefresh,
}) => {
  return (
    <Button onClick={onRefresh} className={styles.button}>
      Update comments
    </Button>
  );
};
