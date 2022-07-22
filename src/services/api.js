import axios from 'axios'

///Base url= https://api.themoviedb.org/3/
///URL da Api movie/550?api_key=3185b39fb1a066e311f199c12467354d

const api= axios.create({
 baseURL: 'https://api.themoviedb.org/3/'
});


export default api;