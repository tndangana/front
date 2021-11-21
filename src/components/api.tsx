import axios from 'axios';
//Defines apis to be accessed by client application
export default axios.create({
    baseURL: `http://localhost:2508/api`
});