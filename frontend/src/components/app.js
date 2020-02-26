import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Splash from './splash/splash_container';
import MatchingRound from './matching_round/matching_round';

const App = () => (
    <Switch>
        <Route exact path="/" component={Splash} />
        <Route path="/round" component={MatchingRound} />
    </Switch>
); 

export default App;
