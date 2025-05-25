// TodoPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SERVER_URL = 'http://localhost:4000/txt/todo';
const DELETE_URL = SERVER_URL + '/delete';

function TodoPage() {
  const [todoList, setTodoList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (currentPage = 1) => {
    const response = await axios.get(`${SERVER_URL}?page=${currentPage}`);
    setTodoList(response.data.data);
    setPage(response.data.page);
    setTotalPages(response.data.totalPages);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    const done = e.target.done.checked;
    await axios.post(SERVER_URL, { text, done });
    e.target.reset();
    fetchData(page);
  };

  const onDeleteHandler = async (id) => {
    try {
      await axios.post(DELETE_URL, { id });
      const newList = todoList.filter((todo) => todo.id !== id);
      const newPage = newList.length === 0 && page > 1 ? page - 1 : page;
      fetchData(newPage);
    } catch (err) {
      alert('삭제 중 오류가 발생했습니다.');
      console.error(err);
    }
  };

  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchData(newPage);
    }
  };

  return (
    <div>
      <h1>Todo List (Page {page} of {totalPages})</h1>
      <form onSubmit={onSubmitHandler}>
        <input name="text" placeholder="할 일 입력" />
        <label>
          완료 여부 <input name="done" type="checkbox" />
        </label>
        <input type="submit" value="추가" />
      </form>

      <ul>
        {todoList.map((todo) => (
          <li key={todo.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div>{todo.id}</div>
            <div>{todo.text}</div>
            <div>{todo.done ? '✅' : '❌'}</div>
            <button onClick={() => onDeleteHandler(todo.id)}>삭제</button>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => changePage(page - 1)} disabled={page <= 1}>
          ◀ 이전
        </button>
        <span style={{ margin: '0 1rem' }}>{page} / {totalPages}</span>
        <button onClick={() => changePage(page + 1)} disabled={page >= totalPages}>
          다음 ▶
        </button>
      </div>
    </div>
  );
}

export default TodoPage;
