import { searchByName, setCurrentPage } from "../../redux/actions";
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
    dispatch(setCurrentPage(1))
  }

  return (
    <div className={style.searchBarContainer}>
      <img className={style.gif} src={snorlax}/>
      <div className="flex flex-col md:flex md:flex-row md:justify-center md:items-center">
        <input
          type="search"
          className={style.input}
          value={searchName}
          onChange={handleChange}
          placeholder="Pokename..."
        />
        <div className={`${style.iconContainer} sm:items-center sm:justify-center`}>
          {searchName && (
            <FaSearch className={style.icon} onClick={() => handleSearchBar(searchName.toLocaleLowerCase())}>
              Search
            </FaSearch>
          )}
        </div>
      </div>
      <Link to='/create'>
        <button className={style.button}>Try your own Pokemon !</button>
      </Link>
    </div>
  );
}

export default SearchBar;
