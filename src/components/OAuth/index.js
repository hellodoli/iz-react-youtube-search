import React, { Component } from 'react';

import { signIn, signOut } from '../../actions/oauth';

import { connect } from 'react-redux';

import { IZButton } from '../Buttons';

import UserInfo from './UserInfo';

class OAuth extends Component {

  componentDidMount () {
    window.gapi.load('client:auth2', () => {
      window.gapi.auth2.init({
        client_id: '272935394212-0tpk33a8gigesb0mojmj0eci5oiut43b.apps.googleusercontent.com',
        scope: 'email'
      })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
          // console.log(this.auth.currentUser.get().getBasicProfile()) // user
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  }

  singInOrSignOut = () => {
    if (this.props.isSignedIn) {
      this.auth.signOut();
    } else {
      this.auth.signIn();
    }
  }

  renderUserInfo = () => {
    if (this.props.isSignedIn) {
      return <UserInfo />;
    } else {
      return (
        <IZButton color="secondary" onClick={this.singInOrSignOut}>Login</IZButton>
      );
    }
  }

  render () {
    return (
      <div className="iz-oauth-login">
        { this.renderUserInfo() }
      </div>
    );
  }
}

const mapstateToProps = state => ({
  isSignedIn: state.oauthReducer.isSignedIn,
  userId: state.oauthReducer.userId
});

export default connect(mapstateToProps, {
  signIn,
  signOut
})(OAuth);