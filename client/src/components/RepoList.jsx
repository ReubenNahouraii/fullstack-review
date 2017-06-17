import React from 'react';
import Repo from './Repo.jsx';

const RepoList = ({repos}) => (
  <div>
    <h4> Repo List Component </h4>
    Top {repos.length} repos.
    {repos.map(repo => {
      return (<Repo repo={repo}/>)
    })};
  </div>
);

export default RepoList;