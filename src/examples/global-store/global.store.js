import { configureStore, createSlice } from "@reduxjs/toolkit";
import allGames from "./game/games.json";
import { includesIgnoreCase } from "../../shared/utils/string";

const initialState = {
  searchTerm: "",
  allGames,
  filteredGames: allGames,
  user: { name: "Vitalii" },
  expanded: {},
};

// CODE SMELL #1 - SINGLE SLICE
const globalStoreSlice = createSlice({
  name: "globalStore",
  initialState,
  reducers: {
    searchGame: (state, { payload }) => ({
      ...state,
      searchTerm: payload,
      // CODE SMELL #7 TRANSFORMED DATA IN STORE
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
