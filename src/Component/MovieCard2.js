import React from 'react'
import { Badge } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const MovieCard2 = (item) => {

    const navigation = useNavigate();

    const showDetail = () => {
        navigation(`/Movie/${item.item.id}`);
    }

    const { genreList } = useSelector((state) => state.movie);

    return (
        <div className='MovieCard2'
            style={{
                backgroundImage:
                    "url(" + `https://www.themoviedb.org/t/p/original/${item.item.backdrop_path}` + ")"
            }}>

            <div className='MovieCard2-overlay' onClick={showDetail}>
                <div className='MovieCard2-title'>
                    <img className='MovieCard2-cardImg' src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.item.poster_path}`} alt="" />
                    <div className='MovieCard2-info'>
                        <h3>{item.item.title}</h3>
                        <p>{item.item.release_date}</p>
                    </div>
                </div>
                <div>
                    {item.item.genre_ids.map((id, idd) => (
                        <Badge className='MovieCard2-genres' key={idd} bg="danger">{genreList.find((item) => item.id == id).name}</Badge>
                    ))}
                </div>
                <div className='MovieCard2-overview'>
                    <p>{item.item.overview}</p>
                </div>
                <div>
                    <span className='MovieCard2-average'>{item.item.vote_average}</span>
                    <span className='MovieCard2-popularity'>{item.item.popularity}</span>
                    <p className='MovieCard2-eightteen'>{item.item.adult ? "18+" : "Under 18"}</p>
                </div>
            </div>
        </div>
    )
}

export default MovieCard2