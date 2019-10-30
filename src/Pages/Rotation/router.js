import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from "react-router-dom";

import SowingList from "./SowingList";
import SowingEdit from "./SowingEdit";
import SowingAdd from "./SowingAdd";



class SowingRouter extends Component {
    render() {
        return (
            <Switch>
                <Route path='/sowing/list' component={SowingList}></Route>
                <Route path='/sowing/add' component={SowingAdd}></Route>
                <Route path='/sowing/edit' component={SowingEdit}></Route>
                <Redirect exact from='/sowing' to='/sowing/list'></Redirect>
            </Switch>
        );
    }
}

export default SowingRouter;