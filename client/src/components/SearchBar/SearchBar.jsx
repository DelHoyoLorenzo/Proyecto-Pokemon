import { searchByName, bringPokemons, filterByType, resetFilter } from "../../redux/actions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import style from "./SearchBar.module.css";
import { Link } from "react-router-dom";
function SearchBar() {
  let dispatch = useDispatch();

  let [searchName, setSearchName] = useState("");

  let handleChange = function (event) {
    setSearchName(event.target.value);
  };

  let handleSearchBar = function (name) {
    dispatch(searchByName(name));
  };

  /* let resetPokemons = function () {
    dispatch(bringPokemons());//no deberia llamar devuelta al sv
    dispatch(resetFilter())
  }; */

  return (
    <div className={style.searchBarConteiner}>
      {/* <button onClick={resetPokemons}>Reset</button> */}
      <input
        value={searchName}
        onChange={handleChange}
        placeholder="Pokemon name?"
      />
      {searchName && (
        <button onClick={() => handleSearchBar(searchName.toLocaleLowerCase())}>
          Search
        </button>
      )}
      <Link to='/create'>
        <button>Create your Pokemon</button>
      </Link>
    </div>
  );
}

export default SearchBar;
