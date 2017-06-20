import React from 'react';
import $ from 'jquery';
import _ from 'lodash';

import './App.css';
import NewsHeader from './NewsHeader';
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
        <NewsHeader />
        {items}
      </div>
    );
  }

  componentWillMount() {
    this._fetchNews();
  }

  componentDidMount() {
    setInterval(() => this._fetchNews(), 5000);
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
    let rank = 1;
    return this.state.items.map((item) => {
      return (<NewsItem
        rank={rank++}
        by={item.by}
        id={item.id}
        kids={item.kids}
        score={item.score}
        time={item.time}
        title={item.title}
        url={item.url}
        key={item.id}/>);
    });
  }
}

export default App;
