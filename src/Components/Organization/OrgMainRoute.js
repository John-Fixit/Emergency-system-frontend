import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard"
import Messages from "./Messages";
function OrgMainRoute() {
  return (
    <>
      <Routes>
        <Route path="/:id" element={<Dashboard />}/>
        <Route path="/:id/:cat" element={<Messages />}/>
      </Routes>
    </>
  );
}

export default OrgMainRoute;
