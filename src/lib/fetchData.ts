import axios from "axios";

export const getPopularRepos = async (language: string) => {
  const baseUrl = `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`;
  const getRepos = await axios(baseUrl);

  return getRepos?.data?.items;
};
