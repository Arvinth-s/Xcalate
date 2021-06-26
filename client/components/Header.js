import React from 'react';
import { Menu, Icon, Image } from 'semantic-ui-react';
import { Link } from '../routes';

const Header = () => {
  return (
    <Menu inverted pointing style={{ backgroundColor: '#070618', alignItems: 'center', }}>
    
    <Image src='https://firebasestorage.googleapis.com/v0/b/xcalate-957d0.appspot.com/o/xlogo.jpg?alt=media&token=2322a456-c788-43df-9c1d-cb1d44e6b9b6' size='tiny' wrapped />
     
      <Link route="/home/market">
        <a className="item"><strong>XCALATE</strong></a>
      </Link>

      <Menu.Menu position="right">

        <Link route="/home/portfolio">
          <a className="item"> <Icon  name='list layout' />Portfolio</a>
        </Link>


        <Link route="/home/organization">
          <a className="item"><Icon  name='building outline' />My Organization</a>
        </Link>

        <Link route="/">
          <a className="item"><Icon  name='lock' />Log out</a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;