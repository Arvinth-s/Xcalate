import styles from '../styles/Index.module.css';
import Layout from '../components/Layout';
import { Image, Grid, Button } from 'semantic-ui-react';
import "semantic-ui-css/semantic.min.css";



export default function Home() {

  var colors = {
    primary: "#00D4D1",
    secondary: "#FF0040",
    text: "#f1f3f4",
    backgroundColor: "#070618",
  };

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
          <a class="item right">HOME</a>
          <a class="item">ABOUT</a>
          <a class="item">PROCEDURE</a>
        </div>
      </div>
      <div className={styles.landingScreen} style={{ margin: 0 }}>
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column className={styles.content}>
              <h1>WE ARE </h1>
              <h1 style={{ color: colors.primary }}>TEAM XCALATE </h1>
              <h3 style={{ color: colors.text }}>
                We work on solution to bring stock market for all
              </h3>
              <Button
                style={{
                  backgroundColor: colors.primary,
                  marginTop: "50px",
                  color: "#000",
                }}
                className="ui primary button"
              >
                Sign In
              </Button>
              <Button
                style={{
                  backgroundColor: colors.secondary,
                  marginTop: "50px",
                  marginLeft: "20px",
                }}
                className="ui primary button"
              >
                Sign Up
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </body>
  );
}
