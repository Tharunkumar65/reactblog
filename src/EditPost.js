import React from 'react'
import { useState,useEffect } from 'react'
import { useParams,Link } from 'react-router-dom'
import { useContext } from 'react';
import DataContext from './context/Datacontext';
import { useNavigate } from 'react-router-dom';
import {format} from 'date-fns';
import api from './api/posts';

const EditPost = () => {
      const[edittitle,setEdittitle]=useState('');
      const[editbody,setEditbody]=useState('');
      const{ posts,setPosts} = useContext(DataContext);
      const {id} = useParams();
      const navigate = useNavigate();
      const post = posts.find(post=>(post.id).toString()===id);
useEffect(()=>{
     if(post){
        setEdittitle(post.title);
        setEditbody(post.body);
     }
},[posts,setEdittitle,setEditbody])  

const handleEdit = async(id)=>{
   const datetime = format(new Date(),'MMMM dd, yyyy pp');
   const updatedPost = {id ,title:edittitle,datetime,body:editbody};
   try {
     const response= await api.put(`/posts/${id}`,updatedPost);
     setPosts(posts.map(post=>post.id === id ?{...response.data}:post));
     setEdittitle('');
     setEditbody('');
     navigate('/');
   } catch (error) {
     console.log(`Error:${error.message}`);
   }

 }
  return (
    <main className='NewPost'>
     {edittitle && 
      <>  
       <h1>EditPost</h1>
       <form className='newPostForm' onSubmit={(e)=>e.preventDefault()}>
         <label htmlFor='Posttitle'>Title:</label>
         <input
            id = "posttitle"
            type = "text"
            required
            value= {edittitle}
            onChange={(e)=>setEdittitle(e.target.value)}
         />
         <label htmlFor='Postbody'>Post:</label>
         <textarea
            id = "postbody"
            type = "text"
            required
            value= {editbody}
            onChange={(e)=>setEditbody(e.target.value)}
         />
         <button type='submit' onClick={()=>handleEdit(post.id)}>Submit</button>
       </form>
       </>
    } 
    {!edittitle &&
       <>
        <h2>post is not found</h2>
        <Link to ={'/'}>Visit Our Homepage</Link>
       </>

    } 
    </main> 
  )
}

export default EditPost
