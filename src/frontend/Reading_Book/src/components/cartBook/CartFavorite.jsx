import React from "react";
import "./style.css";
import Close from "../../assets/imgs/close.png";
import axios from "axios";
import { Link } from "react-router-dom";
import UserService from "../../service/UserService";

import AOS from "aos";
import "aos/dist/aos.css";
import AboutBook from "../aboutBook/AboutBook";
import DescribeContent from "../content/DescribeContent";
import { updateBook } from "../store/action";
import { useStore } from "../store/hook";



const deleteFavorite = async () => {
  const id = localStorage.getItem("idToDeleteFav");
  let idBook = { idBook: id };
  const user = localStorage.getItem("user");

  await fetch("https://ebook4u-server.onrender.com/user/me/favorite-book", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",

      Authorization: `Bearer ${user}`,
    },
    body: JSON.stringify(idBook),
  })
    .then((result) => {
      window.location.reload(false);
    })
    .catch((error) => {});
};

// Start App
class Main extends React.Component {
  constructor() {
    super();

    this.state = {
      posts: {},
    };
  }

  fetchData = async () => {
    UserService.getFavBook()
      .then((response) => {

        let arr = response.data.data;
        console.log(arr);

        var clean = arr.filter((arr, index, self) =>
        index === self.findIndex((t) => (t._id === arr._id )))
        console.log(clean);
        this.setState({
          posts: clean,
        });
      })
      .catch((err) => {});
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div className="containFav">
        <div className="app-card-list2" id="app-CardBook-list">
          {Object.keys(this.state.posts).map((key) => (
            <CardBook key={key} index={key} details={this.state.posts[key]} />
          ))}
        </div>
      </div>
    );
  }
}

class CardBookHeader extends React.Component {
  // componentDidMount() {
  //     // or simply just AOS.init();
  //     AOS.init({
  //         // initialise with other settings
  //         duration: 3000
  //     });
  // }
  render() {
    const { image, category } = this.props;

    return (
      <header className="CardBook-favorite-header">
        {/* <h5 className="CardBook-header--title">{category}</h5> */}
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

        <br />
        <div
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            width: "20%",
            marginBottom: 10,
          }}
        >
          <img
            src={Close}
            alt=""
            height={40}
            width={40}
            onClick={() => {
              localStorage.setItem("idToDeleteFav", this.props.link);
              deleteFavorite();
            }}
            style={{ cursor: "pointer" }}
          />
        </div>
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
        <article className="CardBook">
          <CardBookHeader
            category={props.details.category}
            image={props.details.image}
          />
          <CardBookBody
            title={props.details.name}
            text={props.details.description}
            link={id}
          />
        </article>
      </>
    </div>
  );
}

export { Main, CardBook };
