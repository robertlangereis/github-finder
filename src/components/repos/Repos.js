import React from 'react'
import PropTypes from 'prop-types';
import Repoitem from './Repoitem'

const Repos = ({repos}) => {
  return (
    repos.map(repo=> <Repoitem repo={repo} key={repo.id}/>)
  )
}

Repos.prototypes ={
    repo: PropTypes.array.isRequired,
}

export default Repos
