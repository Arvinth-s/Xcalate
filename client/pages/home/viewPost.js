import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Grid, Image, Icon, Button, Label, Card } from 'semantic-ui-react';
import { Link, Router } from '../../routes';

class ViewPost extends Component {
  
  static async getInitialProps(props) {
    var {address, orgAddress, postId } = props.query;
    
    //retrieve post data using postId and orgAddress

    //comment underneath line
    address = '0x9876A5bc27ff511bF5dA8f58c8F93281E5BD1f21';
    orgAddress = '0xOrganizationAddress'
    postId = '1'
    

    //dummy postdata:
    var postData = {
      title: 'Philosophy’s lack of progress',
      shortDescription: 'For centuries, all philosophers seem to have done is question and debate. Why do philosophical problems resist solution?',
      likes: 674,
      orgName: 'Morgan Library',
      orgAddress: '0xOrgAddress1',
      content: 'Philosophy seems to be on a hiding to nothing. It has a 2,500-year history in the West and an extensive back-catalogue – of problems. There are questions about what exists, and what we know about it, such as: Do we have free will? Is there an external world? Does God exist? and so on. There are also questions of analysis and definition such as: What makes a sentence true? What makes an act just? What is causation? What is a person? This is a tiny sample. For almost any abstract notion, some philosopher has wondered what it really is.      Yet, despite this wealth of questions and the centuries spent tackling them, philosophers haven’t successfully provided any answers. They’ve tried long and hard but nothing they’ve said towards answering those questions has quite made the grade. Other philosophers haven’t been slow to pick holes in their attempted answers and expose flaws or dubious assumptions in them. The punctures in the attempted answers then get patched up and put up for discussion again. But what happens is that new punctures appear, or the patches fail and the old punctures are revealed again. Philosophy emerges as a series of arguments without end, and its questions settle into seemingly intractable problems. Here is a companion thought experiment, now called the knowledge argument. By reading the appropriate books, you could learn all about the chemistry of ammonia. By reading more books, you could learn all about how the human olfactory system works and, in particular, how it reacts in response to ammonia molecules – what distinctive changes occur in the mucous membrane and in the olfactory nerves. Given all this textbook information, though, could you then know all there is to know about the smell of ammonia? Or is there something about the smell of ammonia, the qualitative experience of that sharp, pungent aroma, that you won’t understand from this learning, independent of experience? These thought experiments and others like them generate debates that run and run. It’s not simply that there are different sides to take on any one of these puzzles. It’s that a strong opening case can be made and sustained for each of these viewpoints, despite the fact that these viewpoints conflict. Take the second thought experiment. It seems that knowledge of the aroma of ammonia – what it actually smells like – is not the kind of information you can get from reading books. But then are there facts about human experience that can’t be captured by science and what it can report in its textbooks? Is there more to us than is scientifically describable? If so, it implies that humans aren’t purely physical systems – a remarkable exception to what the natural sciences otherwise tell us about the world.'
    }
    


    return { address, orgAddress, postId, postData }
  }
  
  
  
  render(){
    return(
      <Layout>
        <Grid>
          <Grid.Row>
            <Grid.Column width={11}>
            <Card fluid>
              <Card.Content>
                <Card.Header><h1>{this.props.postData.title}</h1></Card.Header>
                <Card.Meta><h4>By {this.props.postData.orgName}</h4></Card.Meta><br/>
                <Card.Meta><h3>{this.props.postData.shortDescription}</h3></Card.Meta><br/><br/>
                <Card.Description>
                <h4>{this.props.postData.content}</h4>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                  <Button size='mini' as='div' labelPosition='right'>
                    <Button color='red'>
                      <Icon name='heart' />
                      Like
                    </Button>
                    <Label as='a' basic color='red' pointing='left'>
                      {this.props.postData.likes}
                    </Label>
                  </Button>  
              </Card.Content>
            </Card>
            </Grid.Column>
            <Grid.Column width={5}>
              <Card fluid>
                <Card.Content>
                  <Card.Header><h3>{this.props.postData.orgName}</h3></Card.Header>
                </Card.Content>
                <Card.Content extra>
                  <Link route={`/home/${this.props.address}/viewOrg/${this.props.orgAddress}`}>
                    <Button inverted color='green'>
                      View Organization
                    </Button>   
                  </Link>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default ViewPost;