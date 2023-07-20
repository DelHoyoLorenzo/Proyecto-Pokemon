import style from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setCurrentPage,chooseFilters,chooseOrder,bringPokemons } from "../../redux/actions";
import usePaginate from "../../Hooks/usePaginate";
import Pokemon from "../../components/Pokemon/Pokemon";
import NavBar from "../../components/NavBar/NavBar.jsx";
import Loading from "../../components/Loading/Loading";
import Paginated from "../../components/Paginated/Paginated";

function Home() {
  const dispatch = useDispatch()
  const {
    handlePrevious,
    handleNext,
    currentPage,
    displayedPokemons,
    totalPages
  } = usePaginate()

  const loading = useSelector((state)=> state.loading)
  const allTypes = useSelector((state) => state.allTypes)
  const filtersChosen = useSelector((state)=> state.filtersChosen)
  const orderChosen = useSelector((state)=> state.orderChosen)

  const [filtersChosenLocal, setFiltersChosenLocal]= useState({
    origin:'Select Origin',
    typeOne:'Select filter One',
    typeTwo:'Select filter two',
  })
  const [orderChosenLocal, setOrderChosenLocal] = useState('Select Order')

  useEffect(()=>{ //mantenerlos sincronizados con los estados globales
    setFiltersChosenLocal(filtersChosen)
    setOrderChosenLocal(orderChosen)
    if(filtersChosen==={
      origin:'Select Origin',
      typeOne:'Select filter One',
      typeTwo:'Select filter two',
      orderChosen:'Select Order',
    } /* && orderChosen === 'Select Order' */){bringPokemons()} 
  },[filtersChosen, orderChosen])

  useEffect(()=>{
    dispatch(chooseOrder(orderChosen))
  },[filtersChosen])

  let handleTypes = function (event) {
    setFiltersChosenLocal({
      ...filtersChosenLocal,
      typeOne: event.target.value,
    })
    
    dispatch(chooseFilters({
      ...filtersChosen,
      typeOne: event.target.value,
    }))
    dispatch(setCurrentPage(1))
  }
  let handleSecondTypes = function (event) {
    setFiltersChosenLocal({
      ...filtersChosenLocal,
      typeTwo: event.target.value,
    })
    
    dispatch(chooseFilters({
      ...filtersChosen,
      typeTwo: event.target.value,
    }))
    dispatch(setCurrentPage(1))
  }

  let handleOrder = function(event){
    setOrderChosenLocal(event.target.value)
    dispatch(chooseOrder(event.target.value))
  }

  let handleOrigin = function(event){
    setFiltersChosenLocal({
      ...filtersChosenLocal,
     origin: event.target.value,
    })
    dispatch(chooseFilters({
      ...filtersChosen,
     origin: event.target.value,
    }))
  }
  
  let reset = function () {
    dispatch(chooseOrder('Select Order'))
    dispatch(setCurrentPage(1))
  
    dispatch(chooseFilters({
      origin:'Select Origin',
      typeOne:'Select filter One',
      typeTwo:'Select filter two',
    }))
  }

  if(loading) return <Loading/>
  return (
    <div className={style.homeContainer}>
      <div>
        
      </div>
      <NavBar />

      <div className={style.filtersContainer}>
{/*----------------------------------------------------------------------------------------------------------------------------------------- */}      
      <div>
        <select value={filtersChosenLocal.origin === 'Select Origin' ? '' : filtersChosenLocal.origin} onChange={handleOrigin} className={style.selector}>
          <option disabled value="">Select origin</option>
          <option value="all">All</option>
          <option value="api">API</option>
          <option value="db">DataBase</option>
        </select>
      </div>
{/* ------------------------------------------------------------------------------------------------------------------- */}      
      <select value={filtersChosenLocal.typeOne === 'Select filter One' ? '' : filtersChosenLocal.typeOne} onChange={handleTypes} className={style.selector}>
        <option disabled value="">
          Select type
        </option>
        {allTypes.map((type) => {
          return <option key={type.id} value={type.name}>{type.name}</option>;
        })}
      </select>
{/* ------------------------------------------------------------------------------------------------------------------- */}
      {filtersChosenLocal.typeOne !=='Select filter One' ? (
        <select value={filtersChosenLocal.typeTwo === 'Select filter two' ? '' : filtersChosenLocal.typeTwo} onChange={handleSecondTypes} className={style.selector}>
          <option disabled value="">Select second type</option>
          {allTypes.map((type) => {
            return <option key={type.id} value={type.name}>{type.name}</option>;
          })}
        </select>
      ): null}
{/* ------------------------------------------------------------------------------------------------------------------- */}
      <div>
        <select value={orderChosenLocal === 'Select Order' ? '' : orderChosenLocal} onChange={handleOrder} className={style.selector}>
          <option disabled value="">Select order</option>
          <option value="ascending">A-Z</option>
          <option value="descending">Z-A</option>
          <option value="attackAscending">Attack - +</option>
          <option value="attackDescending">Attack + -</option>
        </select>
      </div>
      </div>
      <div className={style.buttonContainer}>
        <button onClick={reset} className={style.button}>Reset Filters</button>
      </div>

      <Paginated/>
      {/* <div className={style.paginatedContainer}>
        <button onClick={handlePrevious} className={style.boton}>Previous</button>
        <div>PokePage {currentPage} / {totalPages}</div>
        <button onClick={handleNext} className={style.boton}>Next</button>
      </div> */}

      {(!displayedPokemons.length) ? <h2 className={style.noPokemon}>No pokemons found! Try with Reset Filters</h2> : 
      <div className={style.pokemonsContainer}>
        {displayedPokemons.map((pokemon) => (
          <Pokemon key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>}
      <Paginated/>
    </div>
  );
}

export default Home;

// const filteredPokemons = useSelector((state) => state.filteredPokemons)
//   const loading = useSelector((state)=> state.loading)
//   const allTypes = useSelector((state) => state.allTypes)
  
//   const [selectorValue, setSelectorValue]= useState('')
//   const [secondSelectorValue, setSecondSelectorValue]= useState('')
//   const [orderSelectorValue, setOrderSelectorValue]= useState('')
//   const [originSelectorValue, setOriginSelectorValue]= useState('')

//   const []= useState(filters)
//   let handleTypes = function (event) {
//     setSelectorValue(event.target.value)// ESTA FUNCION ME TIENE QUE SETEAR LA SELECCION LOCAL Y DESPUES ME TIENE Q SETEAR EL ESTADO GLOBAL
//     dispatch(filterByType(event.target.value))
//     dispatch(setCurrentPage(1))
//   }
//   let handleSecondTypes = function (event) {
//     setSecondSelectorValue(event.target.value)
//     dispatch(doubleFilter(event.target.value))
//     dispatch(setCurrentPage(1))
//   }

//   let handleOrder = function(event){
//     setOrderSelectorValue(event.target.value)
//     dispatch(orderByName(event.target.value))
//   }
//   let handleOrigin = function(event){
//     setOriginSelectorValue(event.target.value)
//     dispatch(filterByOrigin(event.target.value))
//   }
  
//   let reset = function () {
//     dispatch(reFillPokemons())
//     dispatch(resetFilter())
//     dispatch(setCurrentPage(1))
//     setSelectorValue('')
//     setSecondSelectorValue('')
//     setOrderSelectorValue('')
//     setOriginSelectorValue('')
//   }

//   if(loading) return <Loading/>
//   return (
//     <div className={style.homeContainer}>
//       <NavBar />
//       <div className={style.paginatedContainer}>
//         <button onClick={handlePrevious} className={style.boton}>Previous</button>
//         <div>{currentPage}</div>
//         <button onClick={handleNext} className={style.boton}>Next</button>
//       </div>
// {/* ------------------------------------------------------------------------------------------------------------------- */}      
//       <div>
//         <select value={originSelectorValue} onChange={handleOrigin} className={style.selector}>
//           <option disabled value="">Select origin</option>
//           <option value="all">All</option>
//           <option value="api">API</option>
//           <option value="db">DataBase</option>
//         </select>
//       </div>
// {/* ------------------------------------------------------------------------------------------------------------------- */}      
//       <select value={selectorValue} onChange={handleTypes} className={style.selector}>
//         <option disabled value="">
//           Select type
//         </option>
//         {allTypes.map((type) => {
//           return <option key={type.id} value={type.name}>{type.name}</option>;
//         })}
//       </select>
// {/* ------------------------------------------------------------------------------------------------------------------- */}
//       {filteredPokemons.length? (
//         <select value={secondSelectorValue} onChange={handleSecondTypes} className={style.selector}>
//           <option disabled value="">Select second type</option>
//           {allTypes.map((type) => {
//             return <option key={type.id} value={type.name}>{type.name}</option>;
//           })}
//         </select>
//       ): null}
// {/* ------------------------------------------------------------------------------------------------------------------- */}
//       <div>
//         <select value={orderSelectorValue} onChange={handleOrder} className={style.selector}>
//           <option disabled value="">Select order</option>
//           <option value="ascending">A-Z</option>
//           <option value="descending">Z-A</option>
//           <option value="attackAscending">Attack +</option>
//           <option value="attackDescending">Attack -</option>
//         </select>
//       </div>
      
//       <button onClick={reset} className={style.boton}>Reset Filters</button>
//       {(!displayedPokemons.length) ? <h2>No pokemons found! Try with Reset Filters</h2> : 
//       <div className={style.pokemonsContainer}>
//         {displayedPokemons.map((pokemon) => (
//           <Pokemon key={pokemon.id} pokemon={pokemon} />
//         ))}
//       </div>}
      
//     </div>
//   );
// }

// export default Home;