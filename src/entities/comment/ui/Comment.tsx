import { Avatar, Div } from "@vkontakte/vkui";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import styles from "./Comment.module.scss";
import { commentItem } from "../../../app/types/types";
import { ShowAnswersBtn } from "../../../features/showAnswersBtn/ui/ShowAnswersBtn";

interface CommentProps {
  commentId: number;
}

export const Comment: FC<CommentProps> = ({ commentId }) => {
  const [comment, setComment] = useState<commentItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [isOpenReplies, setIsOpenReplies] = useState(false);

  console.log(comment);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`)
      .then((resp) => {
        setComment(resp.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [commentId]);

  if (loading) return <Div>Loading...</Div>;
  if (!comment) return <Div>Comment not found.</Div>;

  return (
    <Div style={{ marginLeft: "20px", cursor: "pointer" }}>
      <div className={styles.person}>
        <Avatar
          src={`https://www.gravatar.com/avatar/${commentId}?d=identicon`}
          style={{ marginRight: "10px" }}
        />
        <h4>{comment.by}</h4>
      </div>

      {comment.text}

      {comment.kids && (
        <ShowAnswersBtn
          isOpenReplies={isOpenReplies}
          toggleReplies={() => setIsOpenReplies(!isOpenReplies)}
        />
      )}
      {isOpenReplies &&
        comment.kids &&
        comment.kids.map((kidId) => <Comment key={kidId} commentId={kidId} />)}
    </Div>
  );
};
