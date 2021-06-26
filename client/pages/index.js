import React, { Component } from 'react';
import styles from '../styles/Index.module.css';
import { Image, Grid, Button } from 'semantic-ui-react';
import { Link, Router } from '../routes';
import "semantic-ui-css/semantic.min.css";

//import web3, etc

var colors = {
  primary: "#598FFF",
  secondary: "#D10311",
  text: "#f1f3f4",
  backgroundColor: 'black',
};

class Home extends Component {

  static async getInitialProps() {
    //get address from metamask
    var {address} = 'null'
    
    //comment underneath line
    address = '0x9876A5bc27ff511bF5dA8f58c8F93281E5BD1f21'
    return { address }
  }

  handleSignIn = () => {
    //check for account subscription
    //if subscribed, go to /home/market, else go to /subscribe
    
    if(true){ //insert above condition
      Router.pushRoute(`/home/${this.props.address}/market`);
    }else{
      Router.pushRoute(`/subscribe`);
    }
  }

 render(){
  return (
    <body>
      <div
        class="ui inverted segment"
        style={{
          height: "40px",
          padding: "0px",
          borderRadius: "0px",
          backgroundColor: colors.backgroundColor,
        }}
      >
        <div
          class="ui inverted secondary pointing menu"
          style={{ height: "20px", paddingLeft: "20px", alignItems: 'center', }}
        >
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/xcalate-957d0.appspot.com/o/xlogo.jpg?alt=media&token=2322a456-c788-43df-9c1d-cb1d44e6b9b6"
            size="mini"
            wrapped
          />
          {/* <a style={{color: colors.text, fontWeight: "bold"}}>Xcalate</a> */}
        </div>
      </div>
      <div className={styles.landingScreen} style={{ margin: 0 }}>
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column className={styles.content}>
              <h1 style={{ color: colors.primary }}>XCALATE </h1>
              <h3 style={{ color: colors.text }}>
                A place to read, write, grow and help others grow.
              </h3>
              <Link route={`/home/${this.props.address}/market`}>
              <Button onClick={this.handleSignIn}
                style={{
                  marginTop: "50px",
                }}
                inverted color='red'
              >
                Sign In
              </Button>
              </Link>
              <Link route='/subscribe'>
              <Button
                style={{
                  marginTop: "50px",
                  marginLeft: "20px",
                }}
                inverted color='red'
              >
                Subscribe
              </Button>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </body>
  );
}
}

export default Home;