import youtube, { defaultParams } from './youtube';

class Comments {
  async getCommentsByVideoId (videoId) {
    try {
      var params = { 
        ...defaultParams,
        part: 'snippet,replies',
        order: 'relevance',
        videoId
      };
      const response = await youtube.get('/commentThreads', { params });
      this.comments = response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async postNewComment (videoId, commentText, authResponse) {
    try {
      var params = {
        snippet: {
          videoId,
          topLevelComment: {
            snippet: {
              textOriginal: commentText
            }
          }
        }
      };
      // ?part=${defaultParams.part}&key=${defaultParams.key}
      const response = await youtube.post(`/commentThreads?part=${defaultParams.part}&key=${defaultParams.key}`,
        {
          'resource': {
            'snippet': {
              'videoId': videoId,
              'topLevelComment': {
                'snippet': {
                  'textOriginal': commentText
                }
              }
            }
          }
        },
        {
          headers: {
            'Accept': 'application/json',
            'Authorization': `${authResponse.token_type} ${authResponse.access_token}`
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
