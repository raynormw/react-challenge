import React from 'react';
import URL from 'url';
import moment from 'moment';

import './Newsitem.css';

class NewsItem extends React.Component {
  render() {
    return (
      <div className="newsItem">
        {this._getTitle()}
      </div>
    );
  }

  _getTitle() {
    return (
      <div className="newsItem-title">
        <a className="newsItem-titleLink" href={this.props.url}>{this.props.title}</a>
        {this._getDomain()}
        {this._getSubtext()}
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
        {this.props.score} points by <a href={'https://news.ycombinator.com/user?id=' + this.props.by}>{this.props.by}</a> {moment.utc(this.props.time * 1000).fromNow()} | {this._getCommentLink()}
      </div>
    );
  }

  _getCommentLink() {
    var commentText = 'discuss';
    if (this.props.kids && this.props.kids.length) {
      // This only counts top-level comments.
      // To get the full count, recursively get item details for this news item.
      commentText = this.props.kids.length + ' comments';
    }

    return (
      <a href={'https://news.ycombinator.com/item?id=' + this.props.id}>{commentText}</a>
    );
  }

}

export default NewsItem;
