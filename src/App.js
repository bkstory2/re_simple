import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink, Navigate } from 'react-router-dom';

import DbTodo from './board/DbTodo';
import TxtTodo from './board/TxtTodo';

function App() {
  const activeStyle = {
    color: 'red',
    fontWeight: 'bold',
  };

  return (
    <Router>
      <div className="App">
        <nav style={{ marginBottom: '20px' }}>
          <NavLink
            to="/board/DbTodo"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            DB방식
          </NavLink>
          <span style={{ margin: '0 10px' }}></span>
          <NavLink
            to="/board/TxtTodo"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            메모리방식
          </NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/board/DbTodo" replace />} />
          <Route path="/board/DbTodo" element={<DbTodo />} />
          <Route path="/board/TxtTodo" element={<TxtTodo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
