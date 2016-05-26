import React from 'react';
import {connect} from 'react-redux';
import SideBar from '../../components/SideBar';
import {searchLarge} from '../../modules/large';

const LargePage = ({content, searchLarge}) => {
  const menu =[
    { title: "Search",
      link: "/large"
    },
    { title: "New",
      link: "/large/new"
    },
    { title: "Other search",
      link: "/large/search",
      action: searchLarge
    }
  ];

  return <div>
    <div className="Sidebar">
      <SideBar menu={menu} />
    </div>
    <div className="Content" style={{'paddingLeft': "250px"}}>
      {content || <p />}
    </div>
  </div>;
};

const mapDispatchToProps = {
  searchLarge
};

export default connect(null, mapDispatchToProps)(LargePage);
