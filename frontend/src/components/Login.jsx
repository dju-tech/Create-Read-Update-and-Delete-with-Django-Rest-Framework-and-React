import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ApiService from './ApiService';
import {useCookies} from 'react-cookie';
// import {useHistory} from 'react-router-dom';

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useCookies(['mytoken'])
    const [isLogin, setLogin] = useState(true)
    // let history = useHistory()

    useEffect(() => {
        if(token['mytoken']){
            // history.push('/articles')
            window.location.href = '/articles/'
        }
    }, [token])


    const loginBtn = async () => {
        try{
            const response = await ApiService.loginBtn({username, password})
            setToken('mytoken', response.data.token)
        }catch(error){
            console.log(`${error}`)
        }
    }
    const registerBtn =async  () => {
        try{
            const response = await  ApiService.registerUser({username, password})
            console.log(response.data)
        }catch(error){
            console.log(`${error}`)
        }
        
    }

    return (
        <div className='p-5'>
            {
                isLogin ? <h1 className='my-3'>Please Login</h1> : <h1 className='my-3'>Please Register</h1>
            }

            <div className='mb-3'>
                <label htmlFor='username' className='form-label'>Username</label>
                <input type='text' className='form-control' value={username} onChange={e => setUsername(e.target.value)} id='username' placeholder='please enter username' />
            </div>
            <div className='mb-3'>
                <label htmlFor='pwd' className='form-label'>Password</label>
                <input type='password' className='form-control' value={password} onChange={e => setPassword(e.target.value)} id='pwd' placeholder='please enter password' />
            </div>
            <div>
                {
                    isLogin ? <button className='btn btn-success' onClick={loginBtn}>Login</button> : <button className='btn btn-success' onClick={registerBtn}>Register</button>
                }
            </div>
            <div className='my-3'>
                {
                    isLogin ? <h5>Don't have an account, <button className='btn btn-success' onClick={() => setLogin(false)}>Create one</button></h5>: <h5>Have an account, <button className='btn btn-success' onClick={() => setLogin(true)}>Login Here</button></h5>
                }
            </div>
        </div>
    )
}
export default Login;