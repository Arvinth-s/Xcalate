import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link } from '../routes';

export default () => {
  return (
    <Menu inverted style={{ marginTop: '10px' }}>
      <Link route="/home/feed">
        <a className="item"><strong>CROWDLY</strong></a>
      </Link>

      <Menu.Menu position="right">
        
        <Link route="/home/feed">
          <a className="item"><Icon  name='newspaper' />News Market</a>
        </Link>

        <Link route="/home/news">
          <a className="item"> <Icon  name='check circle' />Verified News</a>
        </Link>


        <Link route="/home/newpost">
          <a className="item"><Icon  name='plus circle' />New Post</a>
        </Link>

        <Link route="/">
          <a className="item"><Icon  name='lock' />Log out</a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};
