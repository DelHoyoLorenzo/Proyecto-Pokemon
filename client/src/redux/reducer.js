const initialState = {
  allTypes: [],

  allPokemons: [],
  copyAllPokemons: [],

  filtersChosen: {
    origin: "Select Origin",
    typeOne: "Select filter One",
    typeTwo: "Select filter two",
  },

  orderChosen: "Select Order",

  pokemonFoundById: {},

  loading: false,
  currentPage: 1,

  pokemonCreated: {},
  typesPokemonCreated: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ALL_POKEMON":
      return {
        ...state,
        allPokemons: action.payload,
        copyAllPokemons: action.payload,
      };
//-----------------------------------------FILTERS-------------------------------------------------------------------------------------------------------
    case "CHOOSE_FILTERS":
      let filtered = [...state.copyAllPokemons];
      if (action.payload.origin !== "all") {
        if (action.payload.origin === "api") {
          filtered = filtered.filter((pokemon) => {
            if (!isNaN(Number(pokemon.id))) return pokemon;
          });
        }
        if (action.payload.origin === "db") {
          filtered = filtered.filter((pokemon) => {
            if (isNaN(Number(pokemon.id))) return pokemon;
          });
        }
      }

      if (action.payload.typeOne !== "Select filter One") {
        filtered = filtered.filter((pokemon) => {
          if (
            pokemon.types.find((type) => type.name === action.payload.typeOne)
          )
            return pokemon;
        });
      }

      if (action.payload.typeTwo !== "Select filter two" && action.payload.typeTwo !== "") {
        filtered = filtered.filter((pokemon) => {
          if (
            pokemon.types.find((type) => type.name === action.payload.typeTwo)
          )
            return pokemon;
        });
      }

      return {
        ...state,
        filtersChosen: action.payload,
        allPokemons: filtered,
      };

    case "RESET_FILTER":
      return {
        ...state,
        filtersChosen: {
          origin: "Select Origin",
          typeOne: "Select filter One",
          typeTwo: "Select filter two",
          orderChosen: "Select Order",
        },
      };
//-----------------------------------------ORDER---------------------------------------------------------------
      case "CHOOSE_ORDER":
        if (action.payload === "ascending") {
          return {
            ...state,
            orderChosen: action.payload,
            allPokemons: [...state.allPokemons].sort((a, b) =>
              a.name.localeCompare(b.name)
            ),
          };
        } else if (action.payload === "descending") {
          return {
            ...state,
            orderChosen: action.payload,
            allPokemons: [...state.allPokemons].sort((a, b) =>
              b.name.localeCompare(a.name)
            ),
          };
        } else if (action.payload === "attackAscending") {
          return {
            ...state,
            orderChosen: action.payload,
            allPokemons: [...state.allPokemons].sort(
              (a, b) => a.attack - b.attack
            ),
          };
        } else if (action.payload === "attackDescending") {
          return {
            ...state,
            orderChosen: action.payload,
            allPokemons: [...state.allPokemons].sort(
              (a, b) => b.attack - a.attack
            ),
          };
        }
        return {
          ...state,
          orderChosen: action.payload,
          allPokemons: [...state.allPokemons],
        };
//-------------------------------------------------------------------------------------------------------------------------------------------------------------
        
    case "RE_FILL_POKEMONS":
      return {
        ...state,
        allPokemons: [...state.copyAllPokemons],
      };

    case "SEARCH_BY_NAME":
      return {
        ...state,
        allPokemons: [
          state.copyAllPokemons.find(
            (pokemon) => action.payload.name === pokemon.name
          ),
        ],
      };
    case "SEARCH_BY_ID":
      return {
        ...state,
        pokemonFoundById: action.payload,
      };
    case "CLEAN_DETAIL":
      return {
        ...state,
        pokemonFoundById: {},
      };
    case "CREATE_POKEMON":
      return {
        ...state,
        copyAllPokemons: [action.payload, ...state.copyAllPokemons],
        allPokemons: [action.payload, ...state.allPokemons],
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "SET_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.payload,
      };
    case "GET_TYPES":
      return {
        ...state,
        allTypes: action.payload,
      };
    case "SET_POKEMON":
      console.log('reducer', action.payload)
      return {
        ...state,
        pokemonCreated: action.payload,
      };

    case "SET_TYPE_POKEMON_CREATED":
      return {
        ...state,
        typesPokemonCreated: action.payload,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;