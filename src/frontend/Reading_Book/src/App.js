import { Routes, Route } from 'react-router-dom'
import Header from "./components/header/Header";
import Admin from './pages/Admin';
import Home from "./pages/Home";
import User from "./pages/User";
import SidebarAdmin from './components/sidebar/SidebarAdmin';
import BookDetail from "./pages/BookDetail";
import Comment from "./components/comment/Comment"
import ReadBook from './components/readBook/readbook';
import SearchBook from './components/searchBook/searchbook';
import "./style/GlobalStyle.js"
import { StoreContext } from "./utils/Store";
import AboutUs from './components/content/aboutus';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import Login from './pages/Login';
import UserService from './service/UserService';

function App() {

  UserService.addView()
  return (



    <>
      <Routes>
        <Route path='/*' element={<Home />} />
        <Route path='/user/*' element={<User />} />
        <Route path='/home' element={<Home />} />
        <Route path='/admin/*' element={<Admin />} />
        <Route path='/read' element={<ReadBook />} />
        <Route path="/login/*" element={<Login />} />{" "}
        <Route path='/search/*' element={<SearchBook />} />
        <Route path='/aboutus' element={<AboutUs />} />

      </Routes>
    </>
  );
}

export default App;
