import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";
import getBackground from "../utils/getBackground";
import '../components/PokemonPage/styles/PokemonPage.css';

const PokemonPage = () => {
  const { id } = useParams();
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const [pokemon, getPokemon] = useFetch(url);

  useEffect(() => {
    getPokemon();
    return () => {
      document.body.style.background = ""; // Limpiar el estilo del fondo al desmontar el componente
    };
  }, []);

  useEffect(() => {
    if (pokemon) {
      document.body.style.background = getBackground(pokemon.types?.[0].type.name);
    }
  }, [pokemon]);

  if (!pokemon) {
    return <p>Loading...</p>;
  }

  return (
    <div className="center-b">
      <div className="pokeball-background"></div>
      <div className="header-back">
        <a href="#/pokedex">
          <i className="bx bx-left-arrow-alt txt-shadow"></i>
        </a>
      </div>

      <div className="principal-columns">
        <div>
          <div className="container-pokemon box-shadow">
            <hr className="pokecolor__back_pokemon"></hr>
            <img
              className="img-pokemon"
              src={pokemon.sprites?.other?.["official-artwork"]?.front_default}
              alt=""
            />
            <div className="principal-info">
              <h2 className="weight">
                {pokemon.weight}
                <div className="sub-weight">Weight</div>
              </h2>
              <h2 className="height">
                {pokemon.height}
                <div className="sub-height">Height</div>
              </h2>
            </div>
            <div className="div-title">
              <h1 className="h1-title">{pokemon.name}</h1>
              <div>
                <b className="border-id"># {pokemon.id}</b>
              </div>
            </div>
          </div>

          <div className="type-abilities">
            <div className="container-type box-shadow">
              <div className="h1-type">
                <h1 className="h1-txt">Type</h1>
              </div>
              <hr />
              <div className="container-type-info">
                <div className="container-wrap">
                  {pokemon.types?.map((pokeType) => (
                    <div
                      className="container-wrap-inf"
                      style={{ background: getBackground(pokeType?.type?.name), color: "#fff" }}
                      key={pokeType?.type?.url}
                    >
                      <p>{pokeType?.type?.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="container-abilities box-shadow">
              <div className="h1-type">
                <h1 className="h1-txt">Abilities</h1>
              </div>
              <hr />
              <div className="container-type-info">
                <div className="container-wrap">
                  {pokemon.abilities?.map((pokeAbs) => (
                    <div className="container-wrap-inf bg-ab" key={pokeAbs?.ability?.url}>
                      <p>{pokeAbs?.ability?.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="stats-container box-shadow">
            <h1 className="h1-txt">Stats</h1>
            <div className="container-flex-stats">
              {pokemon.stats?.map((pokeStats) => (
                <div
                  className="row-stats"
                  key={pokeStats?.stat?.url}>
                  <div className="row-left-stats">
                    <div className="stat-first">
                      {pokeStats?.stat?.name}
                      {": "}
                    </div>
                  </div>
                  <div className="row-right-stats">
                    <div className="stat-bar" >
                      <div className="stat-last"  data-percent={`${(100 / (150 / (pokeStats?.base_stat)))}`} style={{ width: `${(100 / (150 / (pokeStats?.base_stat)))}%`, background: getBackground(pokemon.types?.[0].type.name) }}>
                        {pokeStats?.base_stat}/150
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="container-movements box-shadow">
          <h1 className="h1-txt">Movements</h1>
          <table>
            {pokemon.moves?.map((pokeMoves) => (
              <tbody key={pokeMoves?.move?.url}>
                <tr>
                  <td className="line-movement">{pokeMoves?.move?.name}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default PokemonPage;
