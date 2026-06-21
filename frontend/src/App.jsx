import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BookDetails from './pages/BookDetails';
import Details from './pages/Details'; 
import AdminDashboard from './pages/AdminDashboard'; 
// 1. FIXED: Imported your brand new Author page into the file system
import Author from './pages/Author'; 

// Import your default list of books from your data folder fallback
import { books as defaultBooks } from './data/books';


import About from './pages/About'; // Update path if needed


function App() {
  // Sync check book listings out of browser localStorage
  const [allBooks, setAllBooks] = useState(() => {
    const savedBooks = localStorage.getItem('my_bookstore_books');
    return savedBooks ? JSON.parse(savedBooks) : defaultBooks;
  });

  // Sync check dynamic categories collection out of browser localStorage
  const [categories, setCategories] = useState(() => {
    const savedCats = localStorage.getItem('my_bookstore_categories');
    return savedCats ? JSON.parse(savedCats) : ["All", "Flash Sale", "New Arrivals", "Fiction", "Sci-Fi", "Design", "Biography"];
  });

  // Keep book records completely updated inside browser memory 
  useEffect(() => {
    localStorage.setItem('my_bookstore_books', JSON.stringify(allBooks));
  }, [allBooks]);

  // Keep dynamic categories updated inside browser memory
  useEffect(() => {
    localStorage.setItem('my_bookstore_categories', JSON.stringify(categories));
  }, [categories]);

  return (
    <div className="min-h-screen flex flex-col bg-[#222]">
      <Header />

      <main className="flex-grow">
        <Routes>
          {/* We pass our dynamic 'allBooks' list straight into components as props */}
          <Route path="/" element={<Home books={allBooks} categories={categories} />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* 2. FIXED: Linked the '/author' URL path straight to your dynamic Author component layout */}
          <Route path="/author" element={<Author books={allBooks} />} />

          {/* Dynamic route for single book profiles */}
          <Route path="/details/:id" element={<BookDetails />} />
          
          {/* Main collection grid view */}
          <Route path="/details" element={<Details books={allBooks} categories={categories} />} /> 

          {/* Setup active modifiers to enable dynamic updates & deletions */}
          <Route 
            path="/admin" 
            element={
              <AdminDashboard 
                books={allBooks} 
                setBooks={setAllBooks} 
                categories={categories} 
                setCategories={setCategories} 
              />
            } 
          />

          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;