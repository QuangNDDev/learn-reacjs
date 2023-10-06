// import "./App.css";

import { NavLink, Route, Routes } from 'react-router-dom';
import TodoFeature from './feature/Todo/index';
import ListPage from './feature/Todo/pages/ListPage';
import DetailPage from './feature/Todo/pages/Detailpage';
import NotFound from './components/NotFound';
import { useEffect } from 'react';
import productApi from './api/productApi';

function App() {
  useEffect(() => {
    //muon lay 10 category
    const params = {
      _limit: 10,
    };
    const fetchProducts = async () => {
      const productList = await productApi.getAll(params);
      console.log(productList);
    };
    fetchProducts();
  }, []);
  return (
    <div className="App">
      Home Page
      <p>
        <NavLink to="/todos">Todo</NavLink>
        {/* navlink thuong dung cho Menu */}
      </p>
      <Routes>
        {/* Routes  se render thang Route dau tien ma no co cai path duoc match voi cai URL hien tai  */}
        <Route path="/todos/" element={<ListPage />} exact />
        {/* exact khi nguoi dung nhap dung voi cai path thi no moi render giao dien */}
        {/* khi khong khai bao thi exact mac dinh bang false: exact = {false}; */}
        <Route path="/todos/:todoid" element={<DetailPage />} />
        {/* Route match voi bao nhieu thang thi se render len bay nhieu thang */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      Footer
    </div>
  );
}

export default App;
