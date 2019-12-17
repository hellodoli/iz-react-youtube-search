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
}

export default Comments;
