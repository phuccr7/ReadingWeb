import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import { Link } from "react-router-dom";
import Comment from "../comment/Comment";
import { useNavigate } from "react-router-dom";
import Style from "../../components/userPage/style1.module.css";
import moment from "moment";
import Header from "../../components/header/HeaderDetailBook";
import bookService from "../../service/bookService";
import UserService from "../../service/UserService";
import { jwt } from "../../service/authHeader";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Footer from "../footer/Footer"
const notify = () => toast('This book is added to favorite books!', {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
});

const notify1 = () => toast('You need to login to comment!!!', {
  position: "top-center",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
});

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [mode, setMode] = useState(0);


  const [comment, setComment] = useState([]);
  let ids = window.localStorage.getItem("idBookForRead");

  useEffect(() => {
    fetchData();
    fetch();
  }, []);

  const fetch = async () => {
    await bookService
      .getBookById(ids)
      .then((response) => {
        setComment(response.data.data.comments);


      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchData = async () => {
    try {
      const user = localStorage.getItem("user");

      const { data } = await axios(
        `https://ebook4u-server.onrender.com/api/book/${id}`,
        {
          headers: {
            "content-type": "application/json",
            accept: "application/json",
            Authorization: `Bearer ${user}`,
          },
        }
      );

      setBook(data.data.book);
    } catch (error) { }
  };

  return (
    <div>
      <Header />
      <ToastContainer />

      <section className={Style.bookDetails}>
        <div className="container">
          <div className={Style.bookDetailsContent}>
            <div className={Style.bookDetailsImg}>
              <img src={book?.image} alt="cover img" />
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className={Style.bookDetailsItem}>
                  <span
                    className="fw-6 fs-24"
                    style={{ fontWeight: "bold", fontSize: "30px" }}
                  >
                    {book?.name}
                  </span>
                </div>
                <button
                  type="button"
                  className="btn btn-danger"
                  style={{ marginRight: "20px", marginTop: "20px",width:"160px" }}
                  onClick={() => {
                    localStorage.setItem("idToAddFav", book?._id);
                    if (mode === 0) { notify(); addToFavorite(); }


                    setMode(1);
                  }}
                >
                  Add to favorite
                </button>
              </div>

              <div className={Style.bookDetailsItem}>
                <span className="fw-6 fs-24">Author: {book?.author}</span>
              </div>
              <div className={Style.bookDetailsItem}>
                <span className="fw-6 fs-24">
                  Category:{" "}
                  {book?.category?.map((item, index) => {
                    return <span key={index + 1}>{item.name},</span>;
                  })}
                </span>
              </div>
              <div className={Style.bookDetailsInfo}>
                <span>
                  <p
                    dangerouslySetInnerHTML={{ __html: `${book?.description}` }}
                  />
                </span>
              </div>

              <div className={Style.bookDetailsItem}>
                <span>Country: {book?.country?.name}</span>
              </div>
              <div className={Style.bookDetailsItem}>
                <span>
                  Last updated:{" "}
                  {moment.utc(book?.updateAt).format("DD/MM/YYYY")}
                </span>
              </div>
              <div className={Style.bookDetailsItem}>
                <span>View: {book?.view}</span>
              </div>
              <Link to={"/read"}>
                <button
                  type="button"
                  className="btn btn-danger"
                  style={{ marginLeft: "20px", marginBottom: "20px" }}
                  onClick={() => {
                    localStorage.setItem("currentChapter", 0);

                    var arrayLibrary = JSON.parse(localStorage.getItem("arrayLibrary"));
                    if (arrayLibrary == null) {
                      arrayLibrary = [];
                    }
                    arrayLibrary.push(book?._id);
                    window.localStorage.setItem("arrayLibrary", JSON.stringify(arrayLibrary));
                  }}
                >
                  Read book
                </button>
              </Link>

            </div>
          </div>
        </div>
      </section>
      <div className="enterComment">
        <div className="form__group field">
          <input
            type="input"
            className="form__field"
            placeholder="Comment"
            name="name"
            id="CommentRead"
            required
          />
          <label for="name" className="form__label">
            Comment
          </label>
        </div>
        <div className="sendding">
          <button className="buttonSend" onClick={upComment}>
            <div className="svg-wrapper-1">
              <div className="svg-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path
                    fill="currentColor"
                    d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                  ></path>
                </svg>
              </div>
            </div>
            <span>Send</span>
          </button>
        </div>
      </div>
      <div
        className="commentDetail"
        style={{
          flex: "3",
          backgroundColor: "",
          padding: "30px",
          margin: "0 10px 0 10px",
        }}
      >
        {comment?.map((item, index) => (
          <div className="commentLine" key={index}>
            <img className="imgAdd" src={item.user.avatar}></img>
            <div className="commentReadBook">
              <div className="nameUserRead">{item.user.username} </div>
              <div> {item.content}</div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

const upComment = async () => {
  let ids = window.localStorage.getItem("idBookForRead");
  let check = jwt()
  if (check == "{}") {
    notify1();
    return
  }
  let content = $("#CommentRead").val();
  if (content == "") return
  $("#CommentRead").val("");

  let jwts = jwt();

  await fetch(`https://ebook4u-server.onrender.com/user/comment/${ids}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: jwts,
    },
    method: "POST",
    body: JSON.stringify({ contentComment: content }),
  })
    .then((result) => {
      const load = async () => {
        const datas = await UserService.getProfileUser();
        let user = datas.data.data;
        let a = `
              <div class="commentLine">
              <img class ="imgAdd" src=${user.avatar}></img>
                              <div class='commentReadBook'>
                                   <div class='nameUserRead'>${user.username} </div>
                              <div> ${content}</div>
                              </div>
                              </div>`;
        $(".commentDetail").prepend(a);
      };
      load();
    })
    .catch((error) => { });
};
const addToFavorite = async () => {
  const id = localStorage.getItem("idToAddFav");
  let idBook = { idBook: id };
  const user = localStorage.getItem("user");

  await fetch("https://ebook4u-server.onrender.com/user/me/favorite-book", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",

      Authorization: `Bearer ${user}`,
    },
    body: JSON.stringify(idBook),
  })
    .then((result) => { })
    .catch((error) => { });
};

export default BookDetails;
