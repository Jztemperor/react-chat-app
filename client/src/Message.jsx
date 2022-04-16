import React from "react";

function Message({ author, message }) {
  return (
    <div>
      <p>Author: {author}</p>
      <p>Message: {message}</p>
    </div>
  );
}

export default Message;
