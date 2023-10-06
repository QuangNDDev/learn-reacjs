import React from "react";
import { Route, Routes, matchPath, useMatch } from "react-router-dom";
import DetailPage from "./pages/Detailpage";
import ListPage from "./pages/ListPage";
import NotFound from "../../components/NotFound";

TodoFeature.propTypes = {};

function TodoFeature(props) {
  //trong react-router-doom v6 khong co component Todofeature van chay duoc
  const match = useMatch();
  return (
    <div>
      <Routes>
        {/* lay patch cua thang cha ben app.js truyen vao math.patch
        co nghia la thang cha ben app.js xai cai path nao thi no se lay cai path do */}
        <Route path={match.path} element={ListPage} exact />
        <Route path={`${match.path}/:todoid`} element={DetailPage} exact />
        <Route path="*" element={NotFound} exact />
      </Routes>
    </div>
  );
}

export default TodoFeature;
