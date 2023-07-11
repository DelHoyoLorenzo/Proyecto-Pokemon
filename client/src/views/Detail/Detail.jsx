import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { searchById, cleanDetail } from "../../redux/actions";
import style from './Detail.module.css'

function Detail() {
  const { id } = useParams();
  let navigate = useNavigate();
  let dispatch = useDispatch();

  //busco el pokemon en mi arreglo, para eso me traigo el arreglo
  let pokemonFoundById = useSelector((state) => state.pokemonFoundById);
  let loading = useSelector((state)=> state.loading)
  const { name, image, types, hp, attack, defense, speed, heigth, weight } = pokemonFoundById;

  useEffect(() => {
    dispatch(searchById(id));
  }, [id]);
  /* let pokemonFound = allPokemons.find((pokemon)=> pokemon.id === id) */
  
  let navigateHome = function () {
    navigate("/home");
    dispatch(cleanDetail())//limpio el detail cosa de que cuando quiera ver otro detail de otro pokemon no me aparezca el anterior
  };

  if(loading) return null;
  return (
    <div className={style.detailConteiner}>
      <button onClick={navigateHome}>Home</button>
      <h1>{name}</h1>
      <img src={image} />
      <h2>id: {id}</h2>
      <h2>hp:{hp}</h2>
      <h2>attack:{attack}</h2>
      <h2>defense: {defense}</h2>
      {speed && <h2>speed: {speed}</h2>}
      {heigth && <h2>heigth: {heigth}</h2>}
      {weight && <h2>weight: {weight}</h2>}
      {types?.map((type)=>{
                return <h2>{type.name}</h2>
            })}
    </div>
  );
}

export default Detail;
