import axios from "axios";

export const ALL_POKEMON = 'ALL_POKEMON'
export const SEARCH_BY_NAME = 'SEARCH_BY_NAME'
export const GET_TYPES = 'GET_TYPES'
export const NEXT_FILL = 'NEXT_FILL'
export const FIRST_FILL = 'FIRST_FILL'
export const SEARCH_BY_ID = 'SEARCH_BY_ID'
export const CLEAN_DETAIL = 'CLEAN_DETAIL'
export const SET_LOADING = 'SET_LOADING'
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
export const FILTER_BY_TYPE = 'FILTER_BY_TYPE'
export const DOUBLE_FILTER = 'DOUBLE_FILTER'
export const RESET_FILTER = 'RESET_FILTER'
export const ORDER_BY_NAME = 'ORDER_BY_NAME'
export const ORDER_BY_ORIGIN = 'ORDER_BY_ORIGIN'
export const CREATE_POKEMON = 'CREATE_POKEMON'


export const getTypes = () => {
  return async (dispatch) => {
    try {
      let response = await axios('http://localhost:3001/types');
      let data = response.data;
      return dispatch({
        type: GET_TYPES,
        payload: data,
      });
    } catch (error) {
      alert('Could not bring all types')
    }
  };
}

export const bringPokemons = () => {
  return async (dispatch) => {
    try {
      let response = await axios('http://localhost:3001/pokemons');
      let data = response.data;
      return dispatch({
        type: ALL_POKEMON,
        payload: data,
      });
    } catch (error) {
      alert('Could not bring all pokemons')
    }
  };
};

export const searchByName = (name) => {
  return async (dispatch) => {
    try {
      let response = await axios(`http://localhost:3001/pokemons?name=${name}`);
      let data = response.data;
      return dispatch({
        type: SEARCH_BY_NAME,
        payload: data,
      });
    } catch (error) {
      alert('Incorrect name')
    }
  };
};

export const searchById = (id) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))
      let response = await axios(`http://localhost:3001/pokemons/${id}`);
      let data = response.data;
      return dispatch({
        type: SEARCH_BY_ID,
        payload: data,
      });
    } catch (error) {
      alert('Incorrect id')
    } finally{
      dispatch(setLoading(false))
    }
  };
};
//------------------------------------FILTER-----------------------------------------------
export function filterByType(type) {
  return {
    type: FILTER_BY_TYPE,
    payload: type,
  };
}

export function doubleFilter(type){
  return{
    type: DOUBLE_FILTER,
    payload: type
  }
}

export function resetFilter(){
  return{
    type: RESET_FILTER,
  }
}
//-----------------------------------------------------------------------------------
export function cleanDetail(){
  return{
    type: CLEAN_DETAIL,
  }
}

export function setLoading(bool) {     
  return {         
    type: SET_LOADING,
    payload: bool     
  } 

}

export function setCurrentPage(pageNumber) {
  return{
    type: SET_CURRENT_PAGE,
    payload: pageNumber
  }
} 
//--------------------------------------------ORDER-----------------------------------

export function orderByName(order){
  return{
    type: ORDER_BY_NAME,
    payload: order
  }
}

export function orderByOrigin(origin){
  return{
    type: ORDER_BY_ORIGIN,
    payload: origin
  }
}
//-------------------------------------------------------------------------------------

export function createPokemon(pokemon){
  return async (dispatch) => {
    try {
      let response = await axios.post('http://localhost:3001/pokemons', pokemon);
      let data = response.data;
      return dispatch({
        type: CREATE_POKEMON,
        payload: data,
      });
    } catch (error) {
      alert('Incorrect id')
    }
  }
}