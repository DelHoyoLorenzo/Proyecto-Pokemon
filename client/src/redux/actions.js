import axios from "axios";
export const ADD_CHAR = "ADD_CHAR";
export const REMOVE_CHAR = "REMOVE_CHAR";
export const ADD_FAV = "ADD_FAV";
export const REMOVE_FAV = "REMOVE_FAV";
export const GET_CHARACTER_DETAIL = "GET_CHARACTER_DETAIL";
export const CLEAN_DETAIL = "CLEAN_DETAL";
export const FILTER = "FILTER";
export const ORDER = "ORDER";

export const ALL_POKEMON = 'ALL_POKEMON'


export const bringPokemons = () => {
  try {
    return async (dispatch) => {
      let response = await axios('http://localhost:3001/pokemons');
      let data = response.data;
      return dispatch({
        type: ALL_POKEMON,
        payload: data,
      });
    };
  } catch (error) {

  }
};











export const removeChar = (id) => {
  return {
    type: REMOVE_CHAR,
    payload: id,
  };
};

export const addFav = (character) => {
  try {
    const endpoint = "http://localhost:3001/rickandmorty/fav";
    return async (dispatch) => {
      let response = await axios.post(endpoint, character);
      let data = response.data;
      return dispatch({
        type: ADD_FAV,
        payload: data,
      });
    };
  } catch (error) {
    /* console.log('error en add fav', error.message) */
  }
};

export const removeFav = (id) => {
  try {
    const endpoint = `http://localhost:3001/rickandmorty/fav/${id}`;
    return async (dispatch) => {
      let response = await axios.delete(endpoint);
      let data = response.data;
      return dispatch({
        type: REMOVE_FAV,
        payload: data,
      });
    };
  } catch (error) {}
};

export function filterCards(gender) {
  return {
    type: "FILTER",
    payload: gender,
  };
}

export function orderCards(order) {
  return {
    type: "ORDER",
    payload: order,
  };
}
