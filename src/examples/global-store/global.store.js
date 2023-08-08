import { configureStore, createSlice } from "@reduxjs/toolkit";
import allGames from "./game/games.json";
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

const globalStoreSlice = createSlice({
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

export const searchGameReducer = globalStoreSlice.actions.searchGame;

export const searchAchievementsReducer =
  globalStoreSlice.actions.searchAchievements;

export const toggleExpandedReducer = globalStoreSlice.actions.toggle;

export const globalStore = configureStore({
  reducer: {
    store: globalStoreSlice.reducer,
  },
});
