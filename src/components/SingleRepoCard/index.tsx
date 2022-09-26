import React, { useState, useEffect } from "react";
import { Button, Card, Image } from "react-bootstrap";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { getMyFavouriteRepos } from "../../lib/LocalStoarge";
import {
  selectRepoList,
  setMyFavoriteRepos,
} from "../../reducers/RepoListSlice";
import "./repo_card.scss";
import star from "./star.svg";

const SingleRepoCard = ({ repoData }) => {
  const {
    id,
    owner,
    name,
    created_at,
    description,
    html_url,
    homepage,
    stargazers_count,
  } = repoData;
  const [starred, setStarred] = useState({});
  const dispatch = useDispatch();
  const { myFavouriteRepos } = useSelector(selectRepoList);
  console.log(getMyFavouriteRepos());

  const addFavouriteHandler = () => {
    if (starred) {
      //prevent adding the same card
      const filteredRepos = myFavouriteRepos.filter((repo) => repo !== starred);
      dispatch(setMyFavoriteRepos(filteredRepos));
    } else {
      // add card if its not starred yet
      const newStarredRepos = [...myFavouriteRepos, repoData];
      dispatch(setMyFavoriteRepos(newStarredRepos));
    }
  };

  useEffect(() => {
    let isStarred = myFavouriteRepos.find((repo) => repo.id === id);
    setStarred(isStarred);
  }, [id, myFavouriteRepos]);
  return (
    <Card key={id} className="repo-card">
      <Card>
        <Card.Header className="repo-card--header">
          <Card.Title className="repo-card--title">{name}</Card.Title>
          <Card.Img className="repo-card--img" src={owner.avatar_url} />
        </Card.Header>
        <Card.Body className="repo-card--body">
          <Card.Text className="repo-card--stars">
            {stargazers_count} Stars{" "}
            <span className="text-secondary">since </span>
            <Moment format="DD-MM-YYYY">{created_at}</Moment>
          </Card.Text>
          <Card.Text className="repo-card--text">{description}</Card.Text>
          <div className="star-wrapper" onClick={addFavouriteHandler}>
            <span>Add to favorite</span>
            <img
              className={`star ${starred ? "star-favourite" : ""}`}
              src={star}
              alt="star"
            />
          </div>
          <div className="buttons">
            <a href={html_url} rel="noreferrer" target="_blank">
              <i className="bi bi-github" />
              <Button className="repo-card--btn" variant="secondary">
                Github repo
              </Button>
            </a>
            {homepage ? (
              <a href={homepage} rel="noreferrer" target="_blank">
                <i className="bi bi-box-arrow-in-up-right" />
                <Button className="repo-card--btn"> To website </Button>
              </a>
            ) : null}
          </div>
        </Card.Body>
      </Card>
    </Card>
  );
};

export default SingleRepoCard;
