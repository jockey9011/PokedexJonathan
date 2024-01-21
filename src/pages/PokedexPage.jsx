import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import PokeCard from "../components/PokedexPage/PokeCard";
import SelectType from "../components/PokedexPage/SelectType";
import '../components/PokedexPage/styles/PokeCard.css';

const PokedexPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [typeSelect, setTypeSelect] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12); // Estado para la cantidad de cartas por página

  const trainerName = useSelector(states => states.trainer);

  const url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
  const [pokemons, getPokemons, getTypePokemons] = useFetch(url);

  useEffect(() => {
    if (typeSelect === 'All Pokemons' || typeSelect === '') {
      getPokemons();
    } else {
      getTypePokemons(typeSelect);
    }
    setCurrentPage(1);
  }, [typeSelect]);

  const inputName = useRef();

  const handleSearch = e => {
    e.preventDefault();
    setInputValue(inputName.current.value.trim().toLowerCase());
  };

  const cbFilter = (pokeInfo) => pokeInfo.name.toLowerCase().includes(inputValue);

  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const visiblePokemons = pokemons?.results?.filter(cbFilter)?.slice(startIdx, endIdx) || [];

  const totalPages = Math.ceil(pokemons?.results?.filter(cbFilter)?.length / itemsPerPage) || 1;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value, 10);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reiniciar a la primera página al cambiar la cantidad de cartas por página
  };

  return (
    <div>
      <hr className="pokecard__top__red"></hr>
      <img className="pokecard__top__image" src="src/img/pokedex.png" alt="" />
      <hr className="pokecard__top__black"></hr>
      <h2 className="pokecard__top__title">
        Hi <span className="pokecard__top__trainerName">{trainerName}</span>, here you can find your favorite pokemon
      </h2>
      <div className="pokecard__top__formSearch">
        <form onSubmit={handleSearch}>
          <input className="pokecard__inputSearch" ref={inputName} type="text" />
          <button className="pokecard__buttonSearch">Search</button>
        </form>
        <SelectType setTypeSelect={setTypeSelect} />
       <label>
          Cards per page:
          <input className="pokecard__CardsPerPage" type="number" min="1" value={itemsPerPage} onChange={handleItemsPerPageChange} />
        </label>
      </div>
      <div className="pokecard__container">
        {visiblePokemons.map(pokeInfo => (
          <PokeCard key={pokeInfo.url} url={pokeInfo.url} />
        ))}
      </div>
      <div>
        <button className="pokecard__button__preview" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        <span>{currentPage} of {totalPages}</span>
        <button className="pokecard__button__next" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default PokedexPage;
