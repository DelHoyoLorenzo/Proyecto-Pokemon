import style from './Pokemon.module.css'

function Pokemon({pokemon}){
    const {id, name, image, hp, attack, defense, speed, weight, heigth, types} = pokemon
    return(
        <div >
            <h1>{name}</h1>
            <img src={image}/>
        </div>
    )
}

export default Pokemon;