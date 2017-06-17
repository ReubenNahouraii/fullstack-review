import React from 'react';

const Repo = ({repo}) =>  {

  return (
    <div>
      <a href={repo.html_url}> {repo.name} </a>
      <span>&nbsp;&nbsp;[{repo.forks_count}] -- <em>{repo.login}</em></span>
    </div>
  );
}

export default Repo;
