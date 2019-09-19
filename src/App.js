import React, { Fragment, Component } from 'react';
import Navbar from './components/layout/Navbar'
import './App.css';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import axios from 'axios';
import About from './components/pages/About'
import Alert from './components/layout/Alert'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

class App extends Component {

  state = {
    users: [],
    user: {},
    loading: false,
    alert: null
  }

  // //Fetch from Github API
  // async componentDidMount() {
  //   // console.log(process.env.REACT_APP_GITHUB_CLIENT_SECRET)
  //   this.setState({ loading: true });
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
  //   this.setState({ users: res.data, loading: false })
  //   console.log('res', res.data);

  // }

  //Search Github users
  searchUsers = async text => {
    this.setState({ loading: true })
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&=client_secret${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({ users: res.data.items, loading: false })
  }

  // Get a single Github user

  getUser = async username =>{
    this.setState({ loading: true })
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${
      process.env.REACT_APP_GITHUB_CLIENT_ID
    }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({ user: res.data, loading: false })
  }

  //Clear Users
  clearUsers = () => {
    this.setState({ users: [], loading: false });
  }

  // Set Alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } })
    setTimeout(() => this.setState({ alert: null }), 3000)
  }



  render() {
    const { user, users, loading } = this.state
    return (
      <Router>
        <div className="App">
          <Navbar title="Github Finder" icon="fab fa-github" />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route exact path='/' render={props => (
            <Fragment><Search
            clearUsers={this.clearUsers}
            searchUsers={this.searchUsers}
            showClear={users.length > 0 ? true : false}
            setAlert={this.setAlert}
          />
          <Users loading={loading} users={users}/>
          </Fragment>)}/>
          <Route exact path='/about' component={About}/>
          <Route exact path='/user/:login' render={props => (
              <User {...props} getUser={this.getUser} user={user} loading={loading}
              />
              )} />
            </Switch>
            </div>
        </div>
      </Router>
    );
  }
}
export default App;