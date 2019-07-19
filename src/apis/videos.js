import youtube, { KEY } from './youtube';

const defaultParams = {
    part: 'snippet',
    maxResults: 5,
    key: KEY
};

class Videos {

    async searchVideo(search) {
        try {
            const res = await youtube.get('/search',{
                params: {
                    ...defaultParams,
                    q: search
                }
            });
            this.videos = res.data;
        } catch (error) {
            console.log(error);
        }
    }

    async customSearchVideo(search, filterParams) {
        try {
            const res = await youtube.get('/search',{
                params: {
                    ...defaultParams,
                    q: search,
                    ...filterParams
                }
            });
            this.videos = res.data;
        } catch (error) {
            console.log(error);
        }
    }
}

export default Videos;