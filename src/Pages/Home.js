import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { movieAction } from '../redux/action/movieAction';
import Banner from '../Component/Banner';
import MovieSlide from '../Component/MovieSlide';
import ClipLoader from "react-spinners/ClipLoader";
import { useFetcher } from 'react-router-dom';


const Home = () => {

  const dispatch = useDispatch();
  const { popularMovies, topRatedMovies, upcomingMovies, loading, } = useSelector((state) => state.movie);

  useEffect(() => {
      dispatch(movieAction.getMovies());
  }, [])

  // loading이 true면 loading 스피너를 보여주고
  // loading이 false면 데이터를 보여주고

  // true : 데이터 도착 전
  // false : 데이터 도착 후 또는 에러가 났을 때


  if(loading){
    return <ClipLoader color="#ffff" loading={loading} size={150} aria-label="Loading Spinner" data-testid="loader"/>;
  }
  console.log("pop::::::::",popularMovies)
  return (
    <div className='home'>
      <Banner movie={popularMovies} />
      <h1>Popular Movie</h1>
      <MovieSlide movies={popularMovies} />
      <h1>Top rated Movie</h1>
      <MovieSlide movies={topRatedMovies} />
      <h1>Upcoming Movie</h1>
      <MovieSlide movies={upcomingMovies} />
    </div>
  )
}

export default Home