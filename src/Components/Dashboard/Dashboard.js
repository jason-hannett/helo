import React, {Component} from 'react' 
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

class Dashboard extends Component{

    constructor(props){
        super(props)

        this.state = {
            posts: [],
            search: '',
            userPosts: true
        }
    }

    componentDidMount(){
        axios.get('/api/')
    }

    render(props){
        console.log(this.props)
        let myPosts = this.state.posts.map((element, index) => {
            return <div key={index}> 
                    <h2>{element.title}</h2>
                    <h3>{element.username}</h3>
                    <img src={element.image}/>
                   </div>
        });
        return(
            <div>Dashboard
                <input />
                <button>Search</button>
                <button>Reset</button>
                {myPosts}
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
   return{
       reduxState
   }
}

export default withRouter(connect(mapStateToProps)(Dashboard));