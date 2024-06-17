import {useEffect, useState} from 'react';
import MovieCard from './MovieCard';
import './App.css';
import SearchIcon from './search.svg'
//1f9f0b6c
const API_URL= 'https://www.omdbapi.com?apikey=1f9f0b6c';


const App = ()=> {
    const [movies,setMovies]=useState([]);
    const [searchTerm , setsearchTerm] = useState('');

    const searchMovies= async(title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json();
        
        setMovies(data.Search);
    }
    useEffect(()=> {
        searchMovies('avengers');
    },[]);
    return(
        <div className='app'>
            <h1>MovieWorld</h1>
            <div className='search'>
            <input 
            placeholder='Search for movies' 
            value={searchTerm}
            onChange={(e)=>setsearchTerm(e.target.value)}
            onKeyDown={ (e) =>{ if(e.key==='Enter') {searchMovies(searchTerm)}}}
            />
            <img 
                src={SearchIcon}
                alt="search"
                onClick={()=>{searchMovies(searchTerm)}}
                
            />
            </div>
            
            {
                movies?.length>0 // if len is 0 then it will go fo false case
                ? (

                    <div className='container'>
                        {movies.map((movie)=> (
                            <MovieCard movie={movie} />
                        ))}
                    </div>
                ) :
                (
                    <div className='empty'>
                        <h2> No movies found</h2>
                    </div>
                )
            }

        </div>
    );
}

export default App;
