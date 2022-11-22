import React, { useState } from 'react'
import { useEffect } from 'react'
import { Container, Badge, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { movieAction } from '../redux/action/movieAction';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import YouTube from 'react-youtube';




function MyVerticallyCenteredModal(props) {
  const { movieTrailer } = useSelector((state) => state.movie);

  
    const videoId = movieTrailer.results !== undefined ? movieTrailer.results[0].key : ""
    console.log(videoId);
  return (
    <Modal className='modal'
      {...props}
      size="xl"
      fullscreen ="lg-down"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className='modal_bg'>
      </Modal.Header>
      <Modal.Body className='modal_bg'>
          <YouTube className='youtube'
            //videoId : https://www.youtube.com/watch?v={videoId} 유튜브 링크의 끝부분에 있는 고유한 아이디
            videoId={videoId}
            //opts(옵션들): 플레이어의 크기나 다양한 플레이어 매개 변수를 사용할 수 있음.
            //밑에서 더 설명하겠습니다.
            opts={{
              width: "100%",
              height: "600",
              playerVars: {
                autoplay: 1, //자동재생 O
                rel: 0, //관련 동영상 표시하지 않음 (근데 별로 쓸모 없는듯..)
                modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
              },
            }}
            //이벤트 리스너 
            onEnd={(e) => { e.target.stopVideo(0); }}
          />
      </Modal.Body>
      <Modal.Footer className='modal_bg'>
        <Button className='btn_bg' onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}



const MovieDetail = () => {

  const navigation = useNavigate();
  let { id } = useParams();

  const dispatch = useDispatch();
  const { movieDetail, movieReviews, movieRecommendations, genreList } = useSelector((state) => state.movie);

  const getMovieDetail = () => {
    dispatch(movieAction.getMovieDetail(id));
  }
  const showHome = () => {
    navigation('/');
  }

  useEffect(() => {
    getMovieDetail();
  }, [])

  const [changeReviews, setChangeReviews] = useState(false);
  const [changeRecommend, setChangeRecommend] = useState(false);

  const showReviews = () => {
    setChangeReviews(true);
    setChangeRecommend(false);
  }

  const showRecommend = () => {
    setChangeRecommend(true);
    setChangeReviews(false);
  }

  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div>
      <div className='detail_background' style={{
        backgroundImage: "url(https://help.nflxext.com/396a2a39-8d34-4260-b07a-6391fe04ded5_what_is_netflix_2_en.png)"
      }}>
        <h1 style={{ padding: "20px 0px" }}>Movie Detail</h1>
        <div className='movieDetail_title'>
          <div className='detail_box1'>
            <p className='home_btn_style' onClick={showHome}>Home</p>
          </div>
          <div className='detail_box2'>
            <p>{movieDetail.title}</p>
          </div>
        </div>
      </div>
      <Container className='MovieDetail_container'>
        <div className='MovieDetail_wrap'>
          <div className='detail_image'>
            <img src={`https://www.themoviedb.org/t/p/original/${movieDetail.poster_path}`} alt="" />
          </div>
          <div className='detail_info'>
            <div className='detail_firstBox'>
              <ul>
                {movieDetail.genres && movieDetail.genres.map((item) => (
                  <Badge bg="danger" className='detail_genres'><li>{item && item.name}</li></Badge>
                ))}
              </ul>
              <h1 style={{ fontSize: "4em" }}>{movieDetail.title}</h1>
              <p style={{ fontSize: "1.5em" }}>{movieDetail.tagline}</p>
              <ul className='movie_detail_genres'>
                <li>{movieDetail.vote_average}</li>
                <li>{movieDetail.popularity}</li>
                <li className='eighteen'>{movieDetail.adult ? "18+" : "Under 18"}</li>
              </ul>
            </div>
            <div className='detail_secondBox'>
              <p>{movieDetail.overview}</p>
            </div>
            <div className='detail_thirdBox'>
              <ul>
                <li><Badge bg="danger" className='detail_info_list'><span>예산</span></Badge> $ {movieDetail.budget}</li>
                <li><Badge bg="danger" className='detail_info_list'><span>수익</span></Badge> $ {movieDetail.revenue}</li>
                <li><Badge bg="danger" className='detail_info_list'><span>개봉일</span></Badge> {movieDetail.release_date}</li>
                <li><Badge bg="danger" className='detail_info_list'><span>상영시간</span></Badge> {movieDetail.runtime} 시간</li>
              </ul>
            </div>

            <>
              <Button variant="danger" onClick={() => setModalShow(true)}>
                <FontAwesomeIcon icon={faFilm} /> Watch Trailer
              </Button>

              <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </>
          </div>
        </div>
        <div className='btn_box'>
          <button className={changeReviews ? 'btn_style' : 'btn_style active'} onClick={showReviews}>REVIEWS ({movieReviews.total_results})</button>
          <button className={changeRecommend ? 'btn_style' : 'btn_style active'} onClick={showRecommend}>RECOMMENDATION({movieRecommendations.total_results-20})</button>
        </div>

        <div className={changeReviews ? 'reviews_area' : 'reviews_area active'}>
          {movieReviews.results && movieReviews.results.map((item) => (
            <div className='reviews_box'>
              <h3>{item && item.author}</h3>
              <p>{item && item.content}</p>
            </div>
          ))}
        </div>

        <div className={changeRecommend ? 'recommend-area' : 'recommend-area active'}>
          {movieRecommendations.results && movieRecommendations.results.map((item) => (
            <div className='recommend-box' style={{ backgroundImage: "url(" + `https://www.themoviedb.org/t/p/original/${item.backdrop_path}` + ")" }}>
              <div className='recommend_info'>
                <h1>{item.title}</h1>
                <ul>
                  <li>{item.genre_ids && item.genre_ids.map((id) => (
                    <Badge bg="danger" className='recommend-genre'>
                      {genreList.length !== 0 ? genreList.find((item) => item.id == id).name : ''}
                    </Badge>
                  ))}</li>
                </ul>
                <p className='under_line'></p>
                <ul className='recommend_sub_info'>
                  <li>{item.vote_average}</li>
                  <li>{item.popularity}</li>
                  <li className='eighteen'>{item.adult ? "18+" : "Under 18"}</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default MovieDetail