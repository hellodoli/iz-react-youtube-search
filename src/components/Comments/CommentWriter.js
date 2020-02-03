import React, { Component } from "react";
import commentAPI from "../../apis/comments";

import { Media, Form, Level } from "react-bulma-components";

import { IZButton } from "../Buttons";
import { SpinnerCircle } from "../Loading";

import { CommentWriterWrapper, CommentMediaWrapper } from "./styled";

class CommentWriterMain extends Component {
  constructor() {
    super();
    this.state = {
      textInput: "",
      commentAPI: new commentAPI(),
      postComment: null,
      isOpenButtons: false
    };
  }

  changeTextInput = e => {
    this.setState({ textInput: e.target.value });
  };

  postNewComment = async () => {
    const { commentAPI, textInput } = this.state;
    const { selectedVideo, authResponse } = this.props;
    //this.props.startLoading();
    console.log(selectedVideo);
    await commentAPI.postNewComment(selectedVideo, textInput, authResponse);
    //await this.props.fetchComments(selectedVideo.id);
    //this.props.endLoading();
    this.setState({ isOpenButtons: false });
  };

  // just test post Comment
  testPostComment = () => {
    return window.gapi.client.youtube.commentThreads
      .insert({
        part: "snippet",
        resource: {
          snippet: {
            channelId: "UCQnw0PycCRlSsT8fQlTDyBA",
            videoId: "v1iiCTN1cCM",
            topLevelComment: {
              snippet: {
                textOriginal: "good song ^^"
              }
            }
          }
        }
      })
      .then(
        function(response) {
          // Handle the results here (response.result has the parsed body).
          console.log("Response", response);
        },
        function(err) {
          console.error("Execute error", err);
        }
      );
  };

  submitComment = e => {
    e.preventDefault();
    console.log("your comment start submit");
    this.postNewComment();
  };

  showButtonsComment = () => {
    if (!this.state.isOpenButtons) {
      this.setState({ isOpenButtons: true });
    }
  };

  hideButtonsComment = () => {
    this.setState({ isOpenButtons: false });
  };

  render() {
    const {
      userProfile: { Paa: imageAvataSrc }
    } = this.props;
    const { textInput, isOpenButtons } = this.state;

    return (
      <CommentMediaWrapper>
        <Media.Item position="left">
          <figure className="image is-48x48">
            <img
              src={imageAvataSrc}
              className="is-rounded"
              alt="google-avatar"
            />
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
                  onFocus={this.showButtonsComment}
                />
              </Form.Control>
            </Form.Field>

            <Level>
              <Level.Side align="left"></Level.Side>
              {isOpenButtons && (
                <Level.Side align="right">
                  <Level.Item>
                    <IZButton
                      color="transparent"
                      onClick={this.hideButtonsComment}
                    >
                      Cancel
                    </IZButton>
                  </Level.Item>
                  <Level.Item>
                    <IZButton
                      color="primary"
                      isDisabled={textInput.trim() === "" ? true : false}
                    >
                      Submit
                    </IZButton>
                  </Level.Item>
                </Level.Side>
              )}
            </Level>
          </form>
        </Media.Item>
      </CommentMediaWrapper>
    );
  }
}

class CommentWriter extends Component {
  _isMounted = false;

  constructor() {
    super();
    this.state = {
      isLoading: false
    };
  }

  startLoading = () => {
    this._isMounted = true;
    if (this._isMounted) {
      this.setState({ isLoading: true });
    }
  };

  endLoading = () => {
    this._isMounted = true;
    if (this._isMounted) {
      this.setState({ isLoading: false });
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <CommentWriterWrapper>
        {this.state.isLoading ? (
          <SpinnerCircle size={30} />
        ) : (
          <CommentWriterMain
            startLoading={this.startLoading}
            endLoading={this.endLoading}
            {...this.props}
          />
        )}
      </CommentWriterWrapper>
    );
  }
}

export default CommentWriter;
