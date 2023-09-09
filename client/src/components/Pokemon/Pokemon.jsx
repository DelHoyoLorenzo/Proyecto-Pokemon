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
  {modal === true && <DetailModal id={id} close={handleCloseModal} />}
  <div className={`${style.pokemonConteiner} hover:cursor-pointer`} onClick={handleModal}>
    <div className='relative bg-white'>
      <h1 className='absolute top-[-15px] left-1/2 transform -translate-x-1/2 p-2 rounded-t-md mt-[-10px] z-10 bg-red-500 text-xl font-roboto font-extrabold'>{name}</h1>
      <img className= 'mx-10px w-full shadow-inner z-50' src={image} />
      <div className='flex justify-evenly bg-black'>
        {types?.map((type, index) => {
          return <h2 className='text-white text-lg m-2' key={index}>{type.name}</h2>;
        })}
      </div>
    </div>
  </div>
</div>

    )
}

export default Pokemon;