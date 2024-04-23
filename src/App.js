import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './assets/css/index.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Create from './pages/Create';
import TagList from './pages/TagList';
import FilteredBlogList from './pages/FilteredBlogList';
import BlogDetails from './pages/BlogDetails';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/tags" element={<TagList />} />
            <Route path="/blogs/:blogId" element={<BlogDetails />} />
            <Route path="/tags/:tagName" element={<FilteredBlogList />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;