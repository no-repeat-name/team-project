import React, { Component } from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom'
import Admin from './pages/Admin'
import Login from './pages/Login'
import Analysis from './pages/Analysis'
import Monitoring from './pages/Monitoring'
import Vip from './pages/Vip'
import Administartor from './pages/Administartor'//zxz的管理员管理组件
import GoodsList from './pages/Goods/GoodsList'
import GoodsInfoAdd from './pages/Goods/GoodsAdd'
import GoodsKind from "./pages/Goods/GoodsKind"
import GoodsUpdate from "./pages/Goods/GoodsUpdate"
// import login from './api/login';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Redirect exact from='/' to='/admin'></Redirect>
        <Route path='/login' component={Login}></Route>
        <Route path='/admin' render={() => {
          return (
            <Admin>
              <Route path='/admin/vip' component={Vip}></Route>
              <Route path='/admin/analysis' component={Analysis}></Route>
              <Route path='/admin/monitoring' component={Monitoring}></Route>
              <Route path='/admin/login' component={Login}></Route>
              {/* zxz */}
              <Route path='/admin/administartor' component={Administartor}></Route>
              {/* zxz */}
              <Route path='/admin/goodsInfo' component={GoodsList}></Route>
              <Route path='/admin/goodsInfoAdd' component={GoodsInfoAdd}></Route>
              <Route path='/admin/goodsKind' component={GoodsKind}></Route>
              <Route path='/admin/GoodsUpdate' component={GoodsUpdate}></Route>
            </Admin>
          )
        }
        }></Route>
      </HashRouter>
    );
  }
}

export default App;
