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
  expanded: {},
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
    toggle: (state, { payload }) => {
      return {
        ...state,
        expanded: { ...state.expanded, [payload]: !state.expanded[payload] },
      };
    },
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
