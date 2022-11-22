import { faL } from "@fortawesome/free-solid-svg-icons";

let initialState = {
    popularMovies: {},
    topRatedMovies: {},
    upcomingMovies: {},
    loading: true,
    genreList: [],
    movieDetail: {},
    movieReviews: {},
    movieRecommendations : {},
    movieTrailer : {},
    search : {},
    sort :{},
};

function movieReducer(state = initialState, action) {
    let { type, payload } = action

    switch (type) {
        case "GET_MOVIES_REQUEST":
            return { ...state, loading: true }
        case "GET_MOVIES_SUCCESS":
            return {
                ...state,
                popularMovies: payload.popularMovies,
                topRatedMovies: payload.topRatedMovies,
                upcomingMovies: payload.upcomingMovies,
                genreList: payload.genreList,
                loading: false,
            };
        case "GET_MOVIEDETAIL_SUCCESS":
            return {
                ...state, movieDetail: payload.movieDetail,
                movieReviews : payload.movieReviews,
                movieRecommendations : payload.movieRecommendations,
                movieTrailer : payload.movieTrailer,
                loading: false,
            };
        case "GET_SORT_SUCCESS" :
            return{
                ...state,
                sort : payload.sort,
                loading : false,
            }
        case "GET_SEARCH_SUCCESS":
            return{
                ...state,
                search : payload.search,
                loading : false,
            }
        case "GET_MOVIES_FAILURE":
            return { ...state, loading: false }
        default:
            return { ...state };
    };

}

export default movieReducer;