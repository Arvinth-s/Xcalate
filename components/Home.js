import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { Link } from '../routes';

class Home extends Component {
    render() {
        return(
            <Link route="/home/feed">
            <a className="item">
            <Button animated inverted color='orange'>
                <Button.Content visible>Link to feed dashboard</Button.Content>
                    <Button.Content hidden>
                        Arvinth Mutaa Paiya
                </Button.Content>
            </Button>
            </a>
            </Link>
        );
    }
}

export default Home;