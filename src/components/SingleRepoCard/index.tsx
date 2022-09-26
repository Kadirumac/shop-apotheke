import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { strings } from "../../lib/constants";
import { GithubRepo } from "../../lib/interfaces";
import {
  selectRepoList,
  setMyFavoriteRepos,
} from "../../reducers/RepoListSlice";
import "./repo_card.scss";
import star from "../../assets/images/star.svg";

type SingleRepoCardProps = {
  repoData: GithubRepo;
};

const SingleRepoCard = ({ repoData }: SingleRepoCardProps) => {
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

  const [starred, setStarred] = useState<GithubRepo>();
  const dispatch = useDispatch();
  const { myFavouriteRepos } = useSelector(selectRepoList);

  const addFavouriteHandler = () => {
    if (starred) {
      //prevent adding the same card
      const filteredRepos: GithubRepo[] = myFavouriteRepos.filter(
        (repo: GithubRepo) => repo !== starred
      );
      dispatch(setMyFavoriteRepos(filteredRepos));
    } else {
      // add card if its not starred yet
      const newStarredRepos: GithubRepo[] = [...myFavouriteRepos, repoData];
      dispatch(setMyFavoriteRepos(newStarredRepos));
    }
  };
  console.log(myFavouriteRepos);
  

  useEffect(() => {
    let isStarred = myFavouriteRepos.find((repo: GithubRepo) => repo.id === id);
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
            {stargazers_count} {strings.stars}
            <span className="text-secondary">{strings.since} </span>
            <Moment format="DD-MM-YYYY">{created_at}</Moment>
          </Card.Text>
          <Card.Text className="repo-card--text">{description}</Card.Text>
          <div className="star-wrapper" onClick={addFavouriteHandler}>
            <span>{strings.addFavorite}</span>
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
                {strings.githubBtn}
              </Button>
            </a>
            {homepage ? (
              <a href={homepage} rel="noreferrer" target="_blank">
                <i className="bi bi-box-arrow-in-up-right" />
                <Button className="repo-card--btn">
                  {" "}
                  {strings.websiteBtn}{" "}
                </Button>
              </a>
            ) : null}
          </div>
        </Card.Body>
      </Card>
    </Card>
  );
};

export default SingleRepoCard;
