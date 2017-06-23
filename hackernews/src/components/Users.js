import React from 'react';
import $ from 'jquery';

import './Users.css';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentWillMount() {
    this._fetchUser();
  }

  _fetchUser() {
    let id = this.props.match.params.id
    console.log(id);
    let self = this;
    $.ajax({
      url: 'https://hacker-news.firebaseio.com/v0/user/' + id + '.json',
      dataType: 'json'
    }).then(function (user) {
      self.setState({ user });
    });
  }

  render() {
    if (this.state.user) {
      let about = "Nothing to show";
      if (this.state.user.about) {
        about = this.state.user.about;
        console.log(about);
      }

      return (
        <div className="users">
          <p>User: {this.state.user.id}</p>
          <p>Created: {this.state.user.created}</p>
          <p>Karma: {this.state.user.karma}</p>
          <p>About: {about}</p>
        </div>
      );
    }
  }

}

export default Users;
