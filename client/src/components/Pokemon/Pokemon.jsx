import style from './Pokemon.module.css'
import { useNavigate } from 'react-router-dom'

function Pokemon({pokemon}){
    const {id, name, image, hp, attack, defense, speed, weight, height, types} = pokemon

    let navigate = useNavigate()
    let navigateHandler = function(){
        navigate(`/detail/${id}`);
    }
    return(
        <div className={style.pokemonConteiner}>
            <h1>{name}</h1>
            <img className={style.imagen} src={image} onClick={navigateHandler}/>
            {types?.map((type, index)=>{
                return <h2 key={index}>{type.name}</h2>
            })}
        </div>
    )
}

export default Pokemon;