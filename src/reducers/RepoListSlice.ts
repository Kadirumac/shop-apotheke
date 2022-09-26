import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../config/store";
import { getMyFavouriteRepos, setMyFavouriteRepos } from "../lib/LocalStoarge";
import { GithubRepo } from "../lib/interfaces";

export interface RepoListState {
  popularRepoList: GithubRepo[];
  myFavouriteRepos: GithubRepo[];
  loading: boolean;
}

const initialState: RepoListState = {
  popularRepoList: [],
  myFavouriteRepos: getMyFavouriteRepos(),
  loading: true,
};

export const repoListSlice = createSlice({
  name: "RepoList",
  initialState,
  reducers: {
    setPopularRepoList: (state, action) => {
      state.popularRepoList = action.payload;
    },
    setMyFavoriteRepos: (state, action) => {
      state.myFavouriteRepos = action.payload;
      setMyFavouriteRepos(action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setPopularRepoList, setMyFavoriteRepos, setLoading } =
  repoListSlice.actions;

export const selectRepoList = (state: RootState) => state.repoList;

export default repoListSlice.reducer;
