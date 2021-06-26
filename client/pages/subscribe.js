import React, { Component } from 'react';
import { Form, Input, Image, Grid, TextArea, Dropdown, Button, Message, Select } from 'semantic-ui-react';
import "semantic-ui-css/semantic.min.css";
import styles from '../styles/Index.module.css';
import { Link, Router } from '../routes';

const colors = {
    primary: "#598FFF",
    secondary: "#D10311",
    text: "#f1f3f4",
    backgroundColor: 'black',
  };

class Subscribe extends Component{

    state = {
        account: '',
        months: '1',
        loading: false,
        errorMessage: ''
    }

    static async getInitialProps(props) {
        var {address} = props.query;
        
        //comment underneath line
        address = '0x9876A5bc27ff511bF5dA8f58c8F93281E5BD1f21'
        return { address }
    }

    onSubmit = async event => {
        event.preventDefault();
    
    
        this.setState({ loading: true, errorMessage: '' });
    
        try {
          //web3 code
            
          Router.pushRoute(`/home/${this.props.address}/market`);
        } catch (err) {
          this.setState({ errorMessage: err.message });
        }
    
        this.setState({ loading: false });
      };

    
    render(){
        return(
            <div>
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
                    <Grid columns={4} divided>
                    <Grid.Row>
                        <Grid.Column className={styles.content}>
                        <h3 style={{ color: colors.text }}>
                            Account: {this.props.address}
                        </h3><br/><br/>
                            
                            
                            
                            
                            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                                <h4 style={{ color: colors.text }}>
                                    Subscription Period
                                </h4>
                                <Form.Group widths='equal'>
                                <Form.Field>
                                <Input 
                                label='Months'
                                labelPosition='right' 
                                placeholder={this.state.months}
                                value={this.state.months}
                                onChange={event => this.setState({ months: event.target.value})}
                                />
                                </Form.Field>
                                </Form.Group>
                                <Message error header="Oops!" content={this.state.errorMessage} />
                                <Button
                                    style={{
                                    marginTop: "50px",
                                    }}
                                    inverted color='red'
                                    loading={this.state.loading}
                                >
                                    Confirm
                                </Button>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                    </Grid>
                </div>
                </body>
            </div>
        );
    }
}

export default Subscribe;