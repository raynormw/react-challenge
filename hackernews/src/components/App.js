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
      url: 'https://hacker-news.firebaseio.com/v0/topstories.json',
      dataType: 'json'
    }).then(function (stories) {
      // Get the item details in parallel
      var detailDeferreds = _(stories.slice(0, 30)).map(function (itemId) {
        return $.ajax({
          url: 'https://hacker-news.firebaseio.com/v0/item/' + itemId + '.json',
          dataType: 'json'
        });
      }).value();
      return $.when.apply($, detailDeferreds);
    }).then(function () {
      // Extract the response JSON
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
        url={item.url} title={item.title} />);
    });
  }
}

export default App;
