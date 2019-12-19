import React, { Component } from 'react';
import commentAPI from '../../apis/comments';

import {
  Media,
  Form,
  Level
} from 'react-bulma-components';

import { IZButton } from '../Buttons';

import {
  CommentWriterWrapper,
  CommentMediaWrapper
} from './styled';

class CommentWriter extends Component {
  constructor () {
    super();
    this.state = {
      textInput: '',
      commentAPI: new commentAPI(),
      postComment: null
    };
  }

  changeTextInput = (e) => {
    this.setState({ textInput: e.target.value });
  }

  postNewComment = async () => {
    const { commentAPI, textInput } = this.state;
    const { selectedVideo, authResponse } = this.props;
    await commentAPI.postNewComment(selectedVideo, textInput, authResponse);
  }

  testPostComment = () => {
    return window.gapi.client.youtube.commentThreads.insert({
      "part": "snippet",
      "resource": {
        "snippet": {
          "channelId": "UCQnw0PycCRlSsT8fQlTDyBA",
          "videoId": "v1iiCTN1cCM",
          "topLevelComment": {
            "snippet": {
              "textOriginal": "good song ^^"
            }
          }
        }
      }
    })
    .then(function(response) {
      // Handle the results here (response.result has the parsed body).
      console.log("Response", response);
    },
    function(err) { console.error("Execute error", err); });
  }

  submitComment = (e) => {
    e.preventDefault();
    this.postNewComment();
    // this.testPostComment();
  }

  render () {
    const {
      userProfile: {
        Paa: imageAvataSrc
      }
    } = this.props;
    const { textInput } = this.state;
    return (
      <CommentWriterWrapper>
        <CommentMediaWrapper>
          <Media.Item position="left">
            <figure className="image is-48x48">
              <img src={imageAvataSrc} className="is-rounded" alt="google-avatar" />
            </figure>
          </Media.Item>
  
          <Media.Item position="center">
            <form onSubmit={this.submitComment}>
              <Form.Field>
                <Form.Control>
                  <Form.Textarea 
                    placeholder="Add a public comment..."
                    rows={2}
                    value={textInput}
                    onChange={this.changeTextInput}
                  />
                </Form.Control>
              </Form.Field>
  
              <Level>
                <Level.Side align="left"></Level.Side>
                <Level.Side align="right">
                  <Level.Item>
                    <IZButton color="transparent">Cancel</IZButton>
                  </Level.Item>
                  <Level.Item>
                    <IZButton
                      color="primary"
                      isDisabled={textInput.trim() !== '' ? false : true}
                    >
                      Submit
                    </IZButton>
                  </Level.Item>
                </Level.Side>
              </Level>
            </form>
          </Media.Item>
        </CommentMediaWrapper>
      </CommentWriterWrapper>
    );
  }

}

export default CommentWriter;
