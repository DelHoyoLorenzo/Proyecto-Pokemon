import style from './Pokemon.module.css'
import { useNavigate } from 'react-router-dom'

function Pokemon({pokemon}){
    const {id, name, image, hp, attack, defense, speed, weight, heigth, types} = pokemon

    let navigate = useNavigate()
    let navigateHandler = function(){
        navigate(`/detail/${id}`);
    }
    return(
        <div >
            <h1>{name}</h1>
            <img src={image} onClick={navigateHandler}/>
            {types.map((type)=>{
                return <h2>{type.name}</h2>
            })}
        </div>
    )
}

export default Pokemon;