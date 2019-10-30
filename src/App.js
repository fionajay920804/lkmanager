import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link,  Switch, Redirect} from "react-router-dom";

import LayOut from './Components/LayOut'
import Login from "./Pages/User/login";

import Home from './Pages/Home/Home'
import User from './Pages/User/User'
import Mine from './Pages/Mine/Mine'
import SowingRouter from "./Pages/Rotation/router";
import CourseRouter from "./Pages/Course/router";
import ErorrPage from "./Pages/ErrorPage";

class App extends Component {
    render() {
        const userData = JSON.parse(sessionStorage.getItem('userData'));
        // 主面板
        let LayOutRouter = (
            <LayOut>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/user" component={User} />
                    <Route path="/mine" component={Mine} />
                    <Route path="/sowing" component={SowingRouter} />
                    <Route path="/course" component={CourseRouter} />
                    <Route component={ErorrPage} />
                </Switch>
            </LayOut>
        );
        return (
            <Router>
                <Switch>
                    {/*<Route*/}
                    {/*    exact*/}
                    {/*    path='/'*/}
                    {/*    render={*/}
                    {/*        userData? (props)=>LayOutRouter : ()=> <Redirect to='/login' push/>*/}
                    {/*    }*/}
                    {/*></Route>*/}
                    <Route path="/login" component={Login} />
                    <Route path="/"  render={props=>LayOutRouter} />
                </Switch>
            </Router>
        );
    }
}

export default App;
