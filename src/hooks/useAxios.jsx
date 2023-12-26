import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://dummyjson.com',
});

const useAxios = () => {
    return instance;
};

export default useAxios;