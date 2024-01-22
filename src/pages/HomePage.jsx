import { useRef, useState } from "react";
import { setTrainerG } from "../store/states/trainer.state";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import '../components/HomePage/styles/HomePage.css';

const HomePage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const inputTrainer = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = inputTrainer.current.value.trim();

    if (trimmedName.length < 3) {
      setErrorMessage('Trainer name must be at least 3 characters.');
    } else {
      setErrorMessage('');
      dispatch(setTrainerG(trimmedName));
      navigate('/pokedex');
    }
  };

  let imageUrl;


if (typeof process !== "undefined") {
  // Código solo para el servidor (Node.js)
  imageUrl = process.env.PUBLIC_URL + "/img/pokedex.png";
} else {
  // Código para el navegador
  imageUrl = "/img/pokedex.png";
}

  return (
    <>
      <div className="home__container">
        <img className="home__image" src={imageUrl} alt="img pokedex" />
        <h2 className="home__title">Hi Trainer!</h2>
        <p className="home__p">To start this app, give me your trainer name</p>
        <form onSubmit={handleSubmit}>
          <input className="home__input" ref={inputTrainer} type="text" />
          <button className="home__button">Catch them all</button>
        </form>
        {errorMessage && <p className="home__error">{errorMessage}</p>}
      </div>
      <hr className="home__bottom__red"></hr>
      <hr className="home__bottom__black"></hr>
    </>
  );
};

export default HomePage;
