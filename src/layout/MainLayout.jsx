import React from "react";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="main">
      <div className="mainContent">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
