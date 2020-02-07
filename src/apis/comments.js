import youtube, { defaultParams } from "./youtube";

class Comments {
  constructor() {
    this.comments = [];
    this.nextPageToken = [];
  }

  async getCommentsByVideoId(
    videoId,
    authResponse,
    order = "relevance",
    nextPageToken = null
  ) {
    try {
      let params = {
        ...defaultParams,
        part: "snippet,replies",
        order,
        videoId
      };

      if (nextPageToken !== null) {
        params = { ...params, pageToken: nextPageToken };
      }

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

      const data = response.data;
      if (data && data.items.length > 0) {
        this.comments = data.items;
        this.nextPageToken = data.nextPageToken;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async postNewComment(video, textOriginal, authResponse) {
    try {
      var params = {
        snippet: {
          videoId: video.id,
          topLevelComment: {
            snippet: {
              textOriginal
            }
          },
          channelId: video.channelId
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
