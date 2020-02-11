import React, { Component } from "react";
import commentAPI from "../../apis/comments";

import { Media, Form, Level } from "react-bulma-components";

// Components
import { IZButton } from "../Buttons";
import { SpinnerCircle } from "../Loading";

import { CommentMediaWrapper, CommentWriterTextArea } from "./styled";

class CommentWriterMain extends Component {
  constructor() {
    super();
    this.state = {
      textInput: "",
      commentAPI: new commentAPI(),
      isOpenButtons: false
    };
  }

  changeTextInput = e => {
    const ele = e.target;
    this.setState({ textInput: ele.value });

    ele.style.height = "5px";
    ele.style.height = ele.scrollHeight + "px";
  };

  postNewComment = async () => {
    const { commentAPI, textInput } = this.state;
    const { selectedVideo, authResponse } = this.props;
    this.props.startLoading();
    await commentAPI.postNewComment(selectedVideo, textInput, authResponse);
    await this.props.fetchComments(selectedVideo.id);
    this.props.endLoading();
    this.setState({ isOpenButtons: false });
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
                <CommentWriterTextArea
                  rows={1}
                  placeholder="Add a public comment..."
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

  state = {
    isLoading: false
  };

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
      <div>
        {this.state.isLoading ? (
          <SpinnerCircle size={30} />
        ) : (
          <CommentWriterMain
            startLoading={this.startLoading}
            endLoading={this.endLoading}
            {...this.props}
          />
        )}
      </div>
    );
  }
}

export default CommentWriter;
