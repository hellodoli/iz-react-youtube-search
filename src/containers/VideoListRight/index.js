import React from "react";

import { connect } from "react-redux";

// Components
import { VideoList } from "../../components/Videos";

function VideoListRight(props) {
  const { videos } = props;
  if (videos.length > 0) return <VideoList layout={1} />;
  return null;
}

const mapStateToProps = state => ({
  videos: Object.values(state.videosReducer.videos[1])
});

export default connect(mapStateToProps)(VideoListRight);
