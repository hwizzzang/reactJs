import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Home from 'Routes/Home';
import Detail from 'Routes/Detail';
import TV from 'Routes/TV';
import Search from 'Routes/Search';

export default () => (
    <Router>
        <Route path="/" exact component={Home} />
        <Route path="/TV" exact component={TV} />
        <Route path="/search" exact component={Search} />
        <Route path="/detail" exact component={Detail} />
    </Router>
);
