import { useState } from "react";

const EditModal = (props) => {
  const [message, setMessage] = useState(props.post.message);
//   console.log(props)

  const accessToken =
    "EAAaZATvkGLKQBO0WFjjWzZCUiP7ZAnPpplN3BBoZBPhzH4A1FjEMaMhyjzjk8x2E2MFm0UTZC0at4lYZC8ezKqPQQ8vqWsxljLFEnDS2U7ZCvmApL8kE8LMA5eoWdr3sLVknna6bqZBjvyW9bXj83aw9fxOIeg8egAWGZBZCZBb3edh3sruonbE21aW3MQgIcehZBTEZD";

  //sử bài viết
  const updatePosts = (id, message) => {
    fetch(`https://graph.facebook.com/v18.0/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        message: message,
      }),
    });

    window.location.reload();
  };
  return (
    <div
      className="editModal"
      onClick={() => {
        props.setShowEditModal(false);
      }}
    >
      <div
        className="editModal__content"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <p>Content</p>
        <input
          type="text"
          value={message}
          autoFocus
          onChange={(e) => {
            setMessage(e.target.value);
            // console.log(message)
          }}
        />

        <button
          onClick={() => {
            props.setShowEditModal(false);
            updatePosts(props.post.id, message);
            // console.log("props.post.id, message: ", props.post.id, message);
          }}
        >
          Cập nhật
        </button>
      </div>
    </div>
  );
};

export default EditModal;
