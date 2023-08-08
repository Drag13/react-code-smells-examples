import { useDispatch, useSelector } from "react-redux";
import { searchAchievementsReducer } from "../global.store";

export function AchievementsPage() {
  const { store } = useSelector((x) => x);
  const { filteredAchievements, searchTerm } = store;
  const dispatch = useDispatch();
  console.log(filteredAchievements);
  return (
    <>
      <h1>Ігрові досягення</h1>

      <form>
        <label htmlFor="search-achievements">Шукаємо: </label>
        <input
          type="text"
          id="search-achievements"
          value={searchTerm}
          onChange={(e) => dispatch(searchAchievementsReducer(e.target.value))}
        />
      </form>

      <ul>
        {filteredAchievements.map((achievement) => (
          <li key={achievement.title}>
            <Achivement achievement={achievement} />
          </li>
        ))}
      </ul>
    </>
  );
}

function Achivement({ achievement }) {
  const { title } = achievement;
  return (
    <>
      Досягнення: <b>{title}</b>
    </>
  );
}
