import {useEffect,useState} from 'react';
import api from '../../services/api';
import {Link} from 'react-router-dom';
import './home.css';

function Home(){
const [filmes,setFilmes]=useState([]);
const [loading, setLoading]= useState(true);

useEffect(()=>{
    async function loadfilmes(){
        const response= await api.get("movie/now_playing",{
            params:{
                api_key:'3185b39fb1a066e311f199c12467354d',
                language: 'pt-BR',
                page: 1
            }
        })
        //console.log(response.data.results.slice(0,10));
        setFilmes(response.data.results.slice(0,10));
        setLoading(false);
    }

    loadfilmes();

},[])

if(loading){
    return(
        <div className='loading'>
            <h2>Carregando...</h2>
        </div>
    )
}
    return(
      <div className='container'>
        <div className='lista-filmes'>
            {filmes.map((item)=>{
               return(
                <article key={item.id}>
                    <strong>{item.title}</strong>
                    <img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt={item.title} />
                    <Link to={`/filmes/${item.id}`}> Acessar </Link>
                </article>
               )
            })}
        </div>
      </div>
    );
}
export default Home;