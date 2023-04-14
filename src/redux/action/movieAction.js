import api from "../api";



const API_KEY = process.env.REACT_APP_API_KEY

function getMovies(page) {
    return async (dispatch) => {
        try {
            dispatch({ type: "GET_MOVIES_REQUEST" });
            const popularMovieApi = api.get(`/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
            const topRatedApi = api.get(`/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
            const upComingApi = api.get(`/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`)
            const GenreApi = api.get(`/genre/movie/list?api_key=${API_KEY}&language=en-US`);

            let [popularMovies, topRatedMovies, upcomingMovies, genreList] =
                await Promise.all([popularMovieApi, topRatedApi, upComingApi, GenreApi]); //각각에 api 호출을 동시에 진행시키는데 딱 한번만 해주는 것이다.

            dispatch({
                type: "GET_MOVIES_SUCCESS",
                payload: {
                    popularMovies: popularMovies.data,
                    topRatedMovies: topRatedMovies.data,
                    upcomingMovies: upcomingMovies.data,
                    genreList: genreList.data.genres,
                },
            });
        } catch (error) {
            // 에러 핸들링 하는 곳
            dispatch({ type: "GET_MOVIES_FAILURE" })
        }
    };
}

function getMovieDetail(id) {
    return async (dispatch) => {
        try {
            dispatch({ type: "GET_MOVIES_REQUEST" });
            const movieDetailApi = api.get(`/movie/${id}?api_key=${API_KEY}&language=en-US`);
            const movieReviewsApi = api.get(`/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`)
            const movieRecommendationsApi = api.get(`/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`)
            const movieTrailerApi = api.get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`)

            let [movieDetail, movieReviews, movieRecommendations, movieTrailer] 
            = await Promise.all([movieDetailApi, movieReviewsApi, movieRecommendationsApi, movieTrailerApi]); //각각에 api 호출을 동시에 진행시키는데 딱 한번만 해주는 것이다.

            dispatch({
                type: "GET_MOVIEDETAIL_SUCCESS",
                payload: {
                    movieDetail: movieDetail.data,
                    movieReviews : movieReviews.data,
                    movieRecommendations : movieRecommendations.data,
                    movieTrailer : movieTrailer.data,
                },
            });
        } catch (error) {
            // 에러 핸들링 하는 곳
            dispatch({ type: "GET_MOVIES_FAILURE" });
        };
    }

}

function sortMovie(choiceResult, page) {
    return async (dispatch) => {
        try {
            dispatch({ type: "GET_MOVIES_REQUEST" });
            const sortApi = api.get(`/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${choiceResult}&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`);
            
            let [sort] =
                await Promise.all([sortApi]); //각각에 api 호출을 동시에 진행시키는데 딱 한번만 해주는 것이다.
                
            dispatch({
                type: "GET_SORT_SUCCESS",
                payload: {
                    sort : sort.data
                },
            });
        } catch (error) {
            // 에러 핸들링 하는 곳
            dispatch({ type: "GET_MOVIES_FAILURE" })
        }
    };
}

function searchMovie(keyword, page) {
    return async (dispatch) => {
        try {
            dispatch({ type: "GET_MOVIES_REQUEST" });
            console.log("page::::::", page);
            console.log("keyword::::::", keyword);
            const searchApi = api.get(`/search/movie?api_key=${API_KEY}&language=en-US&page=${page?page:1}&query=${keyword}`);
            // console.log("keyword:::::::::", keyword)
            let [search] =
                await Promise.all([searchApi]); //각각에 api 호출을 동시에 진행시키는데 딱 한번만 해주는 것이다.
                
            dispatch({
                type: "GET_SEARCH_SUCCESS",
                payload: {
                    search : search.data
                },
            });
        } catch (error) {
            // 에러 핸들링 하는 곳
            dispatch({ type: "GET_MOVIES_FAILURE" })
        }
    };
}
export const movieAction = {
    getMovies, getMovieDetail, sortMovie, searchMovie
}