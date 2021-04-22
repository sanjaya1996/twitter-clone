import React, { useEffect, useMemo } from 'react';
import { RouteComponentProps } from 'react-router';
import Tabs from '../../components/tabs/Tabs';

interface RouteParams {
  tabname: 'users' | 'posts';
}

const SearchPage: React.FC<RouteComponentProps<RouteParams>> = ({
  match,
  history,
}) => {
  const selectedTab = match.params.tabname;
  const url = match.url;

  const TABS = useMemo(
    () => [
      {
        id: 0,
        name: 'Users',
        link: `/search/users`,
        active: selectedTab === 'users',
      },
      {
        id: 1,
        name: 'Posts',
        link: `/search/posts`,
        active: selectedTab === 'posts',
      },
    ],
    [selectedTab]
  );

  useEffect(() => {
    if (TABS.some((t) => t.link !== url)) {
      history.push(TABS[0].link);
    }
  }, [TABS, selectedTab, history, url]);

  const tabSelectHandler = (id: number) => {
    history.push(TABS[id].link);
  };

  return (
    <>
      <Tabs data={TABS} handleSelect={tabSelectHandler} />
    </>
  );
};

export default SearchPage;
