import React from "react";
import "./style.css";
import Close from "../../assets/imgs/close.png";
import { Link } from "react-router-dom";
import axios from "axios";
import UserService from "../../service/UserService";
import bookService from "../../service/bookService";
import Pagination from "./paginationSearch";

import AOS from "aos";
import "aos/dist/aos.css";
import AboutBook from "../aboutBook/AboutBook";
import DescribeContent from "../content/DescribeContent";
import { updateBook } from "../store/action";
import { useStore } from "../store/hook";

// Start App
class Main extends React.Component {
  constructor() {
    super();

    this.state = {
      posts: {},
    };
  }

  fetchData = async () => {
    let searchContent = localStorage.getItem("searchName");

    bookService
      .getSearchBook(searchContent)
      .then((response) => {
        let a = (response.data.data.length / 8).toFixed()
        if(a < 1) a=1;
        localStorage.setItem(
          "totalPageSearch",
          a
        );
        localStorage.setItem("totalBookSearch", response.data.data.length);
      })
      .catch((err) => {
        console.log(err);
      });

    bookService
      .getPageSearch()
      .then((response) => {
        this.setState({
          posts: response.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div>
        <div className="app-card-list" id="app-CardBook-list">
          {Object.keys(this.state.posts)
            // .map(key => <div>asd</div>)
            .map((key) => (
              <CardBook key={key} index={key} details={this.state.posts[key]} />
            ))}
        </div>
        <Pagination />
      </div>
    );
  }
}

class CardBookHeader extends React.Component {
  render() {
    const { image, category } = this.props;

    return (
      <header className="CardBook-favorite-header">
        <img
          src={image}
          alt=""
          height={300}
          width={246}
          style={{ borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}
        />
      </header>
    );
  }
}

class CardBookBody extends React.Component {
  render() {
    return (
      <div className="CardBook-body">
        <h5 className="body-content" style={{ textAlign: "center" }}>
          {this.props.title}
        </h5>
      </div>
    );
  }
}

const MyContext = React.createContext();

function CardBook(props) {
  const [state, update] = useStore();
  const id = props.details._id;

  return (
    <div>
      <>
        <Link to={`/book/${id}`}>
          <div
            className="CardBook"
            style={{ cursor: "pointer" }}
            onClick={() => window.localStorage.setItem("idBookForRead", id)}
          >
            <CardBookHeader
              category={props.details.category}
              image={props.details.image}
            />
            <CardBookBody
              title={props.details.name}
              text={props.details.description}
              link={props.details._id}
            />
          </div>
        </Link>
      </>
    </div>
  );
}

export { Main, CardBook };
