import React, { Fragment, useState } from 'react';
import Navbar from './components/layout/Navbar'
import './App.css';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import axios from 'axios';
import About from './components/pages/About'
import Alert from './components/layout/Alert'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const App = () => {

  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null)

  //Search Github users
  const searchUsers = async text => {
    setLoading(true)
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&=client_secret${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    setUsers(res.data.items)
    setLoading(false)
  }

  // Get a single Github user

  const getUser = async username => {
    setLoading(true)
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${
      process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    setUser(res.data)
    setLoading(false)
  }

  // Get Users repos
  const getUserRepos = async username => {
    setLoading(true)
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${
      process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    setRepos(res.data)
    setLoading(false)

  }

  //Clear Users
  const clearUsers = () => {
    setUsers([])
    setLoading(false)
  }

  // Set Alert
  const showAlert = (msg, type) => {
    setAlert({ msg, type })
    setTimeout(() => setAlert(null), 3000)
  }
  return (
    <Router>
      <div className="App">
        <Navbar title="Github Finder" icon="fab fa-github" />
        <div className="container">
          <Alert alert={alert} />
          <Switch>
            <Route exact path='/' render={props => (
              <Fragment><Search
                clearUsers={clearUsers}
                searchUsers={searchUsers}
                showClear={users.length > 0 ? true : false}
                setAlert={showAlert}
              />
                <Users loading={loading} users={users} />
              </Fragment>)} />
            <Route exact path='/about' component={About} />
            <Route exact path='/user/:login' render={props => (
              <User {...props} getUser={getUser} user={user} loading={loading} getUserRepos={getUserRepos} repos={repos}
              />
            )} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}
export default App;