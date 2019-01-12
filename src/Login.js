import { connect } from 'react-redux'
import React, { Component } from 'react';
import { login, userLogin, addUser } from './redux/actionCreators';


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login: true
        }

        this.userRegister = () =>{
            if(this.new_password.value != this.new_password_re.value){
                alert("Password does not match!");
                return;
            }
            let user = {
                username: this.new_username.value,
                name:this.new_name.value,
                password:this.new_password.value
            }
            this.props.addUser(user);
        }

        this.userLogin = () => {
            let user = {
                username: this.login_username.value,
                password:this.login_password.value
            }
            this.props.userLogin(user);
        }
    }


    componentDidUpdate(){
        this.new_username = document.getElementById("new_username");
        this.new_name = document.getElementById("new_name");
        this.new_password = document.getElementById("new_password");
        this.new_password_re = document.getElementById("new_password_re");

        this.login_username = document.getElementById("login_username");
        this.login_password = document.getElementById("login_password");
    }

    render() {
        const form_style = {
            width:'40%',
            margin:'auto'
        }
        let form;
        if (this.state.login || this.props.regStatus) {
            if(this.props.regStatus){
                alert("Please Log ini")
            }
            form = <div>
                <h2>Login</h2>
                <p>Username</p>
                <input id="login_username" type="text" />
                <p>Password</p>
                <input id="login_password" type="password" />
                <button onClick={this.userLogin} >Login</button>
                <span>No account? <a onClick={()=>{this.setState({login:false})}}>register</a></span>
            </div>
        }else{
            form = <div>
            <h2>Registration</h2>
            <p>Username</p>
            <input id="new_username" type="text" />
            <p>Display Name</p>
            <input id="new_name" type="text" />
            <p>Password</p>
            <input id="new_password" type="password" />
            <p>Retype-Password</p>
            <input id="new_password_re" type="password" />
            <button onClick={this.userRegister} >Submit</button>
        </div>
        }
        if(this.props.logStatus){
            form=<div>
                <h2>You Successfully logged in..!</h2>
            </div>
        }
        return (
            <div style={form_style}>
                <a onClick={()=>{this.setState({login:true})}}>login form</a>
                <h2>Form:</h2>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    //console.log(state);
    return {
            user: state.userState.user,
            regStatus: state.userState.regStatus,
            logStatus: state.userState.logStatus
    }
}

const mapDispatchToProps = dispatch => ({
    userLogin: (user) => dispatch(userLogin(user)),
    addUser: (user) => dispatch(addUser(user))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)