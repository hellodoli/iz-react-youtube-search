import React from "react";

import { connect } from "react-redux";

// Components
import { SpinnerCircle } from "../../components/Loading";
import { VideoList } from "../../components/Videos";
import Filter from "../../components/Filter";

function VideoSearchResult(props) {
  const { videos, isLoading } = props;

  function renderFilter() {
    if (videos.length) return <Filter />;
    return null;
  }

  function renderVideoList() {
    if (isLoading) return <SpinnerCircle size={40} />;
    if (videos.length > 0) return <VideoList layout={0} />;
    return null;
  }

  return (
    <div className="iz-video-search">
      {/* render Filter */}
      {renderFilter()}
      {/* render Video List */}
      {renderVideoList()}
    </div>
  );
}

const mapStateToProps = state => ({
  isLoading: state.searchReducer.isLoadingStatus,
  videos: Object.values(state.videosReducer.videos[1])
});

export default connect(mapStateToProps)(VideoSearchResult);
