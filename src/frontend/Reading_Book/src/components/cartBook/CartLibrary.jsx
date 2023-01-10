import React from "react";
import "./style.css";
import Close from "../../assets/imgs/close.png";
import axios from "axios";
import UserService from "../../service/UserService";
import bookService from "../../service/bookService";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import AboutBook from "../aboutBook/AboutBook";
import DescribeContent from "../content/DescribeContent";
import { updateBook } from "../store/action";
import { useStore } from "../store/hook";

var arrayLibrary = JSON.parse(localStorage.getItem("arrayLibrary"));
console.log(arrayLibrary);

// Start App
class Main extends React.Component {
  constructor() {
    super();

    this.state = {
      posts: {},
    };
  }

  fetchData = async () => {
    let array = [];
    for (var i = 0; i < arrayLibrary.length; i++) {
      await bookService
        .getBookById(arrayLibrary[i])
        .then((response) => {
          console.log(response.data.data.book);
          array.push(response.data.data.book);
          

          
        })
        .catch((err) => {});
    }
    console.log(array);

    let arr = array;
    console.log(arr);
        var clean = arr.filter((arr, index, self) =>
        index === self.findIndex((t) => (t._id === arr._id )))
        console.log(clean);

        this.setState({
          posts: clean,
        });
  };
  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div className="containFav">
        <div className="app-card-list1" id="app-CardBook-list">
          {Object.keys(this.state.posts).map((key) => (
            <CardBook key={key} index={key} details={this.state?.posts[key]} />
          ))}
        </div>
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
          <article article className="CardBook">
            <CardBookHeader
              category={props.details.category}
              image={props.details.image}
            />
            <CardBookBody
              title={props.details.name}
              text={props.details.description}
            />
          </article>
        </Link>
      </>
    </div>
  );
}

export { Main, CardBook };
