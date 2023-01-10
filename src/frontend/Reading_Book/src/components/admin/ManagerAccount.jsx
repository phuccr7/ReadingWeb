// import { fontSize } from '@mui/system';
import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import "./admin.css";
import StyleHome from "../../style/content.module.css";
import ban from "../../assets/imgs/banAC.png";
import reuse from "../../assets/imgs/reuse.png";
import {
  Navigate,
  Route,
  Routes,
  useHref,
  useNavigate,
} from "react-router-dom";
import AlertDialogSlide from "../dialog/Dialog";
import UserService from "../../service/UserService";
import $ from "jquery";
import Slide from "@mui/material/Slide";

function ManagerAccount() {
  return (
    <>
      <Routes>
        <Route index element={<Navigate to="all" replace />} />

        <Route path="all" element={<AllAccount />} />
        <Route path="reported" element={<BannedAccount />} />
        <Route path="search" element={<SearchAccount />} />
      </Routes>
    </>
  );
}

function AllAccount() {
  return (
    <div>
      <div className="mainTittle">
        <div className="mainTitleMgb">User Management </div>
        <Title title={"Admin > User Management"} />
        <div className="mainContent">
          <Content />
        </div>
      </div>
    </div>
  );
}

function BannedAccount() {
  return (
    <div>
      <div className="mainTittle">
        <div className="mainTitleMgb">Reported Account</div>
        <Title title={"Admin > User Management > Reported Account "} />
        <div className="mainContent">
          <TableBannedAccount />
        </div>
      </div>
    </div>
  );
}
function SearchAccount() {
  return (
    <div>
      <div className="mainTittle">
        <div className="mainTitleMgb">Search Account</div>
        <Title title={"Admin > User Management > Reported Account "} />
        <div className="mainContent">
          <ContentSearch />
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

function Content(props) {
  const [listAccount, setList] = useState(null);

  useEffect(() => {
    UserService.getAllAccount()
      .then((response) => {
        setList(response.data.data);
      })
      .catch((err) => { });
  }, []);
  const navigate = useNavigate();
  const handleOnClick4 = useCallback(
    () => navigate("../search", { replace: true }),
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
              id="searchHomeAdminUser"
            />

            <button
              className="adminSearchButton"
              onClick={() => {
                let val = $("#searchHomeAdminUser").val();
                localStorage.setItem("nameSearchUser", val);
                handleOnClick4();
              }}
            >
              Search
            </button>
          </div>
        </div>
        <hr style={{ color: "red" }}></hr>
        <table className="paleBlueRows">
          <thead>
            <tr>
              <th>No.</th>
              <th>Email</th>
              <th>Username</th>
              <th>Name</th>
              <th>Type</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {listAccount?.map((item, index) => {
              return (
                <tr key={index + 1}>
                  <th>{index + 1}</th>
                  <th>{item.email}</th>
                  <td>{item.username}</td>
                  <td>{item.fullname}</td>
                  <td>{item.role}</td>
                  <td>{item.status}</td>

                  <td className="optionAdmin">
                    <AlertDialogSlide icon={ban} user={item._id} type={"ban"} />
                    <AlertDialogSlide
                      icon={reuse}
                      user={item._id}
                      type={"unbanned"}
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
  const [listAccount, setList] = useState(null);
  const [name, setName] = useState(null);
  useEffect(() => {
    let name = localStorage.getItem("nameSearchUser");
    UserService.searchUser(name)
      .then((response) => {
        setList(response.data.data);
      })
      .catch((err) => { });
  }, [name]);

  const navigate = useNavigate();
  const handleOnClick = useCallback(
    () => navigate("../reported", { replace: true }),
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
              id="searchHomeAdminUser"
            />
            <button
              className="adminSearchButton"
              onClick={() => {
                let val = $("#searchHomeAdminUser").val();
                localStorage.setItem("nameSearchUser", val);
                setName(val);
              }}
            >
              Search
            </button>
          </div>
        </div>
        <hr style={{ color: "red" }}></hr>
        <table className="paleBlueRows">
          <thead>
            <tr>
              <th>No.</th>
              <th>Email</th>
              <th>Username</th>
              <th>Name</th>
              <th>Type</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {listAccount?.map((item, index) => {
              return (
                <tr key={index + 1}>
                  <th>{index + 1}</th>
                  <th>{item.email}</th>
                  <td>{item.username}</td>
                  <td>{item.fullname}</td>
                  <td>{item.role}</td>
                  <td>{item.status}</td>

                  <td className="optionAdmin">
                    <AlertDialogSlide icon={ban} user={item._id} type={"ban"} />{" "}
                    {/* <img className='icon' src={del} alt="" onClick={() => deleteAccount(item.Username)} /> */}
                    <AlertDialogSlide
                      icon={reuse}
                      user={item._id}
                      type={"unbanned"}
                    />{" "}
                    {/* <img className='icon' src={del} alt="" onClick={() => deleteAccount(item.Username)} /> */}
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
function TableBannedAccount(props) {
  const [listAccount, setList] = useState([]);

  useEffect(() => {
    UserService.getReport()
      .then((response) => {
        setList(response.data.data);
      })
      .catch((err) => { });
  }, []);

  const navigate = useNavigate();
  const handleOnClick = useCallback(
    () => navigate("../reported", { replace: true }),
    [navigate]
  );
  return (
    <>
      <div>
        <div className={StyleHome.searchBarAdmin}></div>
        <hr style={{ color: "red" }}></hr>
        <table className="paleBlueRows">
          <thead>
            <tr>
              <th>No.</th>
              <th>Username</th>
              <th>Content</th>
              <th>Reported by</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {listAccount?.map((item, index) => {
              return (
                <tr key={index + 1}>
                  <th>{index + 1}</th>
                  <td>{item.object.username}</td>
                  <th>{item.reason}</th>
                  <td>{item.reporter.username}</td>
                  <td className="optionAdmin">
                    <AlertDialogSlide
                      icon={ban}
                      user={item.object._id}
                      type={"ban this user"}
                    />{" "}
                    {/* <img className='icon' src={del} alt="" onClick={() => deleteAccount(item.Username)} /> */}
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

export default ManagerAccount;
