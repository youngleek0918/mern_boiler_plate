import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_actions'

export default function (SpecificComponent, option, adminRoute = null) {
    // option
    // null  => anyone
    // true => logged in user only pages
    // false => non log in user only pages

    function AuthenticationCheck(props) {

        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then(response => {
                console.log(response)

                // if non log in user wants to access loggedInUserOnlyPage
                if(!response.payload.isAuth) {
                    if(option){
                        props.history.push('/login')
                    }
                } else {
                    // if logged in user wants to access adminOnlyPages
                    if(adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    } else {
                        // if logged in user wants to access nonLogInUserOnlyPages
                        if(option === false) {
                            props.history.push('/')
                        }
                    } 
                }
            }) 

        }, [])

        return (
            <SpecificComponent />
        )
    }


    return AuthenticationCheck

}
