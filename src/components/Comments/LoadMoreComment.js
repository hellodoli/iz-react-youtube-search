import React from 'react'

import IZButton from '../Buttons'

function LoadMoreCommentButton({
  comments,
  fetchMoreComment,
  isLoadingMoreComment,
}) {
  return (
    <div className="has-text-centered">
      {comments.length > 0 ? (
        <IZButton
          onClick={fetchMoreComment}
          isLoading={isLoadingMoreComment}
          isDisabled={isLoadingMoreComment}
        >
          Load more comment
        </IZButton>
      ) : null}
    </div>
  )
}

export default LoadMoreCommentButton
