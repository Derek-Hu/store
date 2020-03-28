import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PlayStore from './PlayStore';
import ProjectPage from './pages/ProjectPage';

ReactDOM.render(
    <Router>
        <div>
            <Switch>
                <Route exact key='store' path='/' component={PlayStore} />
                <Route exact key='project' path='/project' component={ProjectPage} />
            </Switch>
        </div>
    </Router>,
    document.getElementById('root'));
