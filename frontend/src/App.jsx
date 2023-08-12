import React, {useState, useEffect} from "react";
import ArticleList from './components/ArticleList.jsx';
import Form from "./components/Form.jsx";
import axios from 'axios';
import {useCookies} from 'react-cookie';



function App() {
  const [articles, setArticles] = useState([])
  const [editArticle, setEditArticle] = useState(null)
  const [token] = useCookies(['mytoken'])

  useEffect(() => {
      axios.get('http://127.0.0.1:8000/api/articles/', {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token['mytoken']}`
          }
      })
      .then(res => setArticles(res.data))
      .catch(error => console.log(error))
  }, [])

  const updateArticle = (article) => {
    setEditArticle(article)
  }

  const deleteArticle = article => {
    const new_articles = articles.filter(my_article => {
        if (my_article.id === article.id) return false;
        return true;
    })
    setArticles(new_articles)
  }

  const updatedArticle = article => {
    const new_articles = articles.map(my_article => {
        if(my_article.id === article.id) {
            return article
        } 
        else{
            return my_article
        } 
    })
    setArticles(new_articles)
  }


  const articleForm = () => {
    setEditArticle({title: '', description: '' })
  }

  const insertedArticle = article => {
    setArticles([...articles, article])
  }


  return (
      <div className="app">
          <div className="header mb-5 d-flex justify-content-between">
              <h2 className="text-white">
              Django and React Crud Operation
              </h2>
              <button className="btn btn-primary" onClick={articleForm}>Insert Article</button>
          </div>
          <ArticleList articles={articles} updateArticle={updateArticle} deleteArticle={deleteArticle}/>

          {
            editArticle ? <Form article={editArticle} updatedArticle={updatedArticle} insertedArticle={insertedArticle}/> : null
          }
          
          
      </div>
      
  )
}

export default App
