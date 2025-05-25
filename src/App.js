import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';

import DbTodo from './board/DbTodo';
import TxtTodo from './board/TxtTodo';

function App() {
  return (
    <Router>
      <div className="App">
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/board/DbTodo" style={{ marginRight: '10px' }}>DB방식</Link>
          <Link to="/board/TxtTodo">메모리방식</Link>
        </nav>

        

        <Routes>
          {/* ✅ 루트("/") 접근 시 /board/txt 로 리디렉션 */}
          <Route path="/" element={<Navigate to="/board/DbTodo" replace />} />
          
          <Route path="/board/DbTodo" element={<DbTodo />} />
          <Route path="/board/TxtTodo" element={<TxtTodo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
