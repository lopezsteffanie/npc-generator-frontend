import axios from 'axios';

const api = axios.create({
    baseURL: 'https://dnd-npc-generator-7234deb077cc.herokuapp.com/api',
});

export default api;