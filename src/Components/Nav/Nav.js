import React, {Component} from 'react' 
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class Nav extends Component{

    constructor(props){
        super(props)

        this.state = {
            username: '',
            profilePic: ''
        }
    }

    render(){
        console.log(this.props.reduxState)
        return(
            <div>
                <p>{this.props.username}</p>
                <img src={this.props.profilePic} alt='profile pic'/>
                <Link to='/dashboard'>
                <button>Home</button>
                </Link>
                <Link to='/new'>
                <button>New Post</button>
                </Link>
                <Link to='/'>
                <button>Logout</button>
                </Link>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    // let {username, profilePic} = reduxState;
    // return {username, profilePic}
    return reduxState
}

export default connect(mapStateToProps)(Nav)