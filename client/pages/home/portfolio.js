import React, { Component } from 'react';
import Layout from '../../components/Layout';

class Portfolio extends Component {
  
  static async getInitialProps(props) {
    var {address} = props.query;
    
    //comment underneath line
    address = '0x9876A5bc27ff511bF5dA8f58c8F93281E5BD1f21'
    return { address }
  }
  
  
  
  render(){
    return(
      <Layout>
        <h1>Home Market</h1>
      </Layout>
    );
  }
}

export default Portfolio;