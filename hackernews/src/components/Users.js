import React from 'react';
import $ from 'jquery';
import moment from 'moment';

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
      self.setState({user});
    });
  }

  render() {
    let about = "Nothing to show";
    if (this.state.user.about) {
      about = this.state.user.about
    }
    if (this.state.user) {
      return (
        <div className="users">
          <p>User: {this.state.user.id}</p>
          <p>Created: {this.state.user.created}</p>
          <p>Karma: {this.state.user.karma}</p>
          <td>About: {about}</td>
        </div>
      );
    }
  }

}

export default Users;
