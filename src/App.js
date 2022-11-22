import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './Pages/Home';
import Movie from './Pages/Movie';
import MovieDetail from './Pages/MovieDetail';
import Navigation from './Component/Navigation';

/* 
1. 3개의 페이지가 필요 홈페이지, movie 페이지, movieDetail 페이지
2. 홈페이지에서 배너를 볼 수 있다.
3. 3가지 섹션의 영화를 볼 수 있다. (popular, tor rated, upcoming)
4. 각 영화에 마우스를 올려두면 제목, 장르, 점수, 인기도, 청불여부
5. 영화를 슬라이드로 넘기면서 볼 수 있다.


6. 영화 디테일 페이지에서 영화에 대한 디테일한 정보를 볼 수 있다. (포스터, 제목, 줄거리, 점수, 인기도, 청불여부, 예산, 이익, 러닝타임 등..)
7. trailer를 누르면 trailer를 볼 수 있다.
8. 영화에 리뷰도 볼 수 있다.
9. 관련된 영화도 볼 수 있다.


10. 영화 검색을 할 수 있다.
11. 영화 정렬 할 수 있다.
12. 영화를 필터링 할 수도 있다.


*/


function App() {
  return (
    <div >
      <Navigation/>
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/Movie' element={<Movie/>} />
          <Route path='/Movie/:id' element={<MovieDetail/>} />
      </Routes>
    </div>
  );
}

export default App;
