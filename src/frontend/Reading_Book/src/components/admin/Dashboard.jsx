import React, { useState, useEffect } from "react";
import "./dashboard.css";
import BarChart from "../content/BarChart";
import { UserData } from "../content/Data";
import AuthAdmin from "../../service/auth";
import bookService from "../../service/bookService";

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [mode, setMode] = useState(1);
  const [type1, setType1] = useState("week");
  const [type2, setType2] = useState(0);

  const [listAccount, setList] = useState([]);
  const [listAccount1, setList1] = useState([]);
  const [listAccount2, setList2] = useState([]);

  useEffect(() => {
    const load = async () => AuthAdmin();

    load();
    callAPI();

    // window.location.reload(false);
  }, []);

  useEffect(() => {
    let data = getData("thisWeek");

    setUserData(data);
  }, [listAccount]);

  const callAPI = async () => {
    const [res, res1, res2] = await Promise.all([
      bookService.getChart(type1, type2),
      bookService.getChart("week", 1),
      bookService.getChart("month", 1),
    ]);

    setList(res?.data?.data);
    setList1(res1?.data?.data);
    setList2(res2?.data?.data);
  };

  const getData = (type = "thisWeek") => {
    let labels = [];
    let data = [];
    switch (type) {
      case "thisWeek":
        labels = listAccount?.map((data) => data.date);
        data = listAccount?.map((data) => data.view);
        break;
      case "lastWeek":
        labels = listAccount1.map((data) => data.date);
        data = listAccount1.map((data) => data.view);

        break;
      case "lastMonth":
        labels = UserData.map((data) => data.lastMonth);
        data = listAccount2.map((data) => data.totalViewOfWeek);

        break;
      default:
        labels = listAccount?.map((data) => data.date);
        data = listAccount?.map((data) => data.view);
    }

    return {
      labels: labels,
      datasets: [
        {
          label: "Number of views",
          data: data,
          backgroundColor: [
            "rgba(100,236,179,255)",
            "rgba(100,236,179,255)",
            "rgba(100,236,179,255)",
            "rgba(100,236,179,255)",
            "rgba(100,236,179,255)",
            "rgba(100,236,179,255)",
            "rgba(100,236,179,255)",
          ],
          borderColor: "black",
          borderWidth: 2,
          
        },
      ],
    };
  };

  function Title(props) {
    const [Title, setTitle] = useState("");
    useEffect(() => {
      setTitle(props.title);
    }, [props.title]);
    return <div className={"titleDashboard"}> {Title} </div>;
  }

  function Content(props) {
    const [listAccount, setList] = useState([]);

    useEffect(() => {
      const load = async () => await AuthAdmin();
      load();

      bookService
        .getTopBook()
        .then((response) => {
          setList(response.data.data);
        })
        .catch((err) => {});
    }, []);

    return (
      <div style={{ padding: 20 }}>
        <div className="numbers">
          <p className="text-sm mb-0 text-capitalize font-weight-bold text-center text-danger">
            Top Books
          </p>
          {listAccount?.map((item, index) => {
            return (
              <h5
                className="font-weight-bolder mb-0"
                key={index}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  className=" text-sm font-weight-bolder .text-dark"
                  style={{ width: "45%" }}
                >
                  {item.name}
                </span>
                <span
                  className=" text-sm font-weight-bolder .text-dark"
                  style={{ width: "45%" }}
                >
                  {item.view} lượt xem
                </span>
              </h5>
            );
          })}
        </div>
      </div>
    );
  }

  function ContentSummary(props) {
    const [listAccount, setList] = useState([]);

    useEffect(() => {
      const load = async () => await AuthAdmin();
      load();

      bookService
        .getSummary()
        .then((response) => {
          setList(response.data.data);
        })
        .catch((err) => {});
    }, []);

    return (
      <>
        <div style={{ padding: 20, width: "100%" }}>
          <div className="numbers">
            <p className="text-sm mb-0 text-capitalize font-weight-bold text-center text-danger">
              Summary
            </p>

            <h5
              className="font-weight-bolder mb-0"
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <span className=" text-sm font-weight-bolder .text-dark">
                New users
              </span>
              <span className=" text-sm font-weight-bolder .text-dark">
                {listAccount.totalNewUser}
              </span>
            </h5>

            <h5
              className="font-weight-bolder mb-0"
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <span className=" text-sm font-weight-bolder .text-dark">
                Total users
              </span>
              <span>{listAccount.totalUser}</span>
            </h5>
            <h5
              className="font-weight-bolder mb-0"
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <span className=" text-sm font-weight-bolder .text-dark">
                New books
              </span>
              <span>{listAccount.totalNewBook}</span>
            </h5>
            <h5
              className="font-weight-bolder mb-0"
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <span className=" text-sm font-weight-bolder .text-dark">
                Total books
              </span>
              <span>{listAccount.totalBook}</span>
            </h5>
          </div>
        </div>
      </>
    );
  }

  const changeToThisWeek = () => {
    const data = getData("thisWeek");
    setUserData(data);
    setMode(1);
  };

  const changeToLastWeek = () => {
    const data = getData("lastWeek");
    setUserData(data);
    setMode(2);
  };

  const changeToLastMonth = () => {
    const data = getData("lastMonth");
    setUserData(data);
    setMode(3);
  };

  return (
    <>
      <div className="mainTittle1">
        {/* <HeaderAdmin /> */}
        <div className="mainTitleMgb">Dashboard </div>
        <Title title={"Admin > Dashboard"} />
        <div className="mainContent2">
          <div
            style={{
              width: 700,
              borderRadius: "15px",
              paddingTop: "5px",
            }}
          >
            <div className="btnSelect">
              <button
                type="button"
                className={`btn ${
                  mode === 1 ? "btn-secondary" : "btn-outline-secondary"
                }`}
                disabled={mode === 1}
                style={{ marginLeft: "5px" }}
                onClick={changeToThisWeek}
              >
                This week
              </button>
              <button
                type="button"
                className={`btn ${
                  mode === 2 ? "btn-secondary" : "btn-outline-secondary"
                }`}
                disabled={mode === 2}
                style={{ marginLeft: "5px" }}
                onClick={changeToLastWeek}
              >
                Last week
              </button>
              <button
                type="button"
                className={`btn ${
                  mode === 3 ? "btn-secondary" : "btn-outline-secondary"
                }`}
                disabled={mode === 3}
                style={{ marginLeft: "5px" }}
                onClick={changeToLastMonth}
              >
                Last month
              </button>
            </div>
            {userData && <BarChart chartData={userData} />}
          </div>
        </div>
        <div className="mainContent4">
          <Content />
        </div>

        <div className="mainContent3">
          <ContentSummary />
        </div>
      </div>
      <div className="contentDashboard"></div>
    </>
  );
}

export default Dashboard;
