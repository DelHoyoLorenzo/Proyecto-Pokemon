import axios from "axios";

import {ALL_POKEMON, RE_FILL_POKEMONS, SEARCH_BY_NAME, GET_TYPES, SEARCH_BY_ID, CLEAN_DETAIL, SET_LOADING, SET_CURRENT_PAGE, FILTER_BY_TYPE, DOUBLE_FILTER, RESET_FILTER, ORDER_BY_NAME, FILTER_BY_ORIGIN, CREATE_POKEMON, SET_POKEMON, SET_TYPE_POKEMON_CREATED, CHOOSE_FILTERS, CHOOSE_ORDER } from './types'

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
      dispatch(setLoading(true))
      let response = await axios('http://localhost:3001/pokemons');
      let data = response.data;
      return dispatch({
        type: ALL_POKEMON,
        payload: data,
      });
    } catch (error) {
      alert('Could not bring all pokemons')
    } finally{
      dispatch(setLoading(false))
    }
  };
};

export const reFillPokemons = () => {
  return{
    type: RE_FILL_POKEMONS
  }
}
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

export function filterByOrigin(origin){
  return{
    type: FILTER_BY_ORIGIN,
    payload: origin
  }
}
//-------------------------------------------------------------------------------------

export function createPokemon(pokemon) {
  return async (dispatch) => {
    try {
      let response = await axios.post('http://localhost:3001/pokemons', pokemon);
      let data = response.data;
      await dispatch({
        type: CREATE_POKEMON,
        payload: data
      });
      
      await dispatch(chooseFilters({
        origin:'Select Origin',
        typeOne:'Select filter One',
        typeTwo:'Select filter two',
      }))
      await dispatch(chooseOrder('Select Order'))
      /* await dispatch(reFillPokemons())
      await dispatch(resetFilter()) */
     return dispatch(setCurrentPage(1))
    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data);
    }
  };
}


export function setPokemonGlobal(change){
  return{
    type: SET_POKEMON,
    payload: change
  }
}

export function setTypesGlobal(change){
  return{
    type: SET_TYPE_POKEMON_CREATED,
    payload: change
  }
}

export function chooseFilters(selection){
  return{
    type: CHOOSE_FILTERS,
    payload: selection
  }
}

export function chooseOrder(selection){
  return{
    type: CHOOSE_ORDER,
    payload: selection
  }
}