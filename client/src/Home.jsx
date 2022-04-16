import styles from "./Home.module.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "./contexts/SocketContext";

function Home() {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [room, setRoom] = useState();

  // Emit join room when form is submitted
  const joinRoom = (e) => {
    e.preventDefault();
    if (name !== "" && room !== "") {
      socket.emit("join_room", { name: name, room: room });
      navigate("/chat", { state: { name: name, room: room } });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        <form className={styles.form} onSubmit={joinRoom}>
          <h1 className={styles.header}>Welcome!</h1>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            required
            className={styles.home_input}
          />
          <input
            className={styles.home_input}
            type="text"
            placeholder="Room"
            onChange={(e) => setRoom(e.target.value)}
            required
          />
          <button type="submit" className={styles.button}>
            Start Chatting
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;
