import React, { useState } from 'react'
// import Axios from 'axios'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../_actions/user_actions'
import { withRouter } from 'react-router-dom'


function RegisterPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler = (event) => {

        setEmail(event.currentTarget.value)
    }

    const onNameHandler = (event) => {

        setName(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {

        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) => {

        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        // 페이지가 리프레쉬 되는것을 막아주기 위해서
        event.preventDefault();

        if(Password !== ConfirmPassword) {
            return alert('Please make sure your password match')
        }

        let body = {
            email: Email,
            password: Password,
            name: Name
        }

        dispatch(registerUser(body))
            .then(response => {
                if (response.payload.success) {
                    props.history.push('/login')
                } else{
                    alert('Failed to sign up')
                }
            })

            
    } 
    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
            }}>
            <form style={{ display:'flex', flexDirection: 'column'}}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />

                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler}/>

                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />

                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />

                <br />
                <button>
                    Login
                </button>
            </form>

        </div>
    )
}

export default withRouter(RegisterPage)
