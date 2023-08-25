import React from 'react'
import Feed  from './Feed';
import { useContext } from 'react';
import DataContext from './context/Datacontext';

const Home = () => {
  const{searchResults,isLoading,fetchError}=useContext(DataContext);
  return (
    <main className='Home'>
      {isLoading && <p className='statusMsg' >Loading Posts...</p>}  
      {!isLoading && fetchError  && <p className='statusMsg' style={{color:"red"}}>{fetchError}</p>}
       {!isLoading && ! fetchError && (searchResults.length?<Feed posts = {searchResults}/>:<p className='statusMsg'>No posts to display</p>)}
    </main>
  )
}

export default Home