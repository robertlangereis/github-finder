import React, { useState } from 'react'
import PropTypes from 'prop-types';
const Search = ({ searchUsers, showClear, clearUsers, setAlert }) => {
    const [text, setText] = useState('');


    const onChange = (e) => {
        setText(e.target.value)
        // so, if you have multiple you want to change e.g. email, name, age, etc. - the [e.target.name] in brackets allows you to grab this
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (text === '') {
            setAlert('Please enter something', 'light')
        } else {
            searchUsers(text);
            //the function of SearchUsers allows you to push your state.text up to parent component through props
            setText('');
        }
    }
    return (
        <div>
            <form onSubmit={onSubmit} className="form">
                <input
                    type="text"
                    name="text"
                    placeholder="search users...."
                    value={text}
                    onChange={onChange}
                />
                <input
                    type="submit"
                    value="Search"
                    className="btn btn-dark btn-block"
                />

            </form>
            {showClear &&
                <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>}
        </div>
    )
}

export default Search

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
}