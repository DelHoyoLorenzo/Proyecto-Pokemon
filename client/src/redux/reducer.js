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

      if (action.payload.typeTwo !== "Select filter two") {
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
      return {
        ...state,
        pokemonCreated: action.payload,
      };

    case "SET_TYPE_POKEMON_CREATED":
      return {
        ...state,
        typesPokemonCreated: action.payload,
      };

    // if (action.payload.origin === "api") {
    //   console.log('entre al primer if')
    //   if(action.payload.typeOne !== 'Select filter One'){
    //     console.log('entre al segundo if')
    //     if(action.payload.typeTwo !== 'Select filter two'){
    //       console.log('entre al tercer if')
    //       return {
    //         ...state,
    //         filtersChosen: action.payload,
    //         allPokemons: (state.copyAllPokemons.filter((pokemon) => {if (!isNaN(Number(pokemon.id))) return pokemon;})).filter((pokemon) => {if (pokemon.types.find((type) => type.name === action.payload.typeOne))return pokemon}).filter((pokemon) => {if (pokemon.types.find((type) => type.name === action.payload.typeTwo))return pokemon}),
    //       };
    //     }
    //     return {
    //       ...state,
    //       filtersChosen: action.payload,
    //       allPokemons: (state.copyAllPokemons.filter((pokemon) => {if (!isNaN(Number(pokemon.id))) return pokemon})).filter((pokemon) => {if (pokemon.types.find((type) => type.name === action.payload.typeOne))return pokemon}),
    //     };
    //   }
    //   return {
    //     ...state,
    //     filtersChosen: action.payload,
    //     allPokemons: state.copyAllPokemons.filter((pokemon) => {if (!isNaN(Number(pokemon.id))) return pokemon}),
    //   };

    // } else if (action.payload.origin === "db") {
    //   if(action.payload.typeOne !== 'Select filter One'){
    //     if(action.payload.typeTwo !== 'Select filter two'){
    //       console.log('entre al tercer if')
    //       return {
    //         ...state,
    //         filtersChosen: action.payload,
    //         allPokemons: (state.copyAllPokemons.filter((pokemon) => {if (isNaN(Number(pokemon.id))) return pokemon;})).filter((pokemon) => {if (pokemon.types.find((type) => type.name === action.payload.typeOne))return pokemon}).filter((pokemon) => {if (pokemon.types.find((type) => type.name === action.payload.typeTwo))return pokemon}),
    //       };
    //     }
    //     return {
    //       ...state,
    //       filtersChosen: action.payload,
    //       allPokemons: state.copyAllPokemons.filter((pokemon) => {if (isNaN(Number(pokemon.id))) return pokemon;}).filter((pokemon) => {if (pokemon.types.find((type) => type.name === action.payload.typeOne))return pokemon}),
    //     }
    //   }
    //   return {
    //     ...state,
    //     filtersChosen: action.payload,
    //     allPokemons: state.copyAllPokemons.filter((pokemon) => {if (isNaN(Number(pokemon.id))) return pokemon;}),
    //   };
    // }

    //   if(action.payload.typeOne !== 'Select filter One'){
    //     console.log('entre al segundo if')
    //     if(action.payload.typeTwo !== 'Select filter two'){
    //       console.log('entre al tercer if')
    //       return {
    //         ...state,
    //         filtersChosen: action.payload,
    //         allPokemons: state.copyAllPokemons.filter((pokemon) => {if (pokemon.types.find((type) => type.name === action.payload.typeOne))return pokemon}).filter((pokemon) => {if (pokemon.types.find((type) => type.name === action.payload.typeTwo))return pokemon}),
    //       };
    //     }
    //     return {
    //       ...state,
    //       filtersChosen: action.payload,
    //       allPokemons: state.copyAllPokemons.filter((pokemon) => {if (pokemon.types.find((type) => type.name === action.payload.typeOne))return pokemon}),
    //     };
    //   }
    //   return {
    //     ...state,
    //     filtersChosen: action.payload,
    //     allPokemons: [...state.copyAllPokemons]
    //   };


    default:
      return { ...state };
  }
};

export default rootReducer;

// case "FILTER_BY_ORIGIN":
//   if (action.payload === "api") {
//     return {
//       ...state,
//       allPokemons: state.copyAllPokemons.filter((pokemon) => {
//         if (!isNaN(Number(pokemon.id))) return pokemon;
//       }),
//       apiPokemons: state.copyAllPokemons.filter((pokemon) => {
//         if (!isNaN(Number(pokemon.id))) return pokemon;
//       }),
//     };
//   } else if (action.payload === "db") {
//     return {
//       ...state,
//       allPokemons: state.copyAllPokemons.filter((pokemon) => {
//         if (isNaN(Number(pokemon.id))) return pokemon;
//       }),
//       pokemonsDb: state.copyAllPokemons.filter((pokemon) => {
//         if (isNaN(Number(pokemon.id))) return pokemon;
//       }),
//     };
//   }
//   return {
//     ...state,
//     allPokemons: state.copyAllPokemons,
//   };

//   case "FILTER_BY_TYPE":
//   if(state.allPokemons.length === state.apiPokemons.length){
//      console.log('estoy en seccion de api')
//      return {
//        ...state,
//        filteredPokemons: state.allPokemons.filter((pokemon) => {
//          if (pokemon.types.find((type) => type.name === action.payload))
//            return pokemon
//        }),
//        allPokemons: [...state.apiPokemons].filter((pokemon) => {
//          if (pokemon.types.find((type) => type.name === action.payload))
//            return pokemon
//        }),
//      };
//    }
//    if(state.allPokemons.length === state.pokemonsDb.length){
//      return {
//        ...state,
//        allPokemons: state.pokemonsDb.filter((pokemon) => {if (pokemon.types?.find((type) => type.name === action.payload))return pokemon}),
//        filteredPokemons: state.pokemonsDb.filter((pokemon) => {
//          if (pokemon.types.find((type) => type.name === action.payload)) return pokemon
//         }),
//      };
//    }
//    if(state.allPokemons.length === state.copyAllPokemons.length){
//      console.log('estoy en la seccion all')
//       return {
//         ...state,
//         allPokemons: state.copyAllPokemons.filter((pokemon) => {
//           if (pokemon.types.find((type) => type.name === action.payload))
//             return pokemon;
//         }),
//         filteredPokemons: state.copyAllPokemons.filter((pokemon) => {
//           if (pokemon.types.find((type) => type.name === action.payload))
//             return pokemon;
//         }),
//       };

//    }

// case "DOUBLE_FILTER":
//   return {
//     ...state,
//     allPokemons: state.allPokemons.filter((pokemon) => {
  //       if (pokemon.types.find((type) => type.name === action.payload))
  //         return pokemon;
  //     }),
  //   };
  // case "ORDER_BY_NAME":
  //   if (action.payload === "ascending") {
  //     return {
  //       ...state,
  //       allPokemons: [...state.allPokemons].sort((a, b) =>
  //         a.name.localeCompare(b.name)
  //       ),
  //     };
  //   } else if (action.payload === "descending") {
  //     return {
  //       ...state,
  //       allPokemons: [...state.allPokemons].sort((a, b) =>
  //         b.name.localeCompare(a.name)
  //       ),
  //     };
  //   } else if (action.payload === "attackAscending") {
  //     return {
  //       ...state,
  //       allPokemons: [...state.allPokemons].sort(
  //         (a, b) => a.attack - b.attack
  //       ),
  //     };
  //   } else if (action.payload === "attackDescending") {
  //     return {
  //       ...state,
  //       allPokemons: [...state.allPokemons].sort(
  //         (a, b) => b.attack - a.attack
  //       ),
  //     };
  //   }
  //--------------------------------------------------------------------------------------------------------------
