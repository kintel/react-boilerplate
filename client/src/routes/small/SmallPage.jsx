import React from 'react';
import {connect} from 'react-redux';
import SideBar from '../../components/SideBar';
import {searchSmall} from '../../modules/small';

const SmallPage = ({content, searchSmall}) => {
  const menu =[
    { title: "Search",
      link: "/small"
    },
    { title: "New",
      link: "/small/new"
    },
    { title: "Other",
      link: "/small/search",
      action: searchSmall
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
  searchSmall
};

export default connect(null, mapDispatchToProps)(SmallPage);
