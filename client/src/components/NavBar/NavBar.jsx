import style from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";
import snorlax from '../../assets/snorlax.gif'

function NavBar() {
  return (
    <div className={style.navConteiner}>
      {/* <div>
        <img className={style.gif} src={snorlax}/>
      </div> */}
      <SearchBar />
    </div>
  );
}

export default NavBar;
