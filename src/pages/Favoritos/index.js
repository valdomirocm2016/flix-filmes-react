import './favoritos.css';
import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';

function Favoritos(){

    const [filmes, setFilmes] = useState([]);

    useEffect(()=>{
        const favoritos= localStorage.getItem('lista');
        setFilmes(JSON.parse(favoritos) || []);


    },[])

function excluir(id){
   let filtroLista = filmes.filter((item)=>{
      return (item.id !== id );
   })

   setFilmes(filtroLista);
   localStorage.setItem('lista',JSON.stringify(filtroLista));
   toast.success("Filme removido com sucesso!");

}

    return(
        <div className='meus-filmes'>
           <h1>Meus Filmes</h1>
           {filmes.length ===0 && <spam>Você não possui nenhum filme cadastrado!</spam>}
           <ul>
            {
                filmes.map((item)=>{
                   return(
                    <li key={item.id}>
                       <span>{item.title}</span>
                       <div>
                           <Link to={`/filmes/${item.id}`}>Ver Detalhes</Link>
                           <button onClick={()=> excluir(item.id)}>Excluir</button>
                       </div>
                    </li>
                   )
                })
            }
           </ul>

        </div>
    )
}
export default Favoritos;