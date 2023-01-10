import React from "react";
import "./style.css";
import Close from "../../assets/imgs/close.png";
import { Link } from "react-router-dom";
import axios from "axios";
import UserService from "../../service/UserService";
import bookService from "../../service/bookService";
import Pagination from "./pagination";
import AOS from "aos";
import "aos/dist/aos.css";
import AboutBook from "../aboutBook/AboutBook";
import DescribeContent from "../content/DescribeContent";
import { updateBook } from "../store/action";
import { useStore } from "../store/hook";
// export const StoreContext = React.createContext(null);

const url = "https://ebook4u-server.onrender.com/api/book/all";

// Start App
class Main extends React.Component {
  constructor() {
    super();

    this.state = {
      posts: {},
    };
  }

  fetchData = async () => {
    UserService.getAllBook()
      .then((response) => {
        localStorage.setItem(
          "totalPage",
          (response.data.data.length / 8).toFixed()
        );
        localStorage.setItem("totalBook", response.data.data.length);
        localStorage.setItem("bookPerPage", 8);
      })
      .catch((err) => {});

    bookService
      .getPage()
      .then((response) => {
        this.setState({
          posts: response.data.data,
        });
      })
      .catch((err) => {});
  };
  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div>
        <div className="app-card-list" id="app-CardBook-list">
          {Object.keys(this.state.posts).map((key) => (
            <CardBook key={key} index={key} details={this.state.posts[key]} />
          ))}
        </div>
        <Pagination />
      </div>
    );
  }
}

class Button extends React.Component {
  render() {
    return <button className="button button-primary"></button>;
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
