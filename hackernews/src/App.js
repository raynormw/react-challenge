import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import NewsPage from './components/NewsPage';
import Users from './components/Users';
import NewsHeader from './components/NewsHeader';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <NewsHeader />
          <Switch>
            <Route exact path="/" component={NewsPage} />
            <Route path="/user/:id" component={Users} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }

}

export default App;
