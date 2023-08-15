import { useSelector, useDispatch } from "react-redux";
import { searchGameReducer as searchGameReducer } from "../global.store";
import { Game } from "./game";

export function GamesPage() {
  // using global state instead of using selector
  const { store } = useSelector((state) => state);
  const { filteredGames: games } = store;
  return (
    <>
      <h1>ТОП-5 ігр за версією Metacritic</h1>

      <Search />
      <SearchResult />
      <ul>
        {games.map(({ id }) => (
          <li key={id}>
            <Game id={id} />
          </li>
        ))}
      </ul>
    </>
  );
}

function Search() {
  // CODE SMELL #6 PSEUDE LOCAL STATE
  const dispatch = useDispatch();
  const searchGame = (e) => dispatch(searchGameReducer(e.target.value));
  const { store } = useSelector((state) => state);
  const { searchTerm } = store;
  return (
    <form>
      <label htmlFor="game-search">Шукаємо </label>
      <input
        id="game-search"
        type="text"
        value={searchTerm}
        onChange={searchGame}
      />
    </form>
  );
}

function SearchResult() {
  // CODE SMELL #6 PSEUDE LOCAL STATE
  const { searchTerm } = useSelector((state) => state.store);
  return searchTerm ? (
    <i>
      Шукаємо <b>{searchTerm}</b>
    </i>
  ) : (
    <i>Введіть текст для пошуку</i>
  );
}
