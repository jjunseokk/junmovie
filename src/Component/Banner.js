import React from 'react'

const Banner = ({movie}) => {
  console.log(movie.results[0]);
  console.log(movie);
  return (
    <div
    className='banner'
    style={{
        backgroundImage : 
        "url("+`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie.results[0].poster_path}`+")",
    }}>

      <div className='banner-info'>
        <h1>{movie.results[0].title}</h1>
        <p>{movie.results[0].overview}</p>
      </div>
    </div>
  )
}

export default Banner