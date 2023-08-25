import {Routes,Route} from 'react-router-dom'; 
import Header from './Header';
import Home from './Home';
import About from './About';
import Nav from './Nav';
import Footer from './Footer';
import NewPost from './NewPost';
import PostPage from './PostPage';
import Missing from './Missing';
import EditPost from './EditPost'
import { DataProvider } from './context/Datacontext';

function App() { 
  
  
  return (
     <div className="App"> 
      <DataProvider>
      <Header title = "ReactJsBlog" />
      <Nav />
      <Routes>
        <Route path ='/' element= {<Home/>}/>
        <Route path ='/post' element= {<NewPost />}></Route>
        <Route path ='/edit/:id' element= {<EditPost/>}></Route>
        <Route path ='/post/:id' element= {<PostPage/>}></Route>
        <Route path ='/about' element= {<About/>}></Route>
        <Route path ='*' element= {<Missing/>}></Route>
      </Routes>
      <Footer/>
      </DataProvider>

         
     </div>
  );
}

export default App;
