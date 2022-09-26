import React, { useEffect } from "react";
import {
  selectRepoList,
  setPopularRepoList,
  setLoading,
} from "../../reducers/RepoListSlice";
import "./repo_list.scss";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import SingleRepoCard from "../SingleRepoCard";
import { getPopularRepos } from "../../lib/fetchData";
import "./repo_list.scss";

export default function PopularRepoList() {
  const dispatch = useDispatch();

  const getRepoData = async (lang: string) => {
    const data = await getPopularRepos(lang);
    dispatch(setPopularRepoList(data));
    dispatch(setLoading(false));
  };

  useEffect(() => {
    getRepoData("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { popularRepoList, loading } = useSelector(selectRepoList);

  return (
    <div className="container-fluid px-5">
      <div className="row">
        {loading ? (
          <div className="spinner">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          popularRepoList?.map((item: any, index: number) => (
            <div
              className="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 my-3"
              key={index}
            >
              <SingleRepoCard repoData={item} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
