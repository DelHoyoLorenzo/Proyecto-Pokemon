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

  let pokemonFoundById = useSelector((state) => state.pokemonFoundById);
  let loading = useSelector((state) => state.loading);
  const { name, image, types, hp, attack, defense, speed, height, weight } = pokemonFoundById;

  useEffect(() => {
    dispatch(searchById(id));
  }, [id]);

  let navigateHome = function () {
    navigate("/home");
    dispatch(cleanDetail()); //limpio el detail cosa de que cuando quiera ver otro detail de otro pokemon no me aparezca el anterior
  };

  if (loading) return <Loading />;
  return (
    <div>
      <div className={style.background}>
      <div>
        <TiBackspace className={style.icon} onClick={navigateHome}>Back</TiBackspace>
      </div>
        <div className={style.firstContainer}>
          <h1 className={style.nameContainer}>{name}</h1>
          <img className={style.imagen} src={image} />
          <div className={style.typesContainer}>
            {types?.map((type) => {
              return <h2>{type.name}</h2>;
            })}
          </div>
        </div>
        <div className={style.secondContainer}>
          <div>

            <h2 className={style.everyDetailStyle}>id: {id}</h2>
          </div>
          <div>

          <h2 className={style.everyDetailStyle}>hp:{hp}</h2>
          </div>
          <div>

          <h2 className={style.everyDetailStyle}>attack:{attack}</h2>
          </div>
          <div>

          <h2 className={style.everyDetailStyle}>defense: {defense}</h2>
          </div>
          {speed !== 0 && <div><h2 className={style.everyDetailStyle}>speed: {speed}</h2></div>}
          {weight !== 0 && <div><h2 className={style.everyDetailStyle}>weight: {weight}</h2></div>}
          {height !== 0 && <div><h2 className={style.everyDetailStyle}>height: {height}</h2></div>}
        </div>
      </div>
    </div>
  );
}

export default Detail;
