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
            <div>
                <h1>{name}</h1>
            </div>
            <img className={style.imagen} src={image} onClick={navigateHandler}/>
            <div className={style.typesContainer}>
                {types?.map((type, index)=>{
                    return <h2 className={style.typeContainer} key={index}>{type.name}</h2>
                })}
            </div>
        </div>
    )
}

export default Pokemon;