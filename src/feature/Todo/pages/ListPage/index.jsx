import queryString from 'query-string';
import React, { useState, useEffect } from 'react';
import { useLocation, useMatch, useNavigate, useSearchParams } from 'react-router-dom';
import TodoList from '../../components/TodoList';

ListPage.propTypes = {};

function ListPage(props) {
  const inittodoList = [
    {
      id: 1,
      title: 'Eat',
      status: 'new',
    },
    {
      id: 2,
      title: 'Sleep',
      status: 'completed',
    },
    {
      id: 3,
      title: 'Code',
      status: 'new',
    },
  ];

  const [todoList, setTodoList] = useState(inittodoList);

  /////////////////////////////////////////////////***********FilterURL***********************////////////////////////////////////////// */

  //*****************************lam filter status tren thanh URL và Cap nhat State khi thay doi URL*/////////////////////////////////

  const location = useLocation(); // dung hook location de lay vị trí hiện tại-hook này return về một đối tượng chứa thông tin về URL
  // bao gồm pathname (đường dẫn), search (phần truy vấn), và nhiều thông tin khác.

  const params = queryString.parse(location.search); // phân tích chuỗi truy vấn từ URL và lưu kết quả vào biến params

  const statusFromURL = params.status || 'all'; //lấy giá trị của tham số status từ đối tượng params.
  //Nếu không tìm thấy tham số này trong URL, bạn mặc định giá trị là "all".

  const [filteredStatus, setFilteredStatus] = useState(statusFromURL); //sử dụng React Hook useState để quản lý trạng thái filteredStatus.
  //Ban đầu, bạn đặt giá trị ban đầu của filteredStatus bằng statusFromURL

  const [searchParams, setSearchParams] = useSearchParams(); //hook này dùng để làm việc với các tham số truy vấn (query parameters) trong URL
  //cho phép bạn đọc và cập nhật các tham số này trong URL.

  useEffect(() => {
    setFilteredStatus(statusFromURL);
  }, [statusFromURL]); //useEffect hook này chạy khi giá trị của statusFromURL thay đổi
  // Khi URL thay đổi statusFromURL thay đổi, và đoạn mã trong useEffect sẽ cập nhật lại filteredStatus.

  const handleFilterChange = (newStatus) => {
    setFilteredStatus(newStatus); // cập nhật lại status: (filteredStatus) sẽ được thay đổi thành newStatus
    setSearchParams({ status: newStatus }); // sử dụng setSearchParams để cập nhật tham số status trong URL VD:nếu chọn "completed", URL sẽ trở thành /todos?status=completed.
    navigate(`/todos?status=${newStatus}`); // điều hướng trang dựa trên newStatus
  };

  const navigate = useNavigate(); //dung de dieu huong URL
  // const match = useMatch(); // dung de biet cai URL hien tai la gi co khop voi duong dan cua thang cha ben app.js khong

  const handleTodoClick = (todo, idx) => {
    //Khi làm việc với object và array thì mình phải clone nó ra một mảng mới
    const newTodoList = [...todoList];
    console.log(todo, idx);
    //Chuyển đổi cái state
    newTodoList[idx] = {
      ...newTodoList[idx],
      status: newTodoList[idx].status === 'new' ? 'completed' : 'new',
    };

    //Cập nhật cái TodoList
    setTodoList(newTodoList);
  };

  const handleShowAllClick = () => {
    setFilteredStatus('all');
  };

  const handleShowCompletedClick = () => {
    setFilteredStatus('completed');
  };

  const handleShowNewClick = () => {
    setFilteredStatus('new');
  };
  const renderedTodoList = todoList.filter(
    (todo) => filteredStatus === 'all' || filteredStatus === todo.status,
  );
  return (
    <div>
      <h3>Todo List</h3>
      <TodoList todoList={renderedTodoList} onTodoClick={handleTodoClick} />
      <div>
        <button onClick={() => handleFilterChange('all')}>Show All</button>
        <button onClick={() => handleFilterChange('completed')}>Show Completed</button>
        <button onClick={() => handleFilterChange('new')}>Show New</button>
      </div>
    </div>
  );
}

export default ListPage;
