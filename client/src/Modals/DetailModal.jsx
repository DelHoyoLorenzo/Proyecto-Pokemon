import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { searchById, cleanDetail } from "../redux/actions";
import { IoMdArrowRoundBack } from "react-icons/io";
import Loading from "../components/Loading/Loading";
import LoadingModal from "./LoadingModal";

function DetailModal({ id, close }) {
  let dispatch = useDispatch();

  let loading = useSelector((state) => state.loading);

  let pokemonFoundById = useSelector((state) => state.pokemonFoundById);
  const { name, image, types, hp, attack, defense, speed, height, weight } =
    pokemonFoundById;

  useEffect(() => {
    dispatch(searchById(id));
  }, []);

  const handleClose = () => {
    close("pending");
    dispatch(cleanDetail());
  };

  if (!name) {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 backdrop-blur-lg z-10">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-400 bg-opacity-80 w-3/4 h-3/4 z-50 rounded-lg">
            <LoadingModal/>
        </div>
      </div>
    );
  }
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 backdrop-blur-lg z-10">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-400 bg-opacity-80 w-3/4 h-auto z-50 rounded-lg">
        <div className="flex flex-col">
          <div className="flex justify-between items-center border-b-2 border-black">
            <h1 className="font-sans font-bold text-2xl m-2">{name}</h1>
            <IoMdArrowRoundBack
              onClick={handleClose}
              className="m-2 font-normal text-2xl hover:cursor-pointer"
            />
          </div>
          <div className="flex">
            <div className="border-r-2 border-black  w-1/2 h-auto">
              <div className="flex justify-evenly m-2 border-b-2 border-black">
                {types?.map((type) => {
                  return <h2 className="text-lg m-1">{type.name}</h2>;
                })}
              </div>
              <img className="md:-mt-auto" src={image} />
            </div>
            <div className="flex flex-col items-center w-1/2 justify-evenly">
              <h1 className="text-center text-2xl underline">Stats</h1>
              <div className="grid grid-cols-auto gap-10 md:grid-cols-2 md:gap-20 ">
                <h1>Id: {id}</h1>
                <h1>HP: {hp}</h1>
                <h1>Defense: {defense}</h1>
                <h1>Attack: {attack}</h1>
                {speed && <h1>Speed: {speed}</h1>}
                {height && <h1>Height: {height}</h1>}
                {weight && <h1>Weight: {weight}</h1>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className=''>
    //   <div className="flex flex-col justify-center items-center">
    //     <TiBackspace className='' onClick={navigateHome}/>
    //   </div>
    //   <div className=''>
    //     <div className=''>
    //       <h1 className=''>{name}</h1>
    //     </div>
    //     <img className='' src={image} />
    //     <div className=''>
    //       {types?.map((type) => {
    //         return <h2>{type.name}</h2>;
    //       })}
    //     </div>
    //   </div>
    //   <div className=''>
    //     <div>
    //       <h2 className=''>id: {id}</h2>
    //     </div>
    //     <div>
    //       <h2 className=''>hp:{hp}</h2>
    //     </div>
    //     <div>
    //       <h2 className=''>attack:{attack}</h2>
    //     </div>
    //     <div>
    //       <h2 className=''>defense: {defense}</h2>
    //     </div>
    //     {speed !== 0 && (
    //       <div>
    //         <h2 className=''>speed: {speed}</h2>
    //       </div>
    //     )}
    //     {weight !== 0 && (
    //       <div>
    //         <h2 className=''>weight: {weight}</h2>
    //       </div>
    //     )}
    //     {height !== 0 && (
    //       <div>
    //         <h2 className=''>height: {height}</h2>
    //       </div>
    //     )}
    //   </div>
    // </div>
  );
}

export default DetailModal;
