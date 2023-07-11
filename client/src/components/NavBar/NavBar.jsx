import style from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";

function NavBar() {
  return (
    <div className={style.navConteiner}>
      <SearchBar />
    </div>
  );
}

export default NavBar;
