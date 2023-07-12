import style from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  filterByType,
  doubleFilter,
  setCurrentPage,
  orderByName,
  orderByOrigin,
  resetFilter,
  bringPokemons
} from "../../redux/actions";
import Pokemon from "../../components/Pokemon/Pokemon";
import NavBar from "../../components/NavBar/NavBar.jsx";

function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.allPokemons);
  const currentPage = useSelector((state) => state.currentPage);
  const filteredPokemons = useSelector((state) => state.filteredPokemons);
  const allTypes = useSelector((state) => state.allTypes);
  
  const pokemonsPerPage = 12;

  console.log(allPokemons)
  const [selectorValue, setSelectorValue]= useState('')
  const [secondSelectorValue, setSecondSelectorValue]= useState('')
  const [orderSelectorValue, setOrderSelectorValue]= useState('')
  const [originSelectorValue, setOriginSelectorValue]= useState('')

  const [displayedPokemons, setDisplayedPokemons] = useState([]);

  useEffect(() => {
    setDisplayedPokemons(allPokemons.slice((currentPage - 1) * pokemonsPerPage, (currentPage - 1) * pokemonsPerPage + pokemonsPerPage));
  }, [allPokemons, currentPage]);
  
  const handleNext = () => {
    const totalPokemons = allPokemons.length;
    const lastPage = Math.ceil(totalPokemons / pokemonsPerPage); //calculo la ultima pagina, si me da con coma redondeo para el entero de arriba, en este caso 70/12 = 5,8 entonces serian 6 paginas, la pagina 6 no completa los 12 pero tiene que estar
    if (currentPage < lastPage) {
      dispatch(setCurrentPage(currentPage + 1));
    } //este if es para que aumente de pagina si tengo pokemones en la siguiente, como que me deja moverme entre las paginas que van a tener pokemones
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  let handleTypes = function (event) {
    /* setSelectorValue(event.target.value) */
    dispatch(filterByType(event.target.value));
    dispatch(setCurrentPage(1));
  };
  let handleSecondTypes = function (event) {
    /* setSelectorValue(event.target.value) */
    dispatch(doubleFilter(event.target.value));
    dispatch(setCurrentPage(1));
  };

  let handleOrder = function(event){
    dispatch(orderByName(event.target.value))
  }

  let handleOrigin = function(event){
    dispatch(orderByOrigin(event.target.value))
  }
  /* const firstPokemonIndex = (currentPage - 1) * pokemonsPerPage;
  const displayedPokemons = allPokemons.slice(
    firstPokemonIndex,
    firstPokemonIndex + pokemonsPerPage
  ); */
  
  let reset = function () {
    dispatch(bringPokemons());//no deberia llamar devuelta al sv
    dispatch(resetFilter())
  };

  return (
    <div className={style.homeConteiner}>
      <NavBar />
      <div className={style.paginatedConteiner}>
        <button onClick={handlePrevious}>Previous</button>
        <div>{currentPage}</div>
        <button onClick={handleNext}>Next</button>
      </div>
      <div></div>
      <select value={selectorValue} onChange={handleTypes} /* className={style.} */>
        <option disabled value="">
          Select type
        </option>
        <option value="alltypes">All types</option>
        {allTypes.map((type) => {
          return <option key={type.id} value={type.name}>{type.name}</option>;
        })}
      </select>

      {filteredPokemons.length ? (
        <select value={secondSelectorValue} onChange={handleSecondTypes} /* className={style.} */>
          <option disabled value="">Select second type</option>
          {allTypes.map((type) => {
            return <option key={type.id} value={type.name}>{type.name}</option>;
          })}
        </select>
      ): null}
      <div>
      <select value={orderSelectorValue} onChange={handleOrder}>
        <option disabled value="">Select order</option>
        <option value="ascending">A-Z</option>
        <option value="descending">Z-A</option>
        <option value="attackAscending">Attack +</option>
        <option value="attackDescending">Attack -</option>
      </select>
      <select value={originSelectorValue} onChange={handleOrigin}>
        <option disabled value="">Select origin</option>
        <option value="api">API</option>
        <option value="db">DataBase</option>
      </select>
      </div>
      
      
      <button onClick={reset}>Reset Filters</button>
      <div className={style.pokemonsConteiner}>
        {displayedPokemons?.map((pokemon) => (
          <Pokemon key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

export default Home;
