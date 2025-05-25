// TodoPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SERVER_URL = 'http://localhost:4000/txt/todo';
const DELETE_URL =  SERVER_URL + '/delete';

function TodoPage() {
  const [todoList, setTodoList] = useState(null);

  const fetchData = async () => {
    const response = await axios.get(SERVER_URL);
    setTodoList(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    const done = e.target.done.checked;
    await axios.post(SERVER_URL, { text, done });
    e.target.reset(); // 입력값 초기화
    fetchData();
  };

  const onDeleteHandler = async (id) => {
    try {
      await axios.post(DELETE_URL, { id });
      fetchData();
    } catch (err) {
      alert('삭제 중 오류가 발생했습니다.');
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={onSubmitHandler}>
        <input name="text" placeholder="할 일 입력" />
        <label>
          완료 여부 <input name="done" type="checkbox" />
        </label>
        <input type="submit" value="추가" />
      </form>

      {todoList && (
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
      )}
    </div>
  );
}

export default TodoPage;
