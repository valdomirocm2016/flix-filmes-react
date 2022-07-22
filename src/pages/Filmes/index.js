import {useState,useEffect} from 'react';
import {useParams,useNavigate} from 'react-router-dom';
import api from '../../services/api';
import './filme-info.css';
import {toast} from 'react-toastify';

function Filmes(){

  const {id} = useParams();/*pega o parametro vindo da requisicao, no caso o param é o id*/ 
  const navigate = useNavigate();

  const [filme,setFilmes]= useState({});
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    async function loadfilme(){
       await api.get(`/movie/${id}`,{
        params:{
          api_key:'3185b39fb1a066e311f199c12467354d',
          language: 'pt-BR'
        }
       })
       .then((response)=>{
           //console.log(response.data);
           setFilmes(response.data);
           setLoading(false);
       })
       .catch(()=>{
          console.log("Filme não encontrado");
          navigate('/',{replace:true});
          return;
       })
    }
    loadfilme();
  },[navigate,id])


 function salvarFilme(){
   const minhaLista = localStorage.getItem('lista');
   let listaFilmes= JSON.parse(minhaLista) || [];

   const hasFilme = listaFilmes.some((item)=> item.id === filme.id );
   if(hasFilme){
    //alert("Filme já está salvo");
    toast.warning("Este filme já está emn sua lista.");
    return;
   }

   listaFilmes.push(filme);
   localStorage.setItem('lista', JSON.stringify(listaFilmes));
   toast.success("Filme salvo com sucesso!");



 }

  if(loading){
    return(
      <div className='filme-info'>
        <h1>Carregando detalhes....</h1>
      </div>
    )

  }

    return(
      <div className='filme-info'>
        <h1>{filme.title}</h1>
        <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
        <h3>Sinopse</h3>
        <span>{filme.overview}</span>

        <strong>Avaliação: {filme.vote_average} /10</strong>

        <div className='area-button'>

          <button onClick={salvarFilme}>Salvar</button>
          <button><a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a></button>

        </div>
      </div>
    );
}
export default Filmes;