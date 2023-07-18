import { searchByName, bringPokemons, filterByType, resetFilter } from "../../redux/actions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import style from "./SearchBar.module.css";
import { Link } from "react-router-dom";
import snorlax from '../../assets/snorlax.gif'
import {FaSearch} from 'react-icons/fa'

function SearchBar() {
  let dispatch = useDispatch();

  let [searchName, setSearchName] = useState("")

  let handleChange = function (event) {
    setSearchName(event.target.value);
  }

  let handleSearchBar = function (name) {
    dispatch(searchByName(name));
  }

  return (
    <div className={style.searchBarContainer}>
      <img className={style.gif} src={snorlax}/>
      <input
        className={style.input}
        value={searchName}
        onChange={handleChange}
        placeholder="Pokemon name?"
      />
      <div className={style.iconContainer}>
        {searchName && (
          <FaSearch className={style.icon} onClick={() => handleSearchBar(searchName.toLocaleLowerCase())}>
            Search
          </FaSearch>
        )}
      </div>
      <Link to='/create'>
        <button className={style.button}>Try your own Pokemon !</button>
      </Link>
    </div>
  );
}

export default SearchBar;
