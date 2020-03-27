import React, { Component } from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom'
import Admin from './pages/Admin'
import Login from './pages/Login'

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Redirect exact from='/' to='/admin'></Redirect>
        <Route path='/login' component={Login}></Route>
        <Route path='/admin' render={() => {
          return (
            <Admin>
              {/* <Route path='/admin/user' component={User}></Route> */}
            </Admin>
          )
        }
        }></Route>
      </HashRouter >
    );
  }
}

export default App;
