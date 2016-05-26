import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {Nav, NavItem} from 'react-bootstrap';

export default function SideBar({menu}) {
  return <div style={{float: "left"}}>
    <Nav>
      {menu.map(menuentry => <LinkContainer disabled={menuentry.disabled} to={menuentry.link} onClick={menuentry.action}><NavItem>{menuentry.title}</NavItem></LinkContainer>)}
    </Nav>
  </div>;
}
