import { renderHook } from "@testing-library/react-hooks";
import { setMyFavouriteRepos, getMyFavouriteRepos } from "./LocalStoarge";
import { GithubRepo } from "./interfaces";

const MY_FAV_REPOS: string = "myFavouriteRepos";
const TEST_VALUE: GithubRepo = {
  id: "1",
  owner: {
    avatar_url: "test",
  },
  name: "test",
  created_at: "test",
  description: "test",
  html_url: "test",
  homepage: "test",
  stargazers_count: "test",
};

describe("setMyFavouriteRepos", () => {
  it("should set localStorage with default value", () => {
    renderHook(() => setMyFavouriteRepos([TEST_VALUE]));
    expect(JSON.parse(localStorage.getItem(MY_FAV_REPOS)!)).toEqual([
      TEST_VALUE,
    ]);
  });

  it("should get localStorage with default value", () => {
    expect(getMyFavouriteRepos()).toEqual([TEST_VALUE]);
  });
});
