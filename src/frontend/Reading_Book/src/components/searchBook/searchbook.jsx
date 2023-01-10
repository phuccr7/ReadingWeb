import React, { useState, useEffect } from "react";
import bookService from "../../service/bookService";
import { Route, Routes } from "react-router-dom";
import Style from "../../style/content.module.css";
import { Main, StoreContext } from "../cartBook/CartSearch";
import Header from "../header/HeaderDetailBook";
import "./searchbook.css";
import $ from "jquery";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const notify = () => toast('Please enter at least one field!!!', {
  position: "top-center",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
});

function Search() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SearchBook />} />
        <Route path="book/page/:id" element={<SearchBook />} />
      </Routes>
    </>
  );
}

function SearchBook() {
  let searchContent = localStorage.getItem("searchName");

  const [listCategory, setListCategory] = useState([]);
  const [listCountry, setListCountry] = useState([]);

  useEffect(() => {
    bookService
      .getAllCategory()
      .then((response) => {
        setListCategory(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    bookService
      .getAllCountry()
      .then((response) => {
        setListCountry(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Header />
      <ToastContainer />

      <div className="container-Search">
        <div className="search-content" style={{ marginTop: "20px" }}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              aria-label="Text input with segmented dropdown button"
              placeholder="Enter the name of book"
              defaultValue={`${searchContent}`}
              id="searchBookPage"
            />
            <div className="input-group-append">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => {
                  let name = $("#searchBookPage").val();
                  let category = $("#categorySearch option:selected").val();
                  console.log(category);
                  let country = $("#countrySearch option:selected").val();
                  console.log(country);
                  
                  let result = name.toLowerCase();
                  
                  localStorage.setItem("searchName", result);
                  localStorage.setItem("searchCategoryPage", category);
                  localStorage.setItem("searchCountryPage", country);
                  if(name !== "" || category !== "" || country !== ""){
                    window.location.reload(false);

                  }
                  else{
                    notify();
                  }
                }}
              >
                Search
              </button>
            </div>
          </div>
          <div>
            <label
              htmlFor="category"
              style={{ marginBottom: "10px", marginTop: "10px" }}
            >
              Category:
            </label>
            <br />
            <select name="category" id="categorySearch" defaultValue="">
              <option defaultValue={true}></option>

              {listCategory.map((item, index) => {
                return (
                  <option key={index} id={item.name}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label
              htmlFor="country"
              style={{ marginBottom: "10px", marginTop: "10px" }}
            >
              Country:
            </label>
            <br />
            <select name="country" id="countrySearch" defaultValue={""}>
              <option defaultValue={true}></option>

              {listCountry.map((item, index) => {
                return (
                  <option key={index} id={item.name}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="bodyHome1" style={{ marginTop: "20px" }}>
          <div className={Style.content}>
            <div className={Style.forYou}>
              <div
                className={Style.contentForYou}
                style={{ marginLeft: "30px" }}
              >
                <Main />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
