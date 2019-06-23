import youtube, { KEY } from './youtube';

class Videos {

    async searchVideo(search) {
        try {
            const res = await youtube.get('/search',{
                params: {
                    part: 'snippet',
                    maxResults: 5,
                    key: KEY,
                    q: search
                }
            });
            this.videos = res.data;    
        } catch (error) {
            console.log(error);
        }
        
    }
}

export default Videos;