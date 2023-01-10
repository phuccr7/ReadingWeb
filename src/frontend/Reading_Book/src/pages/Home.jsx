import React, { useState } from "react";
import Header from "../components/header/Header";
import Content from "../components/content/Content";
import DescribeContent from "../components/content/DescribeContent";
import Footer from "../components/footer/Footer";
import { CardBook } from "../components/cartBook/CartBook";
import { Route, Routes } from "react-router-dom";
import { useStore } from "../components/store/hook";
import BookDetails from "../components/content/BookDetails";

function Home() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<AllBook />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/book/page/:id" element={<AllBook />} />
      </Routes>
    </>
  );
}

function AllBook() {
  const [book, setBook] = useState(10);

  return (
    <div>
      <Header />
      <div className="bodyHome">
        <Content style={{ flex: 3 }} setBook={setBook} />
        <DescribeContent style={{ flex: 1 }} book={book} />
      </div>

      <Footer />
    </div>
  );
}

export default Home;
