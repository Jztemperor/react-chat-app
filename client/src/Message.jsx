import { Fragment } from "react";
import styles from "./Message.module.css";

function Message({ author, message, name }) {
  return (
    <div className={styles.msg_cont}>
      {" "}
      <div className={name === author ? styles.right : styles.left}>
        <span>Author: {author}</span>
      </div>
      <div className={name === author ? styles.right : styles.left}>
        {message}
      </div>
    </div>
  );
}

export default Message;
