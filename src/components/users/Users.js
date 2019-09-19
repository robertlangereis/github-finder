import React from 'react'
import UserItem from './UserItem'
import Spinner from '../layout/Spinner'
import PropTypes from 'prop-types';

const Users = ({loading, users}) =>{
        return (
            loading ? <Spinner/> :
            <div style={userStyle}>
                {users.map(user => (
                    <UserItem key={user.id} user={user}/>
                    ))}
            </div>
        )
}

const userStyle={
    display: 'grid',
    gridTemplateColumn: 'repeat(3, 1fr)',
    gridGap: '1rem'
}

Users.prototypes={
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
}

export default Users