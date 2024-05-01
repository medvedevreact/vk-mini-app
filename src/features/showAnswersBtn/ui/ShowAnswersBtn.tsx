import { FC } from "react";
import styles from "./ShowAnswersBtn.module.scss";

interface ShowAnswersBtnProps {
  isOpenReplies: boolean;
  toggleReplies: () => void;
}

export const ShowAnswersBtn: FC<ShowAnswersBtnProps> = ({
  isOpenReplies,
  toggleReplies,
}) => {
  return (
    <p className={styles.showAnswersBtn} onClick={toggleReplies}>
      {isOpenReplies ? "Скрыть ответы" : "Показать Ответы"}
    </p>
  );
};
