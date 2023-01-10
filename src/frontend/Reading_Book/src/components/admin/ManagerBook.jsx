import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import "./admin.css";
import StyleHome from "../../style/content.module.css";
import chat from "../../assets/imgs/chat.png";
import updateIcon from "../../assets/imgs/update.png";
import del from "../../assets/imgs/delete.png";
import add from "../../assets/imgs/addChapter.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Navigate,
  Route,
  Routes,
  useHref,
  useNavigate,
} from "react-router-dom";

import AlertDialogSlide from "../dialog/Dialog";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.js';
import $ from "jquery";
import Slide from "@mui/material/Slide";
import bookService from "../../service/bookService";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useStore } from "../store/hook";
import { updateBook } from "../store/action";
import { jwt } from "../../service/authHeader";
import AnimatedMulti from "./Selecter";

const notify1 = () =>
  toast("Please enter all fields!!!", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

const notify2 = () =>
  toast("New book is added!!!", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

const notify3 = () =>
  toast("New chapter is added!!!", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

const notify4 = () =>
  toast("This book is updated!!!", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

function ManagerBook() {
  return (
    <>
      <Routes>
        <Route index element={<Navigate to="all" replace />} />
        <Route path="all" element={<AllBook />} />
        <Route path="search" element={<SearchBookAdmin />} />
        <Route path="comment" element={<CommentBook />} />
        <Route path="add" element={<AddBook />} />
        <Route path="addChapter" element={<AddChapter />} />
        <Route path="update" element={<UpdateBook />} />
      </Routes>
    </>
  );
}

function AllBook() {


  return (
    <div>

      <div className="mainTittle">
        <div className="mainTitleMgb">Book Management </div>
        <Title title={"Admin > Book Management"} />
        <div className="mainContent">
          <Content />
        </div>
      </div>
    </div>
  );
}

function CommentBook() {
  return (
    <div>
      <div className="mainTittle">
        {/* <HeaderAdmin /> */}

        <div className="mainTitleMgb">Comment Management </div>
        <Title title={"Admin > Book Management > Comment Management"} />
        <div className="mainContent">
          <ContentComment />
        </div>
      </div>
    </div>
  );
}
function SearchBookAdmin() {
  return (
    <div>
      <div className="mainTittle">
        {/* <HeaderAdmin /> */}

        <div className="mainTitleMgb">Book Management </div>
        <Title title={"Admin > Book Management > Search Book"} />
        <div className="mainContent">
          <ContentSearch />
        </div>
      </div>
    </div>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function AddBook() {
  return (
    <div>
      <ToastContainer />

      <div className="mainTittle">
        <div className="mainTitleMgb">Add new book</div>
        <Title title={"Admin > Book Management > Add new book "} />
        <div className="mainContent">
          <ContentBan />
        </div>
      </div>
    </div>
  );
}

function AddChapter() {
  return (
    <div>
      <ToastContainer />

      <div className="mainTittle">
        <div className="mainTitleMgb">Add new chapter</div>
        <Title title={"Admin > Book Management > Add new chapter "} />
        <div className="mainContent">
          <ContentAddChapter />
        </div>
      </div>
    </div>
  );
}

function UpdateBook() {
  return (
    <div>
      <ToastContainer />

      <div className="mainTittle">
        <div className="mainTitleMgb">Update Book</div>
        <Title title={"Admin > Book Management > Update Book "} />
        <div className="mainContent">
          <ContentUpdate />
        </div>
      </div>
    </div>
  );
}

function Title(props) {
  const [Title, setTitle] = useState("");
  useEffect(() => {
    setTitle(props.title);
  }, [props.title]);
  const navigate = useNavigate();
  const handleOnClick = useCallback(
    () => navigate("../all", { replace: true }),
    [navigate]
  );
  return (
    <div className={"titleManagerBook"} onClick={handleOnClick}>
      {" "}
      {Title}{" "}
    </div>
  );
}

function BanAccountUser(props) {
  const [open, setOpen] = React.useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return <></>;
}
const deleteAccount = (user) => {
  alert(user);
};
const restore = (user) => {
  alert(user);
};
const bookComment = (id) => {
  localStorage.setItem("bookComment", id);
  // handleOnClick2()
};

function Content(props) {
  const [listAccount, setList] = useState([]);
  const [state, update] = useStore();

  useEffect(() => {
    bookService
      .getAllBook()
      .then((response) => {
        setList(response.data.data);
      })
      .catch((err) => { });
  }, []);

  const navigate = useNavigate();
  const handleOnClick = useCallback(
    () => navigate("../add", { replace: true }),
    [navigate]
  );

  const handleOnClick1 = useCallback(
    () => navigate("../update", { replace: true }),
    [navigate]
  );

  const handleOnClick2 = useCallback(
    () => navigate("../comment", { replace: true }),
    [navigate]
  );
  const handleOnClick3 = useCallback(
    () => navigate("../search", { replace: true }),
    [navigate]
  );
  const handleOnClick4 = useCallback(
    () => navigate("../addChapter", { replace: true }),
    [navigate]
  );

  return (
    <>
      <div>
        <div className={StyleHome.searchBarAdmin}>
          <div className="searchAdmin">
            <input
              type="text"
              defaultValue=""
              placeholder="Search..."
              id="searchHomeAdmin"
            />

            <button
              className="adminSearchButton"
              onClick={() => {
                let val = $("#searchHomeAdmin").val();
                localStorage.setItem("nameSearchBook", val);
                handleOnClick3();
              }}
            >
              Search
            </button>
          </div>
          <button className="banned" onClick={handleOnClick}>
            Add new book
          </button>
        </div>
        <hr style={{ color: "red" }}></hr>
        <table className="paleBlueRows">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Author</th>
              <th>Number of Chapter</th>
              <th>Category</th>
              <th>Create at</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {listAccount?.map((item, index) => {
              let text = item.category.map((a) => a.name);
              text = text.toString();
              text = text.substring(0, text.length);
              return (
                <tr key={index + 1}>
                  <th>{index + 1}</th>
                  <th>{item.name}</th>
                  <td>{item.author}</td>
                  <td>{item.numberChapter}</td>
                  <td>{text}</td>
                  <td>{item.createdAt.slice(0, 10)}</td>

                  <td className="optionAdmin">
                    <img
                      className="icon"
                      src={chat}
                      alt=""
                      onClick={() => {
                        localStorage.setItem("bookComment", item._id);
                        handleOnClick2();
                      }}
                      type={"chat"}
                    />
                    <img
                      className="icon"
                      src={updateIcon}
                      alt=""
                      onClick={() => {
                        localStorage.setItem("bookUpdate", item._id);
                        update(updateBook(item._id));

                        handleOnClick1();
                      }}
                      type={"update"}
                    />
                    <AlertDialogSlide
                      icon={del}
                      user={item._id}
                      type={"delete"}
                    />
                    <img
                      className="icon"
                      src={add}
                      alt=""
                      onClick={() => {
                        localStorage.setItem("bookAddChapter", item._id);
                        handleOnClick4();
                      }}
                      type={"addChapter"}
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
function ContentSearch(props) {
  const [listAccount, setList] = useState([]);
  const [name, setName] = useState([]);
  const [state, update] = useStore();

  useEffect(() => {
    let name = localStorage.getItem("nameSearchBook");
    bookService
      .getSearchBookAd(name)
      .then((response) => {
        setList(response.data.data);
      })
      .catch((err) => { });
  }, [name]);

  const navigate = useNavigate();
  const handleOnClick = useCallback(
    () => navigate("../add", { replace: true }),
    [navigate]
  );

  const handleOnClick1 = useCallback(
    () => navigate("../update", { replace: true }),
    [navigate]
  );

  const handleOnClick2 = useCallback(
    () => navigate("../comment", { replace: true }),
    [navigate]
  );
  const handleOnClick3 = useCallback(
    () => navigate("../search", { replace: true }),
    [navigate]
  );

  const handleOnClick4 = useCallback(
    () => navigate("../addChapter", { replace: true }),
    [navigate]
  );

  return (
    <>
      <div>
        <div className={StyleHome.searchBarAdmin}>
          <div className="searchAdmin">
            <input
              type="text"
              defaultValue=""
              placeholder="Search..."
              id="searchHomeAdmin"
            />

            <button
              className="adminSearchButton"
              onClick={() => {
                let val = $("#searchHomeAdmin").val();
                localStorage.setItem("nameSearchBook", val);
                setName(val);
              }}
            >
              Search
            </button>
          </div>

          <button className="banned" onClick={handleOnClick}>
            Add new book
          </button>
        </div>
        <hr style={{ color: "red" }}></hr>
        <table className="paleBlueRows">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Author</th>
              <th>Number of Chapter</th>
              <th>Category</th>
              <th>Create at</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {listAccount?.map((item, index) => {
              let text = item.category.map((a) => a.name);
              text = text.toString();
              text = text.substring(0, text.length);
              return (
                <tr key={index + 1}>
                  <th>{index + 1}</th>
                  <th>{item.name}</th>
                  <td>{item.author}</td>
                  <td>{item.numberChapter}</td>
                  <td>{text}</td>
                  <td>{item.createdAt.slice(0, 10)}</td>

                  <td className="optionAdmin">
                    <img
                      className="icon"
                      src={chat}
                      alt=""
                      onClick={() => {
                        localStorage.setItem("bookComment", item._id);
                        handleOnClick2();
                      }}
                      type={"chat"}
                      style={{ cursor: "pointer" }}
                    />
                    <img
                      className="icon"
                      src={updateIcon}
                      alt=""
                      onClick={() => {
                        localStorage.setItem("bookUpdate", item._id);
                        update(updateBook(item._id));
                        handleOnClick1();
                      }}
                      type={"update"}
                      style={{ cursor: "pointer" }}
                    />
                    <AlertDialogSlide
                      icon={del}
                      user={item._id}
                      type={"delete"}
                      style={{ cursor: "pointer" }}
                    />
                    <img
                      className="icon"
                      src={add}
                      alt=""
                      onClick={() => {
                        localStorage.setItem("bookAddChapter", item._id);
                        handleOnClick4();
                      }}
                      type={"addChapter"}
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

function ContentComment(props) {
  const [listAccount, setList] = useState([]);

  const id = localStorage.getItem("bookComment");

  useEffect(() => {
    bookService
      .getBookById(id)
      .then((response) => {
        setList(response.data.data.comments);

      })
      .catch((err) => { });
  }, []);

  const navigate = useNavigate();
  const handleOnClick = useCallback(
    () => navigate("../add", { replace: true }),
    [navigate]
  );

  const handleOnClick1 = useCallback(
    () => navigate("../update", { replace: true }),
    [navigate]
  );
  return (
    <>
      <div>
        <hr></hr>
        <table className="paleBlueRows">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Content</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {listAccount?.map((item, index) => {
              return (
                <tr key={index + 1}>
                  <th>{index + 1}</th>
                  <th>{item.user.username}</th>
                  <td>{item.content}</td>
                  <td>{item.createdAt.slice(0, 10)}</td>

                  <td className="optionAdmin">
                    <AlertDialogSlide
                      icon={del}
                      type={"delete comment"}
                      user={item._id}
                    />{" "}
                    {/* <img className='icon' src={del} alt="" onClick={() => deleteAccount(item.Page)} /> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

function ContentPreview() {
  const [avatar, setAvatar] = useState();
  const id = localStorage.getItem("bookUpdate");
  const [listAccount, setList] = useState([]);

  useEffect(() => {
    bookService
      .getBookById(id)
      .then((response) => {
        setList(response.data.data.book);
      })
      .catch((err) => { });
  }, []);

  useEffect(() => {
    return () => avatar && URL.revokeObjectURL(avatar.preview);
  }, [avatar]);

  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);

    setAvatar(file);
  };

  return (
    <>
      {!avatar && (
        <img
          style={{
            marginTop: 8,
            marginLeft: "10px",
            height: "290px",
            marginBottom: "10px",
          }}
          src={listAccount.image}
          alt=""
          width="80%"
        />
      )}

      {avatar && (
        <img
          style={{
            marginTop: 8,
            marginLeft: "10px",
            height: "140px",
            marginBottom: "10px",
          }}
          src={avatar.preview}
          alt=""
          width="50%"
        />
      )}
      <div style={{ marginLeft: "10px" }}>
        <input type="file" onChange={handlePreviewAvatar} id="contentPDF" />
      </div>
    </>
  );
}

let CategoryListFromSV = [];

function ContentBan(props) {
  const [listCountry, setCountry] = useState([]);
  const [options, setOption] = useState([]);

  useEffect(() => {
    const load = async () => {
      const result = await bookService.getAllCategory();
      let list = [];
      result.data.data.map((item) => {
        list.push({ value: item._id, label: item.name });
      });

      setOption(list);
      CategoryListFromSV = list;
    };

    load();

    bookService
      .getAllCountry()
      .then((response) => {
        setCountry(response.data.data);
      })
      .catch((err) => { });
  }, []);

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSubmission = () => { };
  const animatedComponents = makeAnimated();

  const navigate = useNavigate();
  const handleOnClick = useCallback(
    () => navigate("../all", { replace: true }),
    [navigate]
  );
  return (
    <>
      <div>
        <div className="formBook">
          <div>
            <label htmlFor="Name">Name:</label>
            <input id="nameBook" placeholder="Name" name="name" />
          </div>
          <div>
            <label htmlFor="author">Author:</label>
            <input id="author" placeholder="Name" name="name" />
          </div>
          <div>
            <label htmlFor="category">Category:</label>
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              className="react-select-container"
              classNamePrefix="react-select"
              options={options}
              isMulti
              maxMenuHeight={250}
              menuPlacement="auto"
              id="category"
            />
          </div>
          <div>
            <label htmlFor="country">Country:</label>
            <select name="country" id="country">
              {listCountry.map((item, index) => {
                return (
                  <option key={index} value={item._id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="descriptionFormBook">
            <label htmlFor="descriptionFormBook">Description:</label>

            <textarea
              id="descriptionFormBook"
              type="text"
              name="descriptionFormBook"
            />
          </div>

          <label>
            Add cover image
            <br />
            <ContentPreview />
          </label>
        </div>
        <div className="submitFormBook">
          <span
            id="submitBook"
            onClick={() => {
              let name = $("#nameBook").val();
              let category = $("#category").val();
              let country = $("#country").val();
              let author = $("#author").val();
              let description = $("#descriptionFormBook").val();
              let image = $("#contentPDF").val();
              let ek = []
              $(".react-select__multi-value__label").each(function () {
                let labels = $(this).html();

                const result = getByValue(CategoryListFromSV, labels);

                ek.push(result.value);
              });
              if (
                name === "" ||
                ek.length == 0 ||
                country === "" ||
                author === "" ||
                description === ""
                || !image
              ) {
                notify1();
                return;
              } else {
                notify2();
                submitBook();
              }
            }}
            style={{ cursor: "pointer" }}
          >
            SUBMIT
          </span>
        </div>
      </div>
    </>
  );
}
async function initData(id) {
  const response = await bookService.getBookById(id);
  let data = response.data.data.book;
  if (!data) return;

  $("#nameBook2").val(data.name);
  $("#author2").val(data.author);
  $("#country2").val(data.country);

  $("#descriptionFormBook2").val(data.description);
  let op = [];
  data.category.map((index, item) =>
    op.push({ label: index.name, value: index._id })
  );
  return op;
}

function asd() {
  $("#chkveg").multiselect({
    includeSelectAllOption: true,
  });

  $("#btnget").click(function () {
    alert($("#chkveg").val());
  });
}
function selectElement(id, valueToSelect) {
  let element = document.getElementById(id);
  element.value = valueToSelect;
}
function ContentUpdate(props) {
  const [listCountry, setCountry] = useState([]);
  const [options, setOption] = useState([]);
  const [state, update] = useStore();
  const [op, setOp] = useState(null);
  const id = localStorage.getItem("bookUpdate");

  useEffect(() => {
    const load = async () => {
      bookService.getBookById(id).then((response) => {
        let data = response.data.data.book;
        if (!data) return;
        let options = [];
        data.category.map((index, item) =>
          options.push({ label: index.name, value: index._id })
        );

        setOp(options);
        $("#nameBook2").val(data.name);
        $("#author2").val(data.author);
        $("#descriptionFormBook2").html(data.description);

        selectElement("country2", data.country._id);
      });

      const result = await bookService.getAllCategory();

      let list = [];
      result.data.data.map((item) => {
        list.push({ value: item._id, label: item.name });
      });

      setOption(list);
      CategoryListFromSV = list;
    };

    load();

    bookService
      .getAllCountry()
      .then((response) => {
        setCountry(response.data.data);
      })
      .catch((err) => { });
  }, []);

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSubmission = () => { };
  const animatedComponents = makeAnimated();

  const navigate = useNavigate();
  const handleOnClick = useCallback(
    () => navigate("../all", { replace: true }),
    [navigate]
  );
  return (
    <>
      <div>
        <div className="formBook">
          <div>
            <label htmlFor="Name2">Name:</label>
            <input id="nameBook2" placeholder="Name" name="name" />
          </div>
          <div>
            <label htmlFor="author2">Author:</label>
            <input id="author2" placeholder="Name" name="name" />
          </div>
          <div>
            <label htmlFor="category2">Category:</label>

            {op && <AnimatedMulti list={options} default={op} />}
          </div>
          <div>
            <label htmlFor="country">Country:</label>
            <select name="country2" id="country2">
              {listCountry.map((item, index) => {
                return (
                  <option key={index} value={item._id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="descriptionFormBook">
            <label htmlFor="descriptionFormBook">Description:</label>
            <textarea
              id="descriptionFormBook2"
              type="text"
              name="descriptionFormBook"
            />
          </div>

          <label>
            Add cover image
            <br />
            <ContentPreview />
          </label>
        </div>
        <div className="submitFormBook">
          <span
            id="submitBook"
            onClick={() => {
              submitUpdateBook();
              // handleOnClick();
            }}
            style={{ cursor: "pointer" }}
          >
            SUBMIT
          </span>
        </div>
      </div>
    </>
  );
}

const submitUpdateBook = async () => {
  let name = $("#nameBook2").val();
  let author = $("#author2").val();

  // let category = $("#category2").val();
  var ek = [];
  $(".react-select__multi-value__label").each(function () {
    let labels = $(this).html();

    const result = getByValue(CategoryListFromSV, labels);

    ek.push(result.value);
  });

  let country = $("#country2").val();

  let descript = $("#descriptionFormBook2").val();
  let content = $("#contentPDF").prop("files")[0];
  if (name == "" || author == "" || ek.length == 0 || descript == "" || country == "") {
    notify1();
    return
  } else {
    notify4();
  }

  const formData = new FormData();

  formData.append("file", content);
  formData.append("name", name);
  formData.append("description", descript);
  formData.append("author", author);
  ek.forEach((element) => {
    formData.append("category[]", element);
  });

  formData.append("country", country);
  let jwts = jwt();
  let id = localStorage.getItem("bookUpdate");
  await fetch(`https://ebook4u-server.onrender.com/api/book/${id}`, {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: jwts,
    },
  })
    .then((result) => { })
    .catch((error) => { });

  window.location.href = "/admin/book/"
};

const submitNewChapter = async () => {
  let name = $("#nameChapter").val();
  let descript = $("#descriptionFormChapter").val();
  const formData = new FormData();
  formData.append("name", name);
  formData.append("contentText", descript);
  let jwts = jwt();
  let id = localStorage.getItem("bookAddChapter");

  await fetch(`https://ebook4u-server.onrender.com/api/chapter/${id}`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: jwts,
    },
  })
    .then((result) => { })
    .catch((error) => { });
};

function ContentAddChapter(props) {
  const id = localStorage.getItem("bookUpdate");
  useEffect(() => { }, []);

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSubmission = () => { };
  const animatedComponents = makeAnimated();

  const navigate = useNavigate();
  const handleOnClick = useCallback(
    () => navigate("../reported", { replace: true }),
    [navigate]
  );
  const handleOnClick2 = useCallback(
    () => navigate("../all", { replace: true }),
    [navigate]
  );
  return (
    <>
      <div>
        <div className="formBook">
          <div className="nameAddChapter">
            <label htmlFor="nameChapter" style={{ flex: "1" }}>
              Name of Chapter:
            </label>

            <input id="nameChapter" placeholder="Name" style={{ flex: "3" }} />
          </div>
          <div className="descriptionFormBook">
            <label htmlFor="descriptionFormChapter">Content:</label>

            <textarea
              id="descriptionFormChapter"
              type="text"
              name="descriptionFormChapter"
              placeholder="Content"
            />
          </div>
        </div>
        <div className="submitFormBook">
          <span
            id="submitChapter"
            onClick={() => {
              let name = $("#nameChapter").val();
              let descript = $("#descriptionFormChapter").val();
              if (
                name === "" ||
                descript === ""
              ) {
                notify1();
                return;
              } else {
                notify3();

                submitNewChapter();
              }

            }}
            style={{ cursor: "pointer" }}
          >
            SUBMIT
          </span>
        </div>
      </div>
    </>
  );
}

function getByValue(arr, value) {
  for (var i = 0, iLen = arr.length; i < iLen; i++) {
    if (arr[i].label == value) return arr[i];
  }
}
const submitBook = async () => {
  let name = $("#nameBook").val();
  let author = $("#author").val();

  let category = $("#category").val();
  var ek = [];
  $(".react-select__multi-value__label").each(function () {
    let labels = $(this).html();
    const result = getByValue(CategoryListFromSV, labels);
    ek.push(result.value);
  });
  let country = $("#country").val();
  let descript = $("#descriptionFormBook").val();
  let content = $("#contentPDF").prop("files")[0];
  const formData = new FormData();
  formData.append("file", content);
  formData.append("name", name);
  formData.append("description", descript);
  formData.append("author", author);

  ek.forEach((element) => {
    formData.append("category[]", element);
  });
  formData.append("country", country);
  let jwts = jwt();
  await fetch("https://ebook4u-server.onrender.com/api/book", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: jwts,
    },
  })
    .then((result) => {
      window.location.reload(false);
    })
    .catch((error) => { });
};

export default ManagerBook;
