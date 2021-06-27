import React, { Component } from 'react';
import { Form, Input, Message, Button, Card, Icon } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Post from '../../ethereum/deployed_contracts/post';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';


class PredictForm extends Component {

  static async getInitialProps(props) {
      
      const post = await Post(props.query.address);
      

      var summary = await post.methods.getSummary().call(); 
      
      return  {
        address: summary[0],
        name: summary[1],
        content: summary[2],
        yayprice: summary[3]/1000000000000000000,
        nayprice: summary[4]/1000000000000000000,
        pool: summary[9]/1000000000000000000,
        yaycount: summary[5],
        naycount: summary[6],
      };

      
    }

    state = {
        paymentPrice: this.props.yayprice,
        payingForYes: true,
        loadingYes: false,
        loadingNo: false,
        errorMessage: ''
    };


    onSubmitYes = async (event) => {
        event.preventDefault();

        this.setState({ loadingYes: true, errorMessage: '' });

        const post = await Post(this.props.address);
        try {
            const accounts = await web3.eth.getAccounts();
            await post.methods.voteYay().send({
              from: accounts[0],
              value: web3.utils.toWei(this.props.yayprice.toString(),'ether')
            });
            Router.pushRoute(`/home/feed`);

        } catch(err) {
            this.setState({ errorMessage: err.message });
        }
        this.setState({ loadingYes: false});
    };

    onSubmitNo = async (event) => {
      event.preventDefault();

      this.setState({ loadingNo: true, errorMessage: '' });

      const post = await Post(this.props.address);
      try {
          const accounts = await web3.eth.getAccounts();
          await post.methods.voteNay().send({
            from: accounts[0],
            value:web3.utils.toWei(this.props.nayprice.toString(),'ether')
          });
          Router.pushRoute(`/home/feed`);
      } catch(err) {
          this.setState({ errorMessage: err.message });
      }

      this.setState({ loadingNo: false})
  };


    render () {
        return (
            <Layout><center>
            <Card>
              <Card.Content>
                <Card.Header>
                    <h3>
                      @{this.props.name}
                    </h3>
                </Card.Header>

                
                <Card.Description>
                  <strong>{this.props.content}</strong>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className='ui two buttons'>
                  <Button disabled basic color='green'>
                    Yes: {this.props.yayprice.toString().substring(0,6)} ETH
                  </Button>
                  <Button disabled basic color='red'>
                    No: {this.props.nayprice.toString().substring(0,6)} ETH
                  </Button>
                </div>
                <br/>
                <br/>
                <div className='ui two buttons'>
                  <Button disabled basic color='green'>
                    Approvers: {this.props.yaycount}
                  </Button>
                  <Button disabled basic color='red'>
                    Disapprovers: {this.props.naycount}
                  </Button>
                </div>
              </Card.Content>
            </Card>
            
            <Form onSubmit={this.onSubmitYes} error={!!this.state.errorMessage} >
                <Message error  header="Oops!" content={this.state.errorMessage} />

                <Button.Group>
                  <Button loading={this.state.loadingYes} animated color='green'>
                    <Button.Content visible>Predict Yes</Button.Content>
                    <Button.Content hidden>
                      <Icon name='arrow right' />
                    </Button.Content>
                  </Button>
                  <Button.Or text='  ' />
                  <Button disabled>Pay {this.props.yayprice.toString().substring(0,6)} ETH</Button>
                </Button.Group>
            </Form>

            <br/>
         
            
            <Form onSubmit={this.onSubmitNo} error={!!this.state.errorMessage}>
                <Button.Group>
                <Button loading={this.state.loadingNo}  animated color='red'>
                    <Button.Content visible>Predict No</Button.Content>
                    <Button.Content hidden>
                      <Icon name='arrow right' />
                    </Button.Content>
                  </Button>
                  <Button.Or text='  ' />
                  <Button disabled >Pay {this.props.nayprice.toString().substring(0,6)} ETH</Button>
                </Button.Group>
                </Form>
            </center>
            </Layout>
        );
    }
};

export default PredictForm;