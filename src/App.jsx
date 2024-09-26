import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import IndexList from "./components/IndexList";
import Create from "./components/Create";
import Edit from "./components/Edit";
import NotFound from "./components/NotFound";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<IndexList />} />
        <Route path="/index-list" element={<IndexList />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
