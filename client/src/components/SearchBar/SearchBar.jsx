import { searchByName, bringPokemons, filterByType } from "../../redux/actions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import style from "./SearchBar.module.css";

function SearchBar() {
  let dispatch = useDispatch();

  let [searchName, setSearchName] = useState("");

  let handleChange = function (event) {
    setSearchName(event.target.value);
  };

  let handleSearchBar = function (name) {
    dispatch(searchByName(name));
  };

  let resetPokemons = function () {
    dispatch(bringPokemons());//no deberia llamar devuelta al sv
    dispatch(filterByType('Types'))
  };

  return (
    <div className={style.searchBarConteiner}>
      <button onClick={resetPokemons}>Reset</button>
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
    </div>
  );
}

export default SearchBar;
