import React from 'react';
import { Link } from 'react-router-dom';

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
        <Link to={"/"}><img src="y18.gif" alt="logo"/></Link>
      </div>
    );
  }

  _getTitle() {
    return (
      <div className="newsHeader-title">
        <Link to={"/"} className="newsHeader-textLink">Hacker News</Link>
      </div>
    );
  }

}

export default NewsHeader;
