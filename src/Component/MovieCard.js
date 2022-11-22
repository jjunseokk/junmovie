import React from 'react'
import { Badge } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const MovieCard = ({ item }) => {

    const navigation = useNavigate();

    const showDetail = () =>{
        navigation(`/Movie/${item.id}`);
    }

    const {genreList} = useSelector((state)=>state.movie);

    return (
        <div className='card'
            style={{
                backgroundImage:
                    "url(" + `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path}` + ")"
            }}>
            
            <div className='overlay' onClick={showDetail}>
                <h3>{item.title}</h3>
                <div className='overlay-genre'>
                    {item.genre_ids.map((id,idd) => (
                        <Badge key={idd} bg="danger">{genreList.find((item)=>item.id==id).name}</Badge>
                    ))}
                </div>
                <div className='overlay-info'>
                    <span className='overlay-average'>{item.vote_average}</span>
                    <span>{item.adult ? "청불" : "Under 18"}</span>
                </div>
            </div>
        </div>
    )
}

export default MovieCard