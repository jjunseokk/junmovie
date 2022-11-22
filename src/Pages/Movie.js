import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Container, Dropdown, DropdownButton } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import MovieCard2 from '../Component/MovieCard2';
import { movieAction } from '../redux/action/movieAction';
import Pagination from "react-js-pagination";


const Movie = () => {

  const dispatch = useDispatch()
  const { popularMovies, search, sort, keyword } = useSelector((state) => state.movie);
  const getMovies = () => {
    dispatch(movieAction.getMovies());
  }

  useEffect(() => {
    getMovies();
    dispatch(movieAction.sortMovie());
  }, [])

  const [page, setPage] = useState(1);
  
  const [selectApi, setSelectApi] = useState(popularMovies)

  const handlePageChange = (page) => {
    setPage(page);
    dispatch(movieAction.getMovies(page));
    dispatch(movieAction.sortMovie(choiceResult, page));
    dispatch(movieAction.searchMovie(keyword, page));
  };

  
  const [showApi, setShowApi] = useState(1);

  const [choiceResult, setChoiceResult] = useState('');
  const show = (userChoice) => {
    setChoiceResult(userChoice);
    dispatch(movieAction.sortMovie(userChoice));
    setShowApi(2);
    setPage(1);
    dispatch(movieAction.getMovies(page));
    setSelectApi(sort);
  }


  const [gosort, setgoSort] = useState(false);
  const showSort = () => {
    setgoSort(gosort => !gosort);
  }

  useEffect(()=>{
    if(keyword === "") {
      console.log("키워드 공백");
      setSelectApi(popularMovies);
    } else {
      console.log("키워드 공백 아님 :", keyword)
      setShowApi(3)
      setSelectApi(search);
    }
  },[keyword])

  console.log("selectApi:::::::",selectApi)

  return (
    <Container className='movieContainer'>
      <div className={gosort ? 'movieSort active' : 'movieSort'}>
        <div className='sort_title'>
          <h1>Sort</h1>
          <button className='sort_btn'><FontAwesomeIcon className='sort_btn_txt' icon={faArrowDown} onClick={showSort} /></button>
        </div>
        <div className={gosort ? 'sort_body active' : 'sort_body'}>
          <h3>Sort Results By</h3>
          <DropdownButton id="dropdown-basic-button" title="Sort By">
            <Dropdown.Item onClick={() => show("")}>None</Dropdown.Item>
            <Dropdown.Item onClick={() => show("popularity.desc")} >Popularity(Desc)</Dropdown.Item>
            <Dropdown.Item onClick={() => show("popularity.asc")}>Popularity(Asc)</Dropdown.Item>
            <Dropdown.Item onClick={() => show("release_date.desc")}>Release Day(Desc)</Dropdown.Item>
            <Dropdown.Item onClick={() => show("release_date.asc")}>Release Day(Asc)</Dropdown.Item>
            <Dropdown.Item onClick={() => show("vote.desc")}>Vote(Desc)</Dropdown.Item>
            <Dropdown.Item onClick={() => show("vote.asc")}>Vote(Asc)</Dropdown.Item>
            <Dropdown.Item onClick={() => show("revenue.desc")}>Revenue(Desc)</Dropdown.Item>
            <Dropdown.Item onClick={() => show("revenue.asc")}>Revenue(Asc)</Dropdown.Item>
          </DropdownButton>
        </div>
        <div className='movie_range'>
          <div className='range_title'>
            <h1>Filter</h1>
          </div>
          <div>

          </div>
        </div>
      </div>
      <div className='movieDesign'>

        {
          showApi === 1 ? popularMovies.results && popularMovies.results.map((item, id) => <MovieCard2 key={id} item={item} />) :
          showApi === 2 ? sort.results && sort.results.map((item, id) => <MovieCard2 key={id} item={item} />) :
          showApi === 3 ? search.results && search.results.map((item, id) => <MovieCard2 key={id} item={item} />) : ""
        }


        <Pagination className="pagination"
          activePage={page} // 현재 페이지
          itemsCountPerPage={20} // 한 페이지랑 보여줄 아이템 갯수
          totalItemsCount={selectApi.total_results} // 총 아이템 갯수
          pageRangeDisplayed={5} // paginator의 페이지 범위
          prevPageText={"‹"} // "이전"을 나타낼 텍스트
          nextPageText={"›"} // "다음"을 나타낼 텍스트
          onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
          itemClass="li-style"
          linkClass="a-style"
        />
      </div>
    </Container>
  )
}

export default Movie