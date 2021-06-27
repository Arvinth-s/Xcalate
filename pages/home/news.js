import React, { Component } from 'react';
import { Card, Button, Icon } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Post from '../../ethereum/deployed_contracts/post';
import Factory from '../../ethereum/deployed_contracts/factory';


class PostIndex extends Component {
  static async getInitialProps() {

    const spectrum = await Factory.methods.getDeployedPosts().call();


    var posts = [];
    for(var i = 0; i < spectrum.length; i=i+1){
      let post = await Post(spectrum[i]).methods.getSummary().call();
      console.log('posts \n\n', post);
      posts.push({
        address: post[0],
        name: post[1],
        content: post[2],
        yayprice: post[3]/1000000000000000000,
        nayprice: post[4]/1000000000000000000,
        pool: post[9]/1000000000000000000,
        yaycount: post[5],
        naycount: post[6],
        completed: post[7],
        verdict: post[8]
      })
    }



  //Dummy data for illustration
  posts.push({
      address: '0x123',
      name: 'Donald Trump',
      content: 'We won the election!',
      yayprice: '0.001',
      nayprice: '0.019',
      pool: '265,254',
      completed: true,
      verdict: false
  });
    return { posts };
  }

  renderButton(verdict) {
    if(verdict==true){
        return (
            <Button disabled color='green'><Icon  name='check circle' />Verified Yes</Button>
        );
    }else{
        return (
            <Button disabled color='red'><Icon  name='check circle' />Verified No</Button>
        );
    }
  }

  renderCampaigns() {
    let items = [];
    this.props.posts.map(post => {
      if(post.completed){
        items.push(
        {
            header: (
                <h4>
                    @{post.name}
                </h4>
            ),
            description: (
              <h3><strong>{post.content}</strong></h3>
             ),
            extra: (
                <div>
                <Button.Group>
                    <Button disabled >Pool: {post.pool.toString().substring(0,6)} ETH</Button>
                    <Button.Or text='  ' />
                    
                        
                        {this.renderButton(post.verdict)}
                        
                    
                </Button.Group>
                            
              </div>
            ),
            fluid: true,    
          }
        );
      } 
    });

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h3>Verified News<Icon  name='check circle' /></h3>

          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  }
}

export default PostIndex;