import { useDispatch } from "react-redux";
import usePaginate from "../../Hooks/usePaginate";
import style from './Paginated.module.css'

function Paginated() {
  const {
    handlePrevious,
    handleNext,
    currentPage,
    totalPages
  } = usePaginate()

  return (
    <div className={style.mainContainer}>
      <div className={style.paginatedContainer}>
        <button disabled ={(currentPage === 1)} onClick={handlePrevious} className={style.button}>
          Previous
        </button>
        <div className={style.numbers}>
          PokePage {currentPage} / {totalPages || 1}
        </div>
        <button disabled ={(currentPage === totalPages)} onClick={handleNext} className={style.button}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Paginated;
