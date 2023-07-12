import {
  ALL_POKEMON,
  GET_TYPES,
  SEARCH_BY_NAME,
  SEARCH_BY_ID,
  FILTER_BY_TYPE,
  CLEAN_DETAIL,
  SET_LOADING,
  SET_CURRENT_PAGE,
  DOUBLE_FILTER,
  RESET_FILTER,
  ORDER_BY_NAME,
  ORDER_BY_ORIGIN,
  CREATE_POKEMON,
} from "./actions";

const initialState = {
  allPokemons: [],
  copyAllPokemons: [],
  pokemonFoundById: {},
  pokemonFoundByName: {},
  loading: false,
  currentPage: 1,
  filteredPokemons: [],
  allTypes: [],
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
        allPokemons: [
          state.copyAllPokemons.find(
            (pokemon) => action.payload.name === pokemon.name
          ),
        ],
        /* pokemonFoundByName:action.payload */
      };
    case SEARCH_BY_ID:
      return {
        ...state,
        pokemonFoundById: action.payload,
      };
    case CLEAN_DETAIL:
      return {
        ...state,
        pokemonFoundById: {},
      };
    //FILTERS------------------------------------------------------------------------------------------------------
    case FILTER_BY_TYPE:
      if (action.payload !== "alltypes" && action.payload !== "types") {
        return {
          ...state,
          allPokemons: state.copyAllPokemons.filter((pokemon) => {
            if (pokemon.types.find((type) => type.name === action.payload))
              return pokemon;
          }),
          filteredPokemons: state.copyAllPokemons.filter((pokemon) => {
            if (pokemon.types.find((type) => type.name === action.payload))
              return pokemon;
          }),
        };
      } else {
        return {
          ...state,
          allPokemons: state.copyAllPokemons,
        };
      }

    case DOUBLE_FILTER:
      return {
        ...state,
        allPokemons: state.filteredPokemons.filter((pokemon) => {
          if (pokemon.types.find((type) => type.name === action.payload))
            return pokemon;
        }),
      };

    case RESET_FILTER:
      return {
        ...state,
        filteredPokemons: [],
        allPokemons: state.copyAllPokemons,
      };
    //-------------------------------------------------------------------------------------------------------
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case GET_TYPES:
      return {
        ...state,
        allTypes: action.payload,
      };
    //-----------------------------------------ORDER---------------------------------------------------------------
    case ORDER_BY_NAME:
      if (action.payload === "ascending") {
        return {
          ...state,
          allPokemons: [...state.allPokemons].sort((a, b) =>
            a.name.localeCompare(b.name)
          ),
        };
      } else if (action.payload === "descending") {
        return {
          ...state,
          allPokemons: [...state.allPokemons].sort((a, b) =>
            b.name.localeCompare(a.name)
          ),
        };
      }else if(action.payload === "attackAscending"){
        return {
          ...state,
          allPokemons: [...state.allPokemons].sort((a, b) =>
            a.attack - b.attack
          ),
        };
      }else if(action.payload === "attackDescending"){
        return {
          ...state,
          allPokemons: [...state.allPokemons].sort((a, b) =>
            b.attack - a.attack
          ),
        };
      }
    
    case ORDER_BY_ORIGIN:
      if(action.payload === 'api'){
        return{
          ...state,
          allPokemons: state.copyAllPokemons.filter((pokemon) => {
            if (!isNaN(Number(pokemon.id))) return pokemon;
          }),
        }
    }
    return{
      ...state,
      allPokemons: state.copyAllPokemons.filter((pokemon) => {
        if (isNaN(Number(pokemon.id))) return pokemon;
      }),
    }
    //--------------------------------------------------------------------------------------------------------------

    case CREATE_POKEMON:
      return{
        ...state,
        allPokemons: [action.payload, ...state.allPokemons]
      }
    default:
      return { ...state };
  }
};

export default rootReducer;
