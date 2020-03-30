import React, { Component } from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom'
import Admin from './pages/Admin'
import Login from './pages/Login'
import Analysis from './pages/Analysis'
import Administartor from './pages/Administartor'//zxz的管理员管理组件

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Redirect exact from='/' to='/admin'></Redirect>
        <Route path='/login' component={Login}></Route>
        <Route path='/admin' render={() => {
          return (
            <Admin>
              <Route path='/admin/analysis' component={Analysis}></Route>
              {/* zxz */}
              <Route path='/admin/administartor' component={Administartor}></Route>
              {/* zxz */}
            </Admin>
          )
        }
        }></Route>
      </HashRouter>
    );
  }
}

export default App;
