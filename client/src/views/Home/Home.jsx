import style from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { filterByType, doubleFilter, setCurrentPage } from "../../redux/actions";
import Pokemon from "../../components/Pokemon/Pokemon";
import NavBar from "../../components/NavBar/NavBar.jsx";

function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.allPokemons);
  const currentPage = useSelector((state) => state.currentPage);
  const filteredPokemons = useSelector((state)=> state.filteredPokemons);

  const pokemonsPerPage = 12;
  
  const handleNext = () => {
    const totalPokemons = allPokemons.length;
    const lastPage = Math.ceil(totalPokemons / pokemonsPerPage); //calculo la ultima pagina, si me da con coma redondeo para el entero de arriba, en este caso 70/12 = 5,8 entonces serian 6 paginas, la pagina 6 no completa los 12 pero tiene que estar
    if (currentPage < lastPage) {
      /* setCurrentPage((prevPage) => prevPage + 1); */
      dispatch(setCurrentPage(currentPage + 1))
    } //este if es para que aumente de pagina si tengo pokemones en la siguiente, como que me deja moverme entre las paginas que van a tener pokemones
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1))
    }
  };
  
  let handleTypes = function(event){
    dispatch(filterByType(event.target.value))
    dispatch(setCurrentPage(1))
  }
  let handleSecondTypes = function(event){
    dispatch(doubleFilter(event.target.value))
    dispatch(setCurrentPage(1))
  }
  const firstPokemonIndex = (currentPage - 1) * pokemonsPerPage;
  const displayedPokemons = allPokemons.slice(firstPokemonIndex, firstPokemonIndex + pokemonsPerPage);


  return (
    <div>
      <NavBar />
      <div className={style.paginatedConteiner}>
        <button onClick={handlePrevious}>Previous</button>
        <div>{currentPage}</div>
        <button onClick={handleNext}>Next</button>
      </div>
      <select name='types' onChange={handleTypes} /* className={style.} */>
          <option disabled value="">Select an option</option>
          <option value="resetFilter">All types</option>
          <option value="normal">normal</option>
          <option value="fighting">fighting</option>
          <option value="flying">flying</option>
          <option value="poison">poison</option>
          <option value="ground">ground</option>
          <option value="rock">rock</option>
          <option value="bug">bug</option>
          <option value="ghost">ghost</option>
          <option value="steel">steel</option>
          <option value="fire">fire</option>
          <option value="water">water</option>
          <option value="grass">grass</option>
          <option value="electric">electric</option>
          <option value="psychic">psychic</option>
          <option value="ice">ice</option>
          <option value="dragon">dragon</option>
          <option value="dark">dark</option>
          <option value="fairy">fairy</option>
          <option value="unknown">unknown</option>
          <option value="shadow">shadow</option>
        </select>
        { filteredPokemons.length && <select name='types' onChange={handleSecondTypes} /* className={style.} */>
          <option disabled value="">Select an option</option>
          <option value="resetFilter">All types</option>
          <option value="normal">normal</option>
          <option value="fighting">fighting</option>
          <option value="flying">flying</option>
          <option value="poison">poison</option>
          <option value="ground">ground</option>
          <option value="rock">rock</option>
          <option value="bug">bug</option>
          <option value="ghost">ghost</option>
          <option value="steel">steel</option>
          <option value="fire">fire</option>
          <option value="water">water</option>
          <option value="grass">grass</option>
          <option value="electric">electric</option>
          <option value="psychic">psychic</option>
          <option value="ice">ice</option>
          <option value="dragon">dragon</option>
          <option value="dark">dark</option>
          <option value="fairy">fairy</option>
          <option value="unknown">unknown</option>
          <option value="shadow">shadow</option>
        </select>}
        
      <div className={style.pokemonsConteiner}>
        {displayedPokemons.map((pokemon) => (
          <Pokemon key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

export default Home;
