import axios from "axios";

export const ALL_POKEMON = 'ALL_POKEMON'
export const SEARCH_BY_NAME = 'SEARCH_BY_NAME'
export const NEXT_FILL = 'NEXT_FILL'
export const FIRST_FILL = 'FIRST_FILL'
export const SEARCH_BY_ID = 'SEARCH_BY_ID'
export const FILTER_BY_TYPE = 'FILTER_BY_TYPE'
export const CLEAN_DETAIL = 'CLEAN_DETAIL'
export const SET_LOADING = 'SET_LOADING'
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
export const DOUBLE_FILTER = 'DOUBLE_FILTER'

/* export const firstFill = (step) => {
  return{
    type: FIRST_FILL,
    payload: step,
  }
}

export const nextFill = (beginning, step) => {
  return{
    type: NEXT_FILL,
    payload: {
      begining: beginning,
      step: step
    },
  }
} */

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


// export const removeChar = (id) => {
//   return {
//     type: REMOVE_CHAR,
//     payload: id,
//   };
// };

// export const addFav = (character) => {
//   try {
//     const endpoint = "http://localhost:3001/rickandmorty/fav";
//     return async (dispatch) => {
//       let response = await axios.post(endpoint, character);
//       let data = response.data;
//       return dispatch({
//         type: ADD_FAV,
//         payload: data,
//       });
//     };
//   } catch (error) {
    
//   }
// };

// export const removeFav = (id) => {
//   try {
//     const endpoint = `http://localhost:3001/rickandmorty/fav/${id}`;
//     return async (dispatch) => {
//       let response = await axios.delete(endpoint);
//       let data = response.data;
//       return dispatch({
//         type: REMOVE_FAV,
//         payload: data,
//       });
//     };
//   } catch (error) {}
// };

// export function filterCards(gender) {
//   return {
//     type: "FILTER",
//     payload: gender,
//   };
// }

// export function orderCards(order) {
//   return {
//     type: "ORDER",
//     payload: order,
//   };
//}
