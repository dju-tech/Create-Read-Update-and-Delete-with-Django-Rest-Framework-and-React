import React, {useState, useEffect} from "react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import ApiService from "./ApiService";
import {useCookies} from 'react-cookie';

const ArticleList = ({articles, updateArticle, deleteArticle}) => {

    const [token] = useCookies(['mytoken'])

    const handleUpdate = async (article) => {
        try {
            const response = await ApiService.updateBtn(article.id, article, token['mytoken'])
            updateArticle(response.data)
        }catch(error){
            console.log(`Error ${error} occurred during the operation`)
        }
    }

    const handleDelete = async article => {
        try {
            const response = await ApiService.deleteBtn(article.id, token['mytoken'])
            deleteArticle(article)
        }catch(error){
            console.log(error)
        }
    }

    return (
        articles.map(article => {
            return (
            <div className="row gap-2 mb-3" key={article.id}>
                <div className="col card">
                    <h4 className="mb-2">
                        {article.title}
                    </h4>
                    <p>
                        {article.description}
                    </p>
                    <div className="d-flex align-items-center gap-3">
                        <button className="btn btn-primary" onClick={() => handleUpdate(article)}>Update</button>
                        <button className="btn btn-danger" onClick={() => handleDelete(article)}>Delete</button>
                    </div>
                </div>                      
            </div>
            )
        })
    )
    
}

export default ArticleList