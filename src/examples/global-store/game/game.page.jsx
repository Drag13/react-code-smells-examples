import { useSelector, useDispatch, useStore } from "react-redux";
import {
  searchGameReducer as searchGameReducer,
  toggleExpandedReducer,
} from "../global.store";
import { AppLink } from "../../../shared/AppLink";
import { memo } from "react";

export function GamesPage() {
  // using global state instead of using selector
  const { store } = useSelector((state) => state);
  const { filteredGames: games } = store;
  return (
    <>
      <h1>ТОП-5 ігр за версією Metacritic</h1>

      <Search />

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

function Game({ id }) {
  const { store } = useSelector((state) => state);
  const { filteredGames } = store;
  const game = filteredGames.find((x) => x.id === id);
  const { score, title, description } = game;
  return (
    <>
      <h2>{title}</h2>
      <p>Metacritic: {score}</p>
      <p>
        <AppLink to={`/global-store/${id}/achievements/`}>
          Мої досягнення
        </AppLink>
      </p>
      <ExpandCollapse
        id={id}
        full={description}
        short={description.substring(0, 15)}
      />
    </>
  );
}

function ExpandCollapse({ short, full, id }) {
  const expanded = useSelector((x) => x.store.expanded)[id];
  const dispatch = useDispatch();
  const toggle = () => dispatch(toggleExpandedReducer(id));
  return (
    <div>
      {expanded ? <p>{full}</p> : null}
      {!expanded ? (
        <button type="button" onClick={toggle}>
          {short}
        </button>
      ) : null}
    </div>
  );
}

const ExpandCollapseMemo = memo(ExpandCollapse);
