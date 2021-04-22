import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import TitleBar from '../../components/titleBar/TitleBar';
import { UserType } from '../../store/actions/user/userActionTypes';
import { RootStore } from '../../store/store';

import Tabs from '../../components/tabs/Tabs';
import Post from '../../components/post/Post';
import * as postActions from '../../store/actions/post/postActions';
import * as userActions from '../../store/actions/user/userActions';
import ProfilePageProfile from '../../components/image/ProfilePageProfile';
import CoverPhoto from '../../components/image/CoverPhoto';

interface ProfileProps {
  userInfo: UserType;
}

const ProfilePage: React.FC<ProfileProps> = ({ userInfo }) => {
  const [activeTabId, setActiveTabId] = useState(0);

  const {
    _id,
    firstName,
    lastName,
    userName,
    profilePic,
    followers,
    following,
  } = userInfo;

  const dispatch = useDispatch();

  const state = useSelector((state: RootStore) => state);

  const loggedInUserState = state.loggedInUserInfo;
  const { user: loggedInUser } = loggedInUserState;

  const postListState = state.postList;
  const { posts, loading, error } = postListState;

  const postUpdateState = state.postUpdate;
  const { success } = postUpdateState;

  const pinnedPost = posts.find((p) => p.pinned === true);

  const isFollowing =
    loggedInUser?.following && loggedInUser.following.includes(_id);
  const followBtnText = isFollowing ? 'Following' : 'Follow';
  const followBtnClass = isFollowing
    ? 'followButton following'
    : 'followButton';
  const followingCount = following.length || 0;
  const followersCount = followers.length || 0;

  useEffect(() => {
    if (activeTabId === 0) {
      dispatch(postActions.listPosts(_id));
    } else if (activeTabId === 1) {
      dispatch(postActions.listPosts(_id, true));
    }
  }, [dispatch, _id, activeTabId, success]);

  const TABS = [
    {
      id: 0,
      name: 'Posts',
      link: `/profile/${userName}`,
      active: activeTabId === 0,
    },
    {
      id: 1,
      name: 'Replies',
      link: `/profile/${userName}/replies`,
      active: activeTabId === 1,
    },
  ];

  const followUserHandler = () => {
    dispatch(userActions.followUser(_id, true));
  };

  const tabSelectHandler = (id: number) => {
    setActiveTabId(id);
  };

  return (
    <>
      <TitleBar title={firstName + ' ' + lastName} />
      <div className='profileHeaderContainer'>
        <div className='coverPhotoSection'>
          <CoverPhoto uri={''} profileUser={userInfo} />
          <ProfilePageProfile uri={profilePic} profileUser={userInfo} />
        </div>
        <div className='profileButtonsContainer'>
          {loggedInUser?._id !== _id && (
            <>
              <button className='profileButton'>
                <i className='fas fa-envelope'></i>
              </button>
              <button onClick={followUserHandler} className={followBtnClass}>
                {followBtnText}
              </button>
            </>
          )}
        </div>
        <div className='userDetailsContainer'>
          <span className='displayName'>{firstName + ' ' + lastName}</span>
          <span className='username'>@{userName}</span>
          <span className='description'></span>
          <div className='followersContainer'>
            <Link to={`/profile/${_id}/following`}>
              <span className='value'>{followingCount}</span>
              <span>Following</span>
            </Link>
            <Link to={`/profile/${_id}/followers`}>
              <span className='value'>{followersCount}</span>
              <span>Followers</span>
            </Link>
          </div>
        </div>
      </div>
      <Tabs data={TABS} handleSelect={tabSelectHandler} />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : posts.length === 0 ? (
        <p>Nothing to Show</p>
      ) : (
        <>
          {activeTabId === 0 && pinnedPost && (
            <div className='pinnedPostContainer'>
              <Post post={pinnedPost} userId={loggedInUser!._id} />
            </div>
          )}
          {posts.map((post) => (
            <Post key={post._id} post={post} userId={loggedInUser!._id} />
          ))}
        </>
      )}
    </>
  );
};

export default ProfilePage;
