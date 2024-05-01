import { Button } from "@vkontakte/vkui";
import { useAppDispatch } from "../../../app/appStore";
import { fetchNewStories } from "../../../pages/main/api/newsSlice";
import styles from "./RefreshNewsBtn.module.scss";

export const RefreshNewsBtn = () => {
  const dispatch = useAppDispatch();

  const handleRefreshClick = () => {
    dispatch(fetchNewStories());
  };

  return (
    <Button onClick={handleRefreshClick} className={styles.button}>
      Обновить новости
    </Button>
  );
};
