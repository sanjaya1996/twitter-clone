import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileImage from '../../components/image/ProfileImage';
import TitleBar from '../../components/titleBar/TitleBar';
import { UserType } from '../../store/actions/user/userActionTypes';
import { RootStore } from '../../store/store';

import Tabs from '../../components/tabs/Tabs';
import Post from '../../components/post/Post';
import * as postActions from '../../store/actions/post/postActions';
import * as userActions from '../../store/actions/user/userActions';

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

  const userLoginState = useSelector(
    (state: RootStore) => state.loggedInUserInfo
  );
  const { user: loggedInUser } = userLoginState;

  const postListState = useSelector((state: RootStore) => state.postList);
  const { posts, loading, error } = postListState;

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
  }, [dispatch, _id, activeTabId]);

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
    dispatch(userActions.followUser(_id));
  };

  const tabSelectHandler = (id: number) => {
    setActiveTabId(id);
  };

  return (
    <>
      <TitleBar title={firstName + ' ' + lastName} />
      <div className='profileHeaderContainer'>
        <div className='coverPhotoContainer'>
          <ProfileImage uri={profilePic} />
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
            <Link to={`/profile/${userName}/following`}>
              <span className='value'>{followingCount}</span>
              <span>Following</span>
            </Link>
            <Link to={`/profile/${userName}/following`}>
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
        posts.map((post) => (
          <Post key={post._id} post={post} userId={loggedInUser!._id} />
        ))
      )}
    </>
  );
};

export default ProfilePage;
