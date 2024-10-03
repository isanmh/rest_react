import React from "react";
import { Route, Routes } from "react-router-dom";
import IndexList from "./components/IndexList";
import Create from "./components/Create";
import Edit from "./components/Edit";
import NotFound from "./components/NotFound";
import Header from "./components/Header";
import About from "./components/About";
import Saldo from "./components/Saldo";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/about" element={<About />} />
        <Route path="/informasi" element={<Saldo />} />
        <Route path="/index-list" element={<IndexList />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
