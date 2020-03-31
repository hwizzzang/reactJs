import axios from 'axios';

// instance 설정
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
        api_key: '74bbea107aee977bd9deadbadcf7c3be',
        language: 'en-US',
    },
});

export const moviesApi = {
    nowPlaying: () => api.get('movie/now_playing'),
    upComing: () => api.get('movie/upcoming'),
    popular: () => api.get('movie/popular'),
    movieDetail: (id) =>
        api.get(`movie/${id}`, {
            params: {
                append_to_responsive: 'videos',
            },
        }),
    search: (term) =>
        api.get('search/movie', {
            query: encodeURIComponent(term),
        }),
};

export const tvApi = {
    toRated: () => api.get('tv/top_rated'),
    popular: () => api.get('tv/popular'),
    airingToday: () => api.get('tv/airing_today'),
    showDetail: (id) =>
        api.get(`tv/${id}`, {
            params: {
                append_to_responsive: 'videos',
            },
        }),
    search: (term) =>
        api.get('search/tv', {
            query: encodeURIComponent(term),
        }),
};
