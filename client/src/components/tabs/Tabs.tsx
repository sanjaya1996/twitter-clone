import React from 'react';
import { Link } from 'react-router-dom';

import './tabs.scss';

interface TabData {
  id: number;
  name: string;
  link: string;
  active: boolean;
}

interface TabsProps {
  data: TabData[];
  handleSelect: (id: number) => void;
}

const Tabs: React.FC<TabsProps> = ({ data, handleSelect }) => {
  return (
    <div className='tabsContainer'>
      {data.map((tab, index) => (
        <Link
          key={index}
          to={'#'}
          onClick={() => handleSelect(tab.id)}
          className={`tab ${tab.active && 'active'}`}
        >
          <span>{tab.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default Tabs;
