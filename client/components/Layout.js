import React from 'react';
import { Container } from 'semantic-ui-react';
import Head from 'next/head';
import Header from './Header';


const Layout = props => {
  return (
    <Container style={{width:"100%",height:"100vh", backgroundColor: '#070618'}}>
      <Container style={{width:"80%",height:"100vh", backgroundColor: '#070618'}}>
        <Head>
          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
          />
        </Head>
        <Header/>
        {props.children}
      </Container>
    </Container>
  );
};

export default Layout;