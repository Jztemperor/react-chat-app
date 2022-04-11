import styles from "./Home.module.css";
import { useContext } from "react";
import { useState } from "react";
import { SocketContext } from "./contexts/SocketContext";

function Home() {
  const socket = useContext(SocketContext);

  const [name, setName] = useState();
  const [room, setRoom] = useState();

  // Emit join room when form is submitted
  const joinRoom = (e) => {
    e.preventDefault();
    if (name !== "" && room !== "") {
      socket.emit("join_room", { name: name, room: room });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        <form onSubmit={joinRoom}>
          <h1 className={styles.header}>Welcome!</h1>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Room"
            onChange={(e) => setRoom(e.target.value)}
            required
          />
          <button type="submit">Start Chatting</button>
        </form>
      </div>
    </div>
  );
}

export default Home;
