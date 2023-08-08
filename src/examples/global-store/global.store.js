import { configureStore, createSlice } from "@reduxjs/toolkit";
import allGames from "./games/games.json";
import allAchievements from "./achievements/achievements.json";
import { includesIgnoreCase } from "../../shared/utils/string";

const initialState = {
  searchTerm: "",
  allGames,
  filteredGames: allGames,
  allAchievements,
  filteredAchievements: allAchievements,
  user: { name: "Vitalii" },
  expanded: false,
};

const globalStoreReducer = createSlice({
  name: "globalStore",
  initialState,
  reducers: {
    searchGame: (state, { payload }) => ({
      ...state,
      searchTerm: payload,
      filteredGames: state.allGames.filter(({ title }) =>
        includesIgnoreCase(title, payload)
      ),
    }),
    searchAchievements: (state, { payload }) => ({
      ...state,
      searchTerm: payload,
      filteredAchievements: state.allAchievements.filter(({ title }) =>
        includesIgnoreCase(title, payload)
      ),
    }),
    toggle: (state) => ({
      ...state,
      expanded: !state.expanded,
    }),
  },
});

export const searchGameReducer = globalStoreReducer.actions.searchGame;
export const searchAchievementsReducer =
  globalStoreReducer.actions.searchAchievements;
export const toggleExpandedReducer = globalStoreReducer.actions.toggle;

export const globalStore = configureStore({
  reducer: {
    store: globalStoreReducer.reducer,
  },
});
