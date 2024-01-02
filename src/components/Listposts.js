import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Listposts = () => {
  const [posts, setPosts] = useState();
  const [message, setMessage] = useState();
  const [link, setLink] = useState();
  const accessToken =
    "EAAaZATvkGLKQBO0WFjjWzZCUiP7ZAnPpplN3BBoZBPhzH4A1FjEMaMhyjzjk8x2E2MFm0UTZC0at4lYZC8ezKqPQQ8vqWsxljLFEnDS2U7ZCvmApL8kE8LMA5eoWdr3sLVknna6bqZBjvyW9bXj83aw9fxOIeg8egAWGZBZCZBb3edh3sruonbE21aW3MQgIcehZBTEZD";
  const idPage = "199179103271562";

  useEffect(() => {
    fetch(
      `https://graph.facebook.com/${idPage}/posts?fields=id,admin_creator,message,likes.summary(total_count),comments.summary(total_count),shares,full_picture&access_token=${accessToken}`
    )
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        setPosts(data.data);
      });
  }, []);

  const [isShowEditModal, setShowEditModal] = useState(false);
  const [postUpdate, setPostUpdate] = useState({
    message: "",
    id: "",
  });

  const EditModal = () => {
    console.log(1)
    return (
      <div
        className="editModal"
        onClick={() => {
          setShowEditModal(false);
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
            value={postUpdate.message}
            autoFocus
            onChange={(e) => {
              // Cập nhật giá trị của postUpdate.message
              setPostUpdate((prev) => {
                return {
                  ...prev,
                  message: e.target.value,
                };
              });
            }}
            // onChange={(e) => {
            //   // Cập nhật giá trị của postUpdate.message
            //   setPostUpdate((prev) => {
            //     return {
            //       ...prev,
            //       message: e.target.value,
            //     };
            //   });
            // }}
          />
          
        <button
          onClick={() => {
            setShowEditModal(false);
            updatePosts(postUpdate.id, postUpdate.message);
            // console.log("postUpdate.id, postUpdate.message: ", postUpdate.id, postUpdate.message)
          }}
        >
          Cập nhật
        </button>
        </div>
      </div>
    );
  }

  const renderPosts = () => {
    return posts?.map((post, index) => {
      return (
        <>
          {isShowEditModal && <EditModal />}
          <tr key={index}>
            <td>
              <Link
                to={`https://facebook.com/${post.id}`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  textDecoration: "none",
                }}
              >
                <img
                  src={post.full_picture}
                  style={{ width: 64, height: 64 }}
                />
                <p
                  style={{
                    textAlign: "center",
                    margin: "auto",
                    wordWrap: "break-word",
                  }}
                >
                  {post.message}
                </p>
              </Link>
            </td>
            <td>
              <p style={{ textAlign: "center", margin: "auto" }}>
                {post.likes.summary.total_count}
              </p>
            </td>
            <td>
              <p style={{ textAlign: "center", margin: "auto" }}>
                {post.comments.summary.total_count}
              </p>
            </td>
            <td>
              <p style={{ textAlign: "center", margin: "auto" }}>
                {post.shares?.count || 0}
              </p>
            </td>
            <td>
              <p style={{ textAlign: "center", margin: "auto" }}>
                {post?.admin_creator?.name || " "}
              </p>
            </td>
            <td style={{ textAlign: "center", margin: "auto" }}>
              <button
                style={{ border: 1 }}
                onClick={() => {
                  setPostUpdate({
                    message: post.message,
                    link: post.full_picture,
                    id: post.id,
                  });
                  setShowEditModal(!isShowEditModal);
                }}
              >
                sửa
              </button>
            </td>
            <td style={{ textAlign: "center", margin: "auto" }}>
              <button
                style={{ border: 1 }}
                onClick={() => deletePosts(post.id)}
              >
                xoá
              </button>
            </td>
          </tr>
        </>
      );
    });
  };
  const onChangeMessage = (e) => {
    setMessage(e.target.value);
  };
  const onChangeLink = (e) => {
    setLink(e.target.value);
  };
  const Addpost = () => {
    if (!link) {
      fetch(
        `https://graph.facebook.com/199179103271562/feed?method=post&message=${message}&access_token=${accessToken}`,
        { method: "POST" }
      ).then(() => {
        console.log("Thêm thành công");
      });
    } else {
      fetch(
        `https://graph.facebook.com/199179103271562/feed?method=post&message=${message}&link=${link}&access_token=${accessToken}`,
        { method: "POST" }
      ).then(() => {
        console.log("Thêm thành công");
      });
    }
    window.location.reload();
  };
  const deletePosts = (id) => {
    fetch(
      `https://graph.facebook.com/${id}?method=delete&access_token=${accessToken}`,
      { method: "DELETE" }
    ).then(() => {
      console.log("xoá thành công")
      window.location.reload()
    })
  }
  //sử bài viết
  const updatePosts = (id, messageUpdate) => {
    
      fetch(`https://graph.facebook.com/v18.0/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          message: messageUpdate,
        }),
      })
    
    window.location.reload();
  }

  return (
    <>
      <main>
        <div className="container-fluid px-4">
          <h1 className="mt-4">Posts</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item">
              <a href="index.html">Dashboard</a>
            </li>
            <li className="breadcrumb-item active">Posts</li>
          </ol>
          <div className="card mb-4">
            <div className="card-body">
              DataTables is a third party plugin that is used to generate the
              demo table below. For more information about DataTables, please
              visit the
              <a target="_blank" href="https://datatables.net/">
                official DataTables documentation
              </a>
              .
            </div>
          </div>
          <div style={{ margin: "auto" }}>
            <div id="post_status-by-bacsiwindows">
              <h2>
                <span
                  style={{ padding: "0 7 0 0", borderRight: "1 solid #ddd" }}
                >
                  <i className="fa fa-pencil" aria-hidden="true"></i> Tạo bài
                  viết mới
                </span>
                <span style={{ margin: "0 0 0 8" }}>
                  <i className="fa fa-question" aria-hidden="true"></i>Q&amp;A
                </span>
              </h2>
              <div className="content">
                <img
                  src={`https://scontent.fhan5-1.fna.fbcdn.net/v/t1.0-9/25151913_321908118292571_6831565702998697270_n.jpg?oh=d00c42db327fdd5245520a08cabd0822&amp;oe=5ABB1764`}
                />
                <form target="blank">
                  <input
                    onChange={onChangeMessage}
                    placeholder="Bạn đang nghĩ gì ?"
                    type="text"
                  />
                </form>
              </div>
              <button className="btn_status" target="_blank">
                <i
                  style={{ color: "#5db98b" }}
                  className="fa fa-picture-o"
                  aria-hidden="true"
                ></i>
                Ảnh/Video
                <input
                  placeholder="link hình ảnh hoặc video"
                  type="text"
                  input
                  onChange={onChangeLink}
                />
              </button>

              <button className="btn_status" target="_blank">
                <span>...</span>
              </button>
              <button
                className="btn_status"
                onClick={Addpost}
                target="_blank"
                style={{
                  float: "right",
                  color: "#fff",
                  background: "#4267b2",
                  borderRadius: "4px",
                }}
              >
                Đăng
              </button>
            </div>
          </div>
          <div className="card mb-4">
            <div className="card-header">
              <i className="fas fa-table me-1"></i>
              DataTable Posts
            </div>

            <div className="card-body">
              <table id="datatablesSimple" style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>Content</th>
                    <th>Total Likes</th>
                    <th>Total Comments</th>
                    <th>Total Shares</th>
                    <th>Admin Creator</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>{renderPosts()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Listposts;
