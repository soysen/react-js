import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';
import { hashHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import AppMain from './components/pages/AppMain.jsx';
import Home from './components/pages/components/Home.jsx';
import Process from './components/pages/components/Process.jsx';
import Epilogue from './components/pages/components/Epilogue.jsx';

injectTapEventPlugin();

// Render
ReactDom.render(
    <MuiThemeProvider>
        <Router history={hashHistory}>
            <Route path='/' component={AppMain}>
                <IndexRoute component={Home} />
                <Route path="home" component={Home} />
                <Route path="process" component={Process} />
                <Route path="epilogue" component={Epilogue} />
            </Route>
        </Router>
    </MuiThemeProvider>,
    document.querySelector('#app')
);
