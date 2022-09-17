import React, { Component } from 'react';
import { verify } from '../../util/APIUtils';
import LoadingIndicator from '../../common/LoadingIndicator';

class Verify extends Component {
    constructor(props) {
        super(props)

        this.state = {
            code: "123456",
            staus: "0"
        }
        this.verifyAccount = this.verifyAccount.bind(this);
    }

    componentDidMount() {
        let isMounted = true
        console.log(this.state.code)
        verify(this.state.code)
        .then(res => {
            if (isMounted) {
                this.setState({status: "1"});
            }
        })
        .catch(error => {
            if (isMounted) {
                this.setState({status: "2"});
            }
        });
        return () => {
            isMounted = false
          }
    }

    verifyAccount = () => {
        console.log(this.state.code)
        verify(this.state.code)
        .then(res => {
            this.setState({status: "1"});
        })
        .catch(error => {
            this.setState({istatus: "2"});  
        });
    }

    render() {
        if(this.state.staus === "0") {
            return <LoadingIndicator />
        } if(this.state.staus === "1") {
            return (
                <div className="container text-center">
                    <h3>Congratulations, your account has been verified.</h3>
                    <h4><a href="/login">Click here to Login</a></h4>
                </div>
            );
        } else {
            return (
                <div class="container text-center">
                    <h3>Sorry, we could not verify account. It maybe already verified,
                        or verification code is incorrect.</h3>
                </div>
            );
        }
    }
}

export default Verify;