import React, { useState, useEffect} from "react";
import ApiService from './ApiService'
import {useCookies} from 'react-cookie';

const Form = ({article, updatedArticle, insertedArticle}) => {


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [token, setToken] = useCookies(['mytoken'])

    
    useEffect(() => {
        setTitle(article.title)
        setDescription(article.description)
    }, [article])


    const updateBtn = async (article) => {
        try {
            const response = await ApiService.updateBtn(article.id, {title, description}, token['mytoken'])
            console.log(response)
            console.log(response.data)
            updatedArticle(response.data)
        }catch(error){
            console.log(`Error ${error} occurred during the operation`)
        }
    }


    const insertArticle = async () => {
        const response = await ApiService.insertBtn({title, description}, token['mytoken'])
        insertedArticle(response.data)
    }


    return (
        <>
        {
            
            article ? (
                <div className="">
            <h3 className="text-white mb-3">Update Article Form</h3>
            <div className="row d-flex flex-column">
            <div className="col mb-2 d-flex flex-column">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div className="col mb-2">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea className="w-100"  rows={5}  value={description} id="description" onChange={e => setDescription(e.target.value)} ></textarea>
            </div>
            </div>
            {
                article.id ? <button className="btn btn-success" onClick={() => updateBtn(article)}>Update Article</button> : <button className="btn btn-success" onClick={insertArticle}>Insert Article</button>
            
            }
        </div>
            ) : null
      
        }
        </>
    )
}

export default Form;