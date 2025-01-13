import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import RepoList from "../components/RepoList";
import RepoDetails from "../components/RepoDetails";
import Followers from "../components/Followers";


const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/repos/:username" element={<RepoList />} />
        <Route path="/repo/:username/:repoName" element={<RepoDetails />} />
        <Route path="/followers/:username" element={<Followers />} />
    </Routes>
  );
};

export default AllRoutes;
