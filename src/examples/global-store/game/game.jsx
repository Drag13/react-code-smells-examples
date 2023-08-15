import { useSelector } from "react-redux";
import { AppLink } from "../../../shared/AppLink";
import { ExpandCollapse } from "./expand-collapse";

export function Game({ id }) {
  // CODE SMELL #3 STORE VS PROPS
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

export function GameFixed({ game }) {
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
