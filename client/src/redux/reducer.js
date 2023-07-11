import {
  ALL_POKEMON,
  SEARCH_BY_NAME,
  SEARCH_BY_ID,
  FILTER_BY_TYPE,
  CLEAN_DETAIL,
  SET_LOADING,
  SET_CURRENT_PAGE,
  DOUBLE_FILTER,
} from "./actions";

const initialState = {
  allPokemons: [],
  copyAllPokemons: [],
  pokemonFoundById: {},
  pokemonFoundByName:{},
  loading: false,
  currentPage: 1,
  filteredPokemons:[],
  //por tipo de pokemon
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_POKEMON:
      return {
        ...state,
        allPokemons: action.payload,
        copyAllPokemons: action.payload,
      };

    case SEARCH_BY_NAME:
      return {
        ...state,
        allPokemons: [state.copyAllPokemons.find((pokemon) => action.payload.name === pokemon.name)],
        /* pokemonFoundByName:action.payload */
      };
    case SEARCH_BY_ID:
      return {
        ...state,
        pokemonFoundById: action.payload,
      };
    case CLEAN_DETAIL:
      return{
        ...state,
        pokemonFoundById:{}
      }
    
    case FILTER_BY_TYPE:
      if(action.payload !== 'resetFilter' && action.payload !== 'types'){
        return{
          ...state,
          allPokemons: state.copyAllPokemons.filter((pokemon)=>{ if(pokemon.types.find((type)=> type.name === action.payload)) return pokemon}),
          filteredPokemons: state.copyAllPokemons.filter((pokemon)=>{ if(pokemon.types.find((type)=> type.name === action.payload)) return pokemon}),
        }
      }else{
        return{
          ...state,
          allPokemons: state.copyAllPokemons
        }
      }
    
    case DOUBLE_FILTER:
      return{
        ...state,
        allPokemons: state.filteredPokemons.filter((pokemon)=>{ if(pokemon.types.find((type)=> type.name === action.payload)) return pokemon}),
      }
      
    case SET_LOADING:
      return{
        ...state,
        loading: action.payload
      }
      
    case SET_CURRENT_PAGE:
      return{
        ...state,
        currentPage: action.payload
      }
    default:
      return { ...state };
  }
};

export default rootReducer;
