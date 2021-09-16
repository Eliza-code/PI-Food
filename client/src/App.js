import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Landing from './components/Landing';
import Home from './components/Home';
import Detail from './components/Detail';
import Form from './components/Form';


function App() {
  return (
    <div>
      <Switch>
        <Route exact path = '/' component={Landing} />
        <Route exact path = '/home' component={Home} />
        <Route exact path = '/recipe/:id' component={Detail}/>
        <Route exact path = '/create' component ={Form} />
      </Switch>
    </div>
  );
}

export default App;
