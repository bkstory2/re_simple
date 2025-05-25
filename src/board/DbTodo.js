// Page2.js
import { useEffect, useState } from "react";
import axios from 'axios';
import { TextField, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function Page2() {
   //react query 로 변형 해 보자고 ..??  ,  로딩 중 처리 

  const [todoList, setTodoList] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const limit = 5; // 페이지당 항목 수
  const [total, setTotal] = useState(0);

  const fetch_data = async (searchText = '', pageNum = 1) => {
    try {
      const response = await axios.post('http://localhost:4000/api/list', {
        search: searchText,
        page: pageNum,
        limit,
      });

      console.log(" response ====> "  , response) ; 

      setTodoList(response.data.data);
      setTotal(response.data.total);
    } catch (error) {
      console.error('데이터 가져오기 오류:', error);
    }
  };

  
   // 한번만 실행 되도록 한다 . 
  useEffect(() => {
    fetch_data(search, page);
  }, [page]);

  const onSearchHandler = (e) => {
    e.preventDefault();
    setPage(1); // 검색 시 페이지 초기화
    fetch_data(search, 1);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    const done = e.target.done.value === 'true';

    console.log(" add text  => " , text ) ; 
    console.log(" add done  => " , done ) ; 

    try {
      await axios.post('http://localhost:4000/api/add', { text, done })
      .then(  fetch_data(search, page)  ) ;
      
      e.target.reset();
    } catch (error) {
      console.error('추가 요청 오류:', error);
    }
  };

  const onDeleteHandler = async (id) => {
    try {
      await axios.post('http://localhost:4000/api/delete', { id })
      .then(        fetch_data(search, page)  ) ;

    } catch (error) {
      console.error('삭제 요청 오류:', error);
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>🔍 검색</Typography>
      <form onSubmit={onSearchHandler} style={{ marginBottom: 20 }}>
        <TextField
          fullWidth
          label="검색어를 입력하세요"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="contained" type="submit" sx={{ marginTop: 2 }}>
          검색
        </Button>
      </form>

      <form onSubmit={onSubmitHandler} style={{ marginBottom: 20 }}>
        <TextField
          fullWidth
          label="Text"
          name="text"
          required
          variant="outlined"
          sx={{ marginBottom: 2 }}
        />

        <FormControl component="fieldset" sx={{ marginBottom: 2 }}>
          <FormLabel component="legend">Done</FormLabel>
          <RadioGroup row name="done" defaultValue="true">
            <FormControlLabel value="true" control={<Radio />} label="True" />
            <FormControlLabel value="false" control={<Radio />} label="False" />
          </RadioGroup>
        </FormControl>

        <Button variant="contained" type="submit">
          추가
        </Button>
      </form>

      <Typography variant="h5" gutterBottom> Todo List</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Text</TableCell>
              <TableCell align="center">완료 여부</TableCell>
              <TableCell align="center">삭제</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todoList.map((todo) => (
              <TableRow key={todo.id}>
                <TableCell align="center">{todo.id}</TableCell>
                <TableCell align="center">{todo.text}</TableCell>
                <TableCell align="center">{todo.done ? 'Y' : 'N'}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => onDeleteHandler(todo.id)}
                  >
                    삭제
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/*  페이징 버튼 */}
      <Box sx={{ marginTop: 2 }}>
        {Array.from({ length: totalPages }, (_, idx) => (
          <Button
            key={idx + 1}
            onClick={() => setPage(idx + 1)}
            variant={page === idx + 1 ? 'contained' : 'outlined'}
            sx={{ margin: 1 }}
          >
            {idx + 1}
          </Button>
        ))}
      </Box>
    </Box>

  );

}

export default Page2;
