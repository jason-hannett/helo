import React, {Component} from 'react' 
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {setUserInfo} from '../../ducks/reducer'
import axios from 'axios'

class Auth extends Component{

    constructor(props){
        super(props)

        this.state = {
            username: '',
            password: ''
        }
    }


    register = () => {
        const {username, password} = this.state
        axios.post('/api/register', {username, password})
        .then(response => {
            console.log(response.data)
            const {user_id, username, profile_pic} = response.data
            this.props.setUserInfo(user_id, username, profile_pic)
            this.props.history.push('/dashboard')
        })
        .catch(err => console.log(err))
    }

    login = () => {
        const {username, password} = this.state
        axios.post('/api/login', {username, password})
        .then(response => {
            console.log(response.data)
            const {user_id, username, profile_pic} = response.data
            this.props.setUserInfo(user_id, username, profile_pic)
            this.props.history.push('/dashboard');
        })
        .catch(err => console.log(err))
    }

    inputHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
        console.log(this.props)
        return(
            <div>Auth
                <p>username</p>
                <input 
                        value={this.state.username}
                        name='username'
                        onChange={(event) => this.inputHandler(event)}
                        placeholder='username'/>
                <p>password</p>
                <input 
                        value={this.state.password}
                        name='password'
                        onChange={(event) => this.inputHandler(event)}
                        placeholder='password' type='password'/>
                <button onClick={this.login}>Login</button>
                <button onClick={this.register}>Register</button>
            </div>
        )
    }
}

export default connect(null, {setUserInfo})(withRouter(Auth))