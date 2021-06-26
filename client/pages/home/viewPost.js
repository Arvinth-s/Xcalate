import React, { Component } from 'react';
import Layout from '../../components/Layout';

class ViewPost extends Component {
  
  static async getInitialProps(props) {
    var {address, orgAddress, postId } = props.query;
    
    //retrieve post data using postId and orgAddress

    //comment underneath line
    address = '0x9876A5bc27ff511bF5dA8f58c8F93281E5BD1f21';
    orgAddress = '0xOrganizationAddress'
    postId = '1'
    
    var postData = {
      title: 'Philosophy’s lack of progress',
      shortDescription: 'For centuries, all philosophers seem to have done is question and debate. Why do philosophical problems resist solution?',
      likes: 674,
      orgName: 'Morgan Library',
      orgAddress: '0xOrgAddress1',
      content: 'Philosophy seems to be on a hiding to nothing. It has a 2,500-year history in the West and an extensive back-catalogue – of problems. There are questions about what exists, and what we know about it, such as: Do we have free will? Is there an external world? Does God exist? and so on. There are also questions of analysis and definition such as: What makes a sentence true? What makes an act just? What is causation? What is a person? This is a tiny sample. For almost any abstract notion, some philosopher has wondered what it really is.      Yet, despite this wealth of questions and the centuries spent tackling them, philosophers haven’t successfully provided any answers. They’ve tried long and hard but nothing they’ve said towards answering those questions has quite made the grade. Other philosophers haven’t been slow to pick holes in their attempted answers and expose flaws or dubious assumptions in them. The punctures in the attempted answers then get patched up and put up for discussion again. But what happens is that new punctures appear, or the patches fail and the old punctures are revealed again. Philosophy emerges as a series of arguments without end, and its questions settle into seemingly intractable problems.'
    }
    //dummy postdata:


    return { address, orgAddress, postId, postData }
  }
  
  
  
  render(){
    return(
      <Layout>
        <h1>Home Market</h1>
      </Layout>
    );
  }
}

export default ViewPost;