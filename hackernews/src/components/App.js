import React from 'react';
import $ from 'jquery';
import _ from 'lodash';

import './App.css';
import NewsItem from './NewsItem';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      items: []
    };
  }

  render() {
    const items = this._getNews();

    return (
      <div className="App">
        {items}
      </div>
    );
  }

  componentWillMount() {
    this._fetchNews();
  }

  _fetchNews() {
    let self = this;
    $.ajax({
      // Ambil topstories
      url: 'https://hacker-news.firebaseio.com/v0/topstories.json',
      dataType: 'json'
    }).then(function (stories) {
      // Dapet id topstories
      // Ambil 30 stories teratas
      var details = _(stories.slice(0, 30)).map(function (itemId) {
        return $.ajax({
          url: 'https://hacker-news.firebaseio.com/v0/item/' + itemId + '.json',
          dataType: 'json'
        });
      }).value();
      console.log(details);
      return $.when.apply($, details);
    }).then(function () {
      // Simpen hasil ke state
      var items = _(arguments).map(function (argument) {
        return argument[0];
      }).value();
      console.log(items);
      self.setState({ items });
    });
  }

  _getNews() {
    return this.state.items.map((item) => {
      return (<NewsItem
        url={item.url}
        title={item.title}
        score={item.score}
        by={item.by}
        kids={item.kids}
        id={item.id}
        key={item.id}/>);
    });
  }
}

export default App;
