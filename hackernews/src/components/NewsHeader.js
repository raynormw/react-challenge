import React from 'react';

import './NewsHeader.css';

class NewsHeader extends React.Component {
  render() {
    return (
      <div className="newsHeader">
        {this._getLogo()}
        {this._getTitle()}
      </div>
    );
  }

  _getLogo() {
    return (
      <div className="newsHeader-logo">
        <a href="https://www.ycombinator.com"><img src="y18.gif" alt="logo"/></a>
      </div>
    );
  }

  _getTitle() {
    return (
      <div className="newsHeader-title">
        <a className="newsHeader-textLink" href="https://news.ycombinator.com">Hacker News</a>
      </div>
    );
  }

}

export default NewsHeader;
