import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { setCurrentPage } from '../redux/actions'

export default function usePaginate(){
  const dispatch = useDispatch()
  const allPokemons = useSelector((state) => state.allPokemons)
  const currentPage = useSelector((state) => state.currentPage)
  
  const [displayedPokemons, setDisplayedPokemons] = useState([])
  
  const pokemonsPerPage = 12

  useEffect(() => {
    setDisplayedPokemons(allPokemons.slice((currentPage - 1) * pokemonsPerPage, (currentPage - 1) * pokemonsPerPage + pokemonsPerPage));
  }, [allPokemons, currentPage])
  
  const totalPokemons = allPokemons.length;
  const lastPage = Math.ceil(totalPokemons / pokemonsPerPage);
  const totalPages = Math.ceil(totalPokemons / pokemonsPerPage);
   //calculo la ultima pagina, si me da con coma redondeo para el entero de arriba, en este caso 70/12 = 5,8 entonces serian 6 paginas, la pagina 6 no completa los 12 pero tiene que estar
  const handleNext = () => {
    if (currentPage < lastPage) {
      dispatch(setCurrentPage(currentPage + 1))
    } //este if es para que aumente de pagina si tengo pokemones en la siguiente, como que me deja moverme entre las paginas que van a tener pokemones
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1))
    }
  }

  return{
    handlePrevious,
    handleNext,
    currentPage,
    displayedPokemons,
    totalPages
  }
}