import React from 'react';
import {useState, useContext } from 'react';
import DataContext from './context/Datacontext';
import { useNavigate } from 'react-router-dom';
import api from './api/posts';
import {format} from 'date-fns';

const NewPost = () => { 
  const[posttitle,setPosttitle]= useState('');
  const[postbody,setPostbody] = useState('');
  const {posts,setPosts} = useContext(DataContext);
  const navigate = useNavigate();

  const handleSubmit =async(e)=>{
    e.preventDefault();
    const id = posts.length?posts[posts.length-1].id+1:1;
    const datetime = format(new Date(),'MMMM dd, yyyy pp');
    const newPost = {id ,title:posttitle,datetime,body:postbody};
    try {
      const response = await api.post('/posts',newPost) 
      const allPosts= [...posts,response.data];
      setPosts(allPosts);
      setPosttitle('');
      setPostbody('');
      navigate('/');
    } catch (err) {
      console.log(`Error:${err.message}`);
    }
    
  }
  return (
    <main className='NewPost'>
       <h1>NewPost</h1>
       <form className='newPostForm' onSubmit={handleSubmit}>
         <label htmlFor='Posttitle'>Title:</label>
         <input
            id = "posttitle"
            type = "text"
            required
            value= {posttitle}
            onChange={(e)=>setPosttitle(e.target.value)}
         />
         <label htmlFor='Postbody'>Post:</label>
         <textarea
            id = "postbody"
            type = "text"
            required
            value= {postbody}
            onChange={(e)=>setPostbody(e.target.value)}
         />
         <button type='submit'>Submit</button>
       </form>
    </main>
  )
}

export default NewPost
