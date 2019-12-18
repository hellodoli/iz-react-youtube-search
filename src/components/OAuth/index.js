import React, { Component } from 'react';

import { signIn, signOut } from '../../actions/oauth';

import { connect } from 'react-redux';

import { IZButton } from '../Buttons';
import UserInfo from './UserInfo';

class OAuth extends Component {

  constructor () {
    super();
    this.state = {

    }
  }

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
          console.log('user login: ', this.auth.isSignedIn.get());
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      const user = this.auth.currentUser.get();
      const userInfo = {
        id: user.getId(),
        profile: user.getBasicProfile(),
        authResponse: user.getAuthResponse()
      };
      this.props.signIn(userInfo);
    } else {
      this.props.signOut();
    }
  }

  singInOrSignOut = () => {
    if (this.props.isSignedIn) {
      this.auth.signOut();
    } else {
      this.auth
        .signIn({ scope: "https://www.googleapis.com/auth/youtube.force-ssl" })
        .then((res) => {
          console.log('Sign-in successful');
          console.log(res);
        });
    }
  }

  renderUserInfo = () => {
    const { isSignedIn } = this.props;
    if (isSignedIn) {
      return <UserInfo profile={this.props.userProfile} singInOrSignOut={this.singInOrSignOut} />;
    } else {
      if (isSignedIn === null) {
        return null;
      }
      return <IZButton color="secondary" onClick={this.singInOrSignOut}>Login</IZButton>;
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
  userId: state.oauthReducer.userId,
  userProfile: state.oauthReducer.profile
});

export default connect(mapstateToProps, {
  signIn,
  signOut
})(OAuth);
