import styles from "./Chat.module.css";
import { SocketContext } from "./contexts/SocketContext";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import uuid from "react-uuid";
import Message from "./Message";

function Chat() {
  const location = useLocation();
  const socket = useContext(SocketContext);
  const room = location.state.room;
  const name = location.state.name;

  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMsg = async () => {
    if (currentMessage !== "") {
      const msgData = {
        room: room,
        user: name,
        msg: currentMessage,
      };
      await socket.emit("send_message", msgData);
      setMessages((msgs) => [...msgs, msgData]);
      setCurrentMessage("");
    }
  };

  console.log(socket);

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setMessages((msgs) => [...msgs, data]);
      console.log("Cső");
    });
  }, [socket]);

  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        <div className={styles.header_container}>
          <h1 className={styles.header}>{room} Room</h1>
        </div>
        <div className={styles.messages}>
          {messages.map((message) => (
            <Message
              author={message.user}
              message={message.msg}
              key={uuid()}
            ></Message>
          ))}
        </div>
        <div className={styles.send_message}>
          <div className={styles.send_message_box}>
            <input
              type="text"
              placeholder="Message..."
              className={styles.send_message_input}
              value={currentMessage}
              onChange={(e) => {
                setCurrentMessage(e.target.value);
              }}
              onKeyPress={(event) => {
                event.key === "Enter" && sendMsg();
              }}
            />
            <button
              className={styles.send_message_btn}
              onClick={sendMsg}
              type="submit"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
