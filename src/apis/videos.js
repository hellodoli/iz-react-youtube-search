import youtube, { KEY } from './youtube';

const defaultParams = {
    part: 'snippet',
    maxResults: 10,
    key: KEY
};

class Videos {

    async searchVideo(search,nextPageToken= null) {
        try {

            var params = {
                ...defaultParams,
                type: 'video',
                q: search
            };

            if(nextPageToken !== null) {
                params = {
                    ...params,
                    pageToken: nextPageToken
                }
            }
               
            const res = await youtube.get('/search',{ params });
            this.videos = res.data;
        } catch (error) {
            alert('Lỗi kết nối, có thể API đã đạt giới hạn request. Bật console lên xem lỗi(403).');
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
            console.log(this.videos);
        } catch (error) {
            alert('Lỗi kết nối, có thể API đã đạt giới hạn request. Bật console lên xem lỗi(403).');
            console.log(error);
        }
    }
}

export default Videos;