import React, { Component } from 'react'
import PropTypes from 'prop-types';
export class Search extends Component {
    state ={
        text: '',
    };

    static propTypes={
        searchUsers: PropTypes.func.isRequired
    }

    onChange =(e)=>{
        this.setState({[e.target.name]:e.target.value})
        // so, if you have multiple you want to change e.g. email, name, age, etc. - the [e.target.name] in brackets allows you to grab this
    }

    onSubmit= (e)=>{
        e.preventDefault();
        this.props.searchUsers(this.state.text);
        //the function of SearchUsers allows you to push your state.text up to parent component through props
        this.setState({text: ''});
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit} className="form">
                    <input
                    type="text"
                    name="text"
                    placeholder="search users...."
                    value={this.state.text}
                    onChange={this.onChange}
                    />
                    <input
                    type="submit"
                    value="Search"
                    className="btn btn-dark btn-block"
                    />
                    
                </form>
            </div>
        )
    }
}

export default Search
