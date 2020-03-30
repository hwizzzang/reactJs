import axios from 'axios';

// instance 설정
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
        api_key: '74bbea107aee977bd9deadbadcf7c3be',
        language: 'en-US',
    },
});

export default api;
