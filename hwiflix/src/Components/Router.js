import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from 'react-router-dom';
import Home from 'Routes/Home';
import TV from 'Routes/TV';
import Search from 'Routes/Search';
import Detail from 'Routes/Detail';

export default () => (
    <Router>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/tv" exact component={TV} />
            <Route path="/tv/popular" render={() => <h1>popular</h1>} />
            <Route path="/search" component={Search} />
            <Route path="/detail" component={Detail} />
            <Redirect from="*" to="" />
        </Switch>
    </Router>
);