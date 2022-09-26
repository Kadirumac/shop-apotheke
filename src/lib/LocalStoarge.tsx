import { GithubRepo } from "./interfaces";
const MY_FAV_REPOS = "myFavouriteRepos";

export const getMyFavouriteRepos = () => {
  const favRepos = localStorage.getItem(MY_FAV_REPOS) || "[]"; //to prevent json parse error
  return JSON.parse(favRepos);
};

export const setMyFavouriteRepos = (repos: GithubRepo[]) => {
  localStorage.setItem(MY_FAV_REPOS, JSON.stringify(repos));
};
