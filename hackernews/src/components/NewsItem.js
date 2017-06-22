import React from 'react';
import URL from 'url';
import moment from 'moment';
import { Link } from 'react-router-dom';

import './Newsitem.css';

class NewsItem extends React.Component {
  render() {
    return (
      <div className="newsItem">
        {this._getRank()}
        {this._getVote()}
        <div className="newsItem-itemText">
          {this._getTitle()}
          {this._getSubtext()}
        </div>
      </div>
    );
  }

  _getTitle() {
    return (
      <div className="newsItem-title">
        <a className="newsItem-titleLink" href={this.props.url}>{this.props.title}</a>
        {this._getDomain()}
      </div>
    );
  }

  _getDomain() {
    if (this.props.url) {
      const domain = URL.parse(this.props.url).hostname;
      return (
        <span className="newsItem-domain">
          ({domain})
        </span>);
    }
  }

  _getSubtext() {
    return (
      <div className="newsItem-subtext">
        {this.props.score} points by <Link to={'/user/' + this.props.by}>{this.props.by}</Link> {moment.utc(this.props.time * 1000).fromNow()} | {this._getCommentLink()}
      </div>
    );
  }

  _getCommentLink() {
    let commentText = 'discuss';
    if (this.props.kids && this.props.kids.length) {
      commentText = this.props.kids.length + ' comments';
    }

    return (
      <a href={'https://news.ycombinator.com/item?id=' + this.props.id}>{commentText}</a>
    );
  }

  _getRank() {
    return (
      <div className="newsItem-rank">
        {this.props.rank}.
      </div>
    );
  }

  _getVote() {
    return (
      <div className="newsItem-vote">
        <a href={'https://news.ycombinator.com/vote?for=' + this.props.id + '&dir=up&whence=news'}>
          <img src="/grayarrow2x.gif" alt="arrow" width="10"/>
        </a>
      </div>
    );
  }

}

export default NewsItem;
