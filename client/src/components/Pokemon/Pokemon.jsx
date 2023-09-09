import { useState } from 'react'
import style from './Pokemon.module.css'
import { useNavigate } from 'react-router-dom'
import DetailModal from '../../Modals/DetailModal'
function Pokemon({pokemon}){
    const {id, name, image, hp, attack, defense, speed, weight, height, types, createdBy} = pokemon
    const [modal, setModal] = useState('pending')

    let navigate = useNavigate()
    let navigateHandler = function(){
        navigate(`/detail/${id}`);
    }

    const handleModal = () =>{
        setModal(true)
    }
    let handleCloseModal = ()=>{
        setModal('pending')
    }
    return(
        <div>
            {modal === true && <DetailModal id={id} close={handleCloseModal}/>}
            <div onClick={handleModal} className={`${style.pokemonConteiner} hover:cursor-pointer`}>
                <div>
                    <h1>{name}</h1>
                </div>
                <img className={style.imagen} src={image}/>
                <div className={style.typesContainer}>
                    {types?.map((type, index)=>{
                        return <h2 className={style.typeContainer} key={index}>{type.name}</h2>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Pokemon;