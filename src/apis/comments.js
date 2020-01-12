import youtube, { defaultParams } from "./youtube";

class Comments {
  async getCommentsByVideoId(videoId, authResponse) {
    try {
      var params = {
        ...defaultParams,
        part: "snippet,replies",
        order: "relevance",
        videoId
      };

      let headers = {};
      if (Object.values(authResponse).length > 0) {
        headers = {
          Authorization: `${authResponse.token_type} ${authResponse.access_token}`,
          Accept: "application/json"
        };
      }

      const response = await youtube.get("/commentThreads", {
        params,
        headers
      });
      this.comments = response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async postNewComment(video, textOriginal, authResponse) {
    try {
      var params = {
        snippet: {
          videoId: video.id.videoId,
          topLevelComment: {
            snippet: {
              textOriginal
            }
          },
          channelId: video.snippet.channelId
        }
      };
      const response = await youtube.post(
        `/commentThreads?part=${defaultParams.part}&key=${defaultParams.key}`,
        params,
        {
          headers: {
            Authorization: `${authResponse.token_type} ${authResponse.access_token}`,
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      );
      this.postComment = response.data;
      console.log(this.postComment);
    } catch (error) {
      console.log(error);
    }
  }
}

export default Comments;
