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
  reFillPokemons
} from "../../redux/actions";
import usePaginate from "../../Hooks/usePaginate";
import Pokemon from "../../components/Pokemon/Pokemon";
import NavBar from "../../components/NavBar/NavBar.jsx";

function Home() {
  const dispatch = useDispatch()
  const {handlePrevious, handleNext, currentPage, displayedPokemons} = usePaginate()
  const filteredPokemons = useSelector((state) => state.filteredPokemons)
  const allTypes = useSelector((state) => state.allTypes)
  
  const [selectorValue, setSelectorValue]= useState('')
  const [secondSelectorValue, setSecondSelectorValue]= useState('')
  const [orderSelectorValue, setOrderSelectorValue]= useState('')
  const [originSelectorValue, setOriginSelectorValue]= useState('')

  let handleTypes = function (event) {
    setSelectorValue(event.target.value)
    dispatch(filterByType(event.target.value))
    dispatch(setCurrentPage(1))
  }
  let handleSecondTypes = function (event) {
    setSecondSelectorValue(event.target.value)
    dispatch(doubleFilter(event.target.value))
    dispatch(setCurrentPage(1))
  }

  let handleOrder = function(event){
    setOrderSelectorValue(event.target.value)
    dispatch(orderByName(event.target.value))
  }
  let handleOrigin = function(event){
    setOriginSelectorValue(event.target.value)
    dispatch(orderByOrigin(event.target.value))
  }
  
  let reset = function () {
    dispatch(reFillPokemons())
    dispatch(resetFilter())
    dispatch(setCurrentPage(1))
    setSelectorValue('')
    setSecondSelectorValue('')
    setOrderSelectorValue('')
    setOriginSelectorValue('')
  }

  return (
    <div className={style.homeContainer}>
      <NavBar />
      <div className={style.paginatedContainer}>
        <button onClick={handlePrevious}>Previous</button>
        <div>{currentPage}</div>
        <button onClick={handleNext}>Next</button>
      </div>
      <div></div>
      <select value={selectorValue} onChange={handleTypes} /* className={style.} */>
        <option disabled value="">
          Select type
        </option>
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
      <div className={style.pokemonsContainer}>
        {displayedPokemons?.map((pokemon) => (
          <Pokemon key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

export default Home;
