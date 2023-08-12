import axios from "axios"
import {useCookies} from 'react-cookie';


export default class ApiService{

    static updateBtn = async (article_id, article, token) => {
        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            }
            const response = await axios.put(`http://127.0.0.1:8000/api/articles/${article_id}/`, {
                
                    'title': article.title,
                    'description': article.description
                
            }, config)
            return response
        }
        catch(error){
            console.log(error)
            throw(error)
        }
    }

    static deleteBtn = async (article_id, token) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        }
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/articles/${article_id}/`, config)
            return response
        }catch(error){
            console.log(error);
        }
    }

    static insertBtn = async ({title, description}, token) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        }
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/articles/`, {
                'title' : title,
                'description' : description
            }, token)
            return response
        }catch(error){
            throw(error)
        }
    }

    static loginBtn = async ({username, password}) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/auth/', {
                'username': username,
                'password': password
            })
            return response
        }catch(error){
            console.log(`${error} occurred`)
            throw(error)
        }
    }

    static registerUser = async ({username, password}) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/users/', {
                'username': username,
                'password': password
            })
            return response
        }catch(error){
            throw(error)
        }
    }

}