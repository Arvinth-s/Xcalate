import React, { Component } from 'react';
import { Card, Button, Icon, Label  } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import { Link, Router } from '../../routes';

class Market extends Component {
  
  static async getInitialProps(props) {
    var {address} = props.query;
    
    //comment underneath line
    address = '0x9876A5bc27ff511bF5dA8f58c8F93281E5BD1f21';
    var posts = [];

    //dummy posts
    posts.push({
      title:'Philosophy’s lack of progress',
      shortDescription:'For centuries, all philosophers seem to have done is question and debate. Why do philosophical problems resist solution?',
      postId:1, //to identify within list of posts of org in SQL
      orgName:'Morgan Library',
      orgAddress:'0xOrgAddress1',
      likes: 674
    });
    posts.push({
      title:'The seed of suffering',
      shortDescription:'The p-factor is the dark matter of psychiatry: an invisible, unifying force that might lie behind a multitude of mental disorders',
      postId:1,
      orgName:'Reuters',
      orgAddress:'0xOrgAddress2',
      likes: 102443
    });
    posts.push({
      title:'The clothing revolution',
      shortDescription:'What if the need for fabric, not food, in the face of a changing climate is what first tipped humanity towards agriculture?',
      postId:1,
      orgName:'UCL Media',
      orgAddress:'0xOrgAddress3',
      likes: 5213
    });
    return { address, posts }
  }
  
  renderBlogs(){
    const items = this.props.posts.map(post => {
      
      return {
          header: (
              <h2>
                  {post.title}
              </h2>
          ),
          description: (
              <strong>{post.shortDescription}</strong>
          ),
          extra: (
              <div>
              <h4>
                  By {post.orgName}
              </h4>
              
              <Link route={`/home/${this.props.address}/viewPost/${post.orgAddress}/${post.postId}`}>
              <Button inverted color='green'>
                Read
              </Button>   
              </Link>
              
              <Button size='mini' as='div' labelPosition='right'>
                <Button color='red'>
                  <Icon name='heart' />
                  Likes
                </Button>
                <Label as='a' basic color='red' pointing='left'>
                  {post.likes}
                </Label>
              </Button>  

              
            </div>
          ),
              
        };
        
        
          
      });
  
      return <Card.Group items={items} />;
  }
  
  render(){
    return(
      <Layout>
      <div>
          <h3>Blogs <Icon  name='newspaper' /></h3>

          {this.renderBlogs()}
        </div>
      </Layout>
    );
  }
}

export default Market;