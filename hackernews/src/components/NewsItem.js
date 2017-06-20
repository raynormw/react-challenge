import React from 'react';

class NewsItem extends React.Component {
  render() {
    return (
      <div className="newsItem">
        <a className="newsItem-titleLink" href={this.props.url}>{this.props.title}</a>
      </div>
    );
  }
}

export default NewsItem;
