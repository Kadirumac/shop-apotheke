import React from "react";
import SingleRepoCard from "../components/SingleRepoCard";
import { getMyFavouriteRepos } from "../lib/LocalStoarge";

export default function FavoriteRepoPages() {
  const myFavouriteRepos = getMyFavouriteRepos();
  return (
    <div className="container-fluid">
      <div className="row">
        {myFavouriteRepos.map((repo: any, index: number) => (
          <div
            className="col-xs-12 col-sm-6 col-md-4 col-lg-3 my-3"
            key={index}
          >
            <SingleRepoCard repoData={repo} />
          </div>
        ))}
      </div>
    </div>
  );
}
