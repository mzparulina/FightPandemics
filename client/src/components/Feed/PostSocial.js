// Core
import React, { useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";

// Local
// import { FeedContext } from "pages/Feed.js";

// Icons
import SvgIcon from "../Icon/SvgIcon";
import heart from "assets/icons/heart.svg";
import heartGray from "assets/icons/heart-gray.svg";
import comment from "assets/icons/comment.svg";
import commentGray from "assets/icons/comment-gray.svg";
import share from "assets/icons/share.svg";
import shareGray from "assets/icons/share-gray.svg";
import { LOGIN } from "templates/RouteWithSubRoutes";

const PostSocial = ({
  handlePostLike,
  isAuthenticated,
  url,
  liked,
  shared,
  showComments,
  numLikes,
  numComments,
  numShares,
  onCopyLink,
  postpage,
  setShowComments,
  id,
}) => {
  useEffect(() => {
    const likePost = sessionStorage.getItem("likePost");

    if (id === likePost) {
      if (likePost) {
        handlePostLike(likePost, liked);
      }
    }
  }, [id, liked, handlePostLike]);

  const renderLikeIcon = () => {
    return liked ? (
      <SvgIcon src={heart} className="social-icon-svg" />
    ) : (
      <SvgIcon src={heartGray} className="social-icon-svg" />
    );
  };

  const renderCommentIcon = () => {
    return showComments || numComments > 0 ? (
      <SvgIcon src={comment} className="social-icon-svg" />
    ) : (
      <SvgIcon src={commentGray} className="social-icon-svg" />
    );
  };

  const renderShareIcon = () => {
    return shared ? (
      <SvgIcon src={share} className="social-icon-svg" />
    ) : (
      <SvgIcon src={shareGray} className="social-icon-svg" />
    );
  };

  const renderPostSocialIcons = (
    <>
      {postpage ? (
        <div className="social-icon">
          {renderLikeIcon()}
          <span className="total-number">{numLikes}</span>
          <span className="social-text">Like</span>
        </div>
      ) : (
        <div className="social-icon" onClick={() => handlePostLike(id, liked)}>
          {renderLikeIcon()}
          <span className="total-number">{numLikes}</span>
        </div>
      )}
      <span></span>
      {postpage ? (
        <div className="social-icon" onClick={setShowComments}>
          {renderCommentIcon()}
          <span className="social-text">Comment</span>
        </div>
      ) : (
        <>
          {isAuthenticated ? (
            <Link
              to={{
                pathname: `/post/${id}`,
                state: {
                  postId: id,
                  comments: true,
                },
              }}
            >
              <div className="social-icon" onClick={setShowComments}>
                {renderCommentIcon()}
                <div className="total-number">{numComments}</div>
              </div>
            </Link>
          ) : (
            <Link to={{ pathname: LOGIN }}>
              <div className="social-icon">
                {renderCommentIcon()}
                <div className="total-number">{numComments}</div>
              </div>
            </Link>
          )}
        </>
      )}

      <span></span>
      <div className="social-icon">
        {!postpage ? (
          <CopyToClipboard
            text={window.location.href.replace(
              window.location.pathname,
              `/post/${id}`,
            )}
            onCopy={onCopyLink}
          >
            <span>
              {renderShareIcon()}
              <span className="social-text">Share</span>
            </span>
          </CopyToClipboard>
        ) : (
          <CopyToClipboard text={url} onCopy={onCopyLink}>
            <span>
              {renderShareIcon()}
              <span className="social-text">Share</span>
            </span>
          </CopyToClipboard>
        )}
      </div>
    </>
  );

  return <div className="social-icons">{renderPostSocialIcons}</div>;
};

export default PostSocial;
