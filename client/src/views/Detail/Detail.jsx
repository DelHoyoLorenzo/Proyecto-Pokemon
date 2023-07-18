import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { searchById, cleanDetail } from "../../redux/actions";
import style from "./Detail.module.css";
import Loading from "../../components/Loading/Loading";
import {TiBackspace} from 'react-icons/ti'
function Detail() {
  const { id } = useParams();
  let navigate = useNavigate();
  let dispatch = useDispatch();

  //busco el pokemon en mi arreglo, para eso me traigo el arreglo
  let pokemonFoundById = useSelector((state) => state.pokemonFoundById);
  let loading = useSelector((state) => state.loading);
  const { name, image, types, hp, attack, defense, speed, height, weight } =
    pokemonFoundById;

  useEffect(() => {
    dispatch(searchById(id));
  }, [id]);
  /* let pokemonFound = allPokemons.find((pokemon)=> pokemon.id === id) */

  let navigateHome = function () {
    navigate("/home");
    dispatch(cleanDetail()); //limpio el detail cosa de que cuando quiera ver otro detail de otro pokemon no me aparezca el anterior
  };

  if (loading) return <Loading />;
  return (
    <div>
      <div className={style.background}>
        <div className={style.firstContainer}>
          <h1 className={style.nameContainer}>{name}</h1>
          <img className={style.imagen} src={image} />
          <div className={style.typesContainer}>
            {types?.map((type) => {
              return <h2>{type.name}</h2>;
            })}
          </div>
        </div>
      <div>
        <TiBackspace className={style.icon} onClick={navigateHome}>Back</TiBackspace>
      </div>
        <div className={style.secondContainer}>
          <h2>id: {id}</h2>
          <h2>hp:{hp}</h2>
          <h2>attack:{attack}</h2>
          <h2>defense: {defense}</h2>
          {speed !== 0 && <h2>speed: {speed}</h2>}
          {weight !== 0 && <h2>weight: {weight}</h2>}
          {height !== 0 && <h2>height: {height}</h2>}
        </div>
      </div>
    </div>
  );
}

export default Detail;
