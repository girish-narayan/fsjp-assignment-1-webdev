import React, { useState } from 'react';

const INITIAL_BOOKS = [
  {
    id: 1,
    title: 'Clean Code: Agile Software Craftsmanship',
    author: 'Robert C. Martin',
    category: 'Software Engineering',
    rating: 4.8,
    pages: 464,
    isbn: '978-0132350884',
    description: 'A handbook of agile software craftsmanship teaching refactoring, clean functions, and unit testing.',
    chapters: ['1. Clean Code Philosophy', '2. Meaningful Names', '3. Functions & Arguments', '4. Comments & Formatting'],
    sampleText: 'Even bad code can function. But if code isn’t clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost due to poorly written code. Clean code reads like well-written prose...'
  },
  {
    id: 2,
    title: 'Introduction to Algorithms (CLRS)',
    author: 'Thomas H. Cormen',
    category: 'Computer Science',
    rating: 4.9,
    pages: 1312,
    isbn: '978-0262033848',
    description: 'Standard textbook covering sorting, graph algorithms, dynamic programming, and computational complexity.',
    chapters: ['1. Role of Algorithms', '2. Getting Started & Invariants', '3. Growth of Functions', '4. Divide-and-Conquer'],
    sampleText: 'An algorithm is any well-defined computational procedure that takes some value as input and produces some value as output. A sorting algorithm arranges elements of a list in a specific linear order...'
  },
  {
    id: 3,
    title: 'Python for Data Analysis & ML',
    author: 'Wes McKinney',
    category: 'Data Science',
    rating: 4.7,
    pages: 544,
    isbn: '978-1491957660',
    description: 'Hands-on instructions for analyzing, cleaning, and visualizing datasets using NumPy and Pandas.',
    chapters: ['1. Python Basics & IPython', '2. Essential NumPy', '3. Getting Started with Pandas', '4. Data Wrangling'],
    sampleText: 'Data analysis is the process of inspecting, cleansing, transforming, and modeling data with the goal of discovering useful information, informing conclusions, and supporting decision-making...'
  },
  {
    id: 4,
    title: 'Database System Concepts (Silberschatz)',
    author: 'Abraham Silberschatz',
    category: 'Computer Science',
    rating: 4.6,
    pages: 1376,
    isbn: '978-0078022159',
    description: 'Covers relational algebra, SQL optimization, transactions, ACID properties, and concurrency control.',
    chapters: ['1. Database System Architecture', '2. Relational Model', '3. Formal Relational Query Languages', '4. SQL'],
    sampleText: 'A database-management system (DBMS) is a collection of interrelated data and a set of programs to access those data. The primary goal of a DBMS is to provide a way to store and retrieve database information that is both convenient and efficient...'
  },
  {
    id: 5,
    title: 'Mathematics for Machine Learning',
    author: 'Marc Peter Deisenroth',
    category: 'Mathematics',
    rating: 4.8,
    pages: 417,
    isbn: '978-1108455145',
    description: 'Linear algebra, analytic geometry, matrix decompositions, vector calculus, and probability for modern ML models.',
    chapters: ['1. Linear Systems', '2. Vector Spaces', '3. Matrix Decompositions', '4. Vector Calculus'],
    sampleText: 'Fundamental mathematics forms the backbone of modern machine learning algorithms. Linear algebra provides the framework to manipulate large multidimensional data matrices efficiently...'
  },
  {
    id: 6,
    title: 'Learning React: Modern Web Patterns',
    author: 'Alex Banks & Eve Porcello',
    category: 'Web Development',
    rating: 4.7,
    pages: 350,
    isbn: '978-1492051725',
    description: 'Comprehensive guide covering functional components, useState/useEffect hooks, and single-page apps.',
    chapters: ['1. Welcome to React', '2. JavaScript for React', '3. Functional Components', '4. State & Hooks'],
    sampleText: 'React was created by Jordan Walke at Facebook. It changed how developers think about user interfaces by introducing declarative component trees and unidirectional data flow...'
  }
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [borrowedList, setBorrowedList] = useState([]);
  const [activeModalBook, setActiveModalBook] = useState(null);
  const [readingBook, setReadingBook] = useState(null);
  const [showShelf, setShowShelf] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [toastMessage, setToastMessage] = useState('');

  // Review Form State
  const [reviews, setReviews] = useState({
    1: [{ user: 'Student A', comment: 'Essential for learning proper code structure!', stars: 5 }]
  });
  const [reviewName, setReviewName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewStars, setReviewStars] = useState(5);

  const categories = ['All', 'Computer Science', 'Data Science', 'Mathematics', 'Software Engineering', 'Web Development'];

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleBorrow = (book) => {
    if (!borrowedList.some((b) => b.id === book.id)) {
      setBorrowedList([...borrowedList, { ...book, borrowDate: new Date().toLocaleDateString() }]);
      showToast(`✅ "${book.title.slice(0, 24)}..." added to your shelf!`);
    }
  };

  const handleReturn = (bookId) => {
    setBorrowedList(borrowedList.filter((b) => b.id !== bookId));
    showToast('↩️ Book returned successfully.');
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewText.trim()) return;
    const bookId = activeModalBook.id;
    const newEntry = { user: reviewName, comment: reviewText, stars: reviewStars };
    setReviews({
      ...reviews,
      [bookId]: [...(reviews[bookId] || []), newEntry]
    });
    setReviewName('');
    setReviewText('');
    showToast('⭐ Review submitted!');
  };

  const filteredBooks = INITIAL_BOOKS.filter((book) => {
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ fontFamily: 'Segoe UI, Roboto, system-ui, sans-serif', background: '#0f172a', minHeight: '100vh', color: '#f8fafc' }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{ position: 'fixed', top: '20px', right: '20px', background: '#3b82f6', color: '#fff', padding: '12px 20px', borderRadius: '8px', zIndex: 9999, fontWeight: 600, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)' }}>
          {toastMessage}
        </div>
      )}

      {/* Top Navbar */}
      <header style={{ background: '#1e293b', borderBottom: '1px solid #334155', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '22px', color: '#38bdf8' }}>📚 E-Library & Academic Hub</h2>
          <small style={{ color: '#94a3b8' }}>Developer: <strong style={{ color: '#f1f5f9' }}>Girish Narayan</strong> | FSJP React SPA Assignment</small>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button 
            onClick={() => setShowShelf(!showShelf)}
            style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <span>My Shelf</span>
            <span style={{ background: '#1e40af', padding: '2px 8px', borderRadius: '12px', fontSize: '13px' }}>{borrowedList.length}</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ maxWidth: '1200px', margin: '24px auto', padding: '0 20px' }}>
        {/* Banner with Stats */}
        <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', border: '1px solid #334155', borderRadius: '12px', padding: '24px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '20px' }}>Welcome to your Digital Academic Library</h3>
            <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px' }}>Search textbooks, read sample chapters online, and manage borrowed coursework materials.</p>
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ textAlign: 'center', background: '#334155', padding: '10px 16px', borderRadius: '8px' }}>
              <div style={{ fontSize: '20px', fontWeight: 700, color: '#38bdf8' }}>{INITIAL_BOOKS.length}</div>
              <div style={{ fontSize: '12px', color: '#cbd5e1' }}>Total Catalog</div>
            </div>
            <div style={{ textAlign: 'center', background: '#334155', padding: '10px 16px', borderRadius: '8px' }}>
              <div style={{ fontSize: '20px', fontWeight: 700, color: '#4ade80' }}>{borrowedList.length}</div>
              <div style={{ fontSize: '12px', color: '#cbd5e1' }}>Active Loans</div>
            </div>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div style={{ background: '#1e293b', padding: '16px 20px', borderRadius: '12px', border: '1px solid #334155', marginBottom: '24px' }}>
          <input 
            type="text" 
            placeholder="🔍 Search titles, authors, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #475569', background: '#0f172a', color: '#fff', fontSize: '15px', marginBottom: '16px', boxSizing: 'border-box' }}
          />

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: 'none',
                  background: selectedCategory === cat ? '#38bdf8' : '#334155',
                  color: selectedCategory === cat ? '#0f172a' : '#cbd5e1',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '13px',
                  transition: '0.2s'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Shelf Drawer Panel */}
        {showShelf && (
          <div style={{ background: '#1e293b', border: '2px solid #38bdf8', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, color: '#38bdf8' }}>📥 My Borrowed Shelf ({borrowedList.length} Books on Loan)</h3>
              <button onClick={() => setShowShelf(false)} style={{ background: 'transparent', color: '#94a3b8', border: 'none', cursor: 'pointer', fontSize: '18px' }}>✕</button>
            </div>
            {borrowedList.length === 0 ? (
              <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '12px' }}>Your shelf is currently empty. Click "Borrow / Add to Shelf" on any textbook below.</p>
            ) : (
              <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
                {borrowedList.map((b) => (
                  <div key={b.id} style={{ background: '#0f172a', padding: '12px 16px', borderRadius: '8px', border: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '14px' }}>{b.title}</div>
                      <small style={{ color: '#94a3b8' }}>Borrowed: {b.borrowDate}</small>
                    </div>
                    <button 
                      onClick={() => handleReturn(b.id)} 
                      style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
                    >
                      Return
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Card Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {filteredBooks.map((book) => (
            <div key={book.id} style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ background: '#0f172a', color: '#38bdf8', fontSize: '11px', padding: '4px 10px', borderRadius: '6px', fontWeight: 700 }}>{book.category}</span>
                  <span style={{ fontSize: '13px', color: '#fbbf24', fontWeight: 600 }}>⭐ {book.rating}</span>
                </div>
                <h4 style={{ margin: '8px 0', fontSize: '17px', color: '#f8fafc' }}>{book.title}</h4>
                <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#94a3b8' }}>Author: {book.author}</p>
                <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.5', marginBottom: '16px' }}>{book.description}</p>
              </div>

              <div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <button 
                    onClick={() => setActiveModalBook(book)}
                    style={{ flex: 1, padding: '10px', background: '#334155', color: '#f8fafc', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}
                  >
                    📖 Details & Reviews
                  </button>
                  <button 
                    onClick={() => setReadingBook(book)}
                    style={{ flex: 1, padding: '10px', background: '#0284c7', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}
                  >
                    👀 Read Online
                  </button>
                </div>
                <button 
                  onClick={() => handleBorrow(book)}
                  disabled={borrowedList.some((b) => b.id === book.id)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    background: borrowedList.some((b) => b.id === book.id) ? '#475569' : '#22c55e',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: borrowedList.some((b) => b.id === book.id) ? 'not-allowed' : 'pointer',
                    fontWeight: 700,
                    fontSize: '13px'
                  }}
                >
                  {borrowedList.some((b) => b.id === book.id) ? '✓ In Your Shelf' : '+ Borrow / Add to Shelf'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal 1: Details & Review Submission */}
      {activeModalBook && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', zIndex: 1000 }}>
          <div style={{ background: '#1e293b', maxWidth: '520px', width: '100%', borderRadius: '12px', padding: '24px', border: '1px solid #475569', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', color: '#38bdf8' }}>{activeModalBook.title}</h3>
                <small style={{ color: '#94a3b8' }}>{activeModalBook.author} | ISBN: {activeModalBook.isbn}</small>
              </div>
              <button onClick={() => setActiveModalBook(null)} style={{ background: 'transparent', color: '#94a3b8', border: 'none', fontSize: '18px', cursor: 'pointer' }}>✕</button>
            </div>

            <hr style={{ border: 0, borderTop: '1px solid #334155', margin: '16px 0' }} />

            <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#f1f5f9' }}>Table of Contents:</h4>
            <ul style={{ paddingLeft: '20px', fontSize: '13px', color: '#cbd5e1', lineHeight: '1.6' }}>
              {activeModalBook.chapters.map((ch, idx) => <li key={idx}>{ch}</li>)}
            </ul>

            <h4 style={{ margin: '16px 0 8px 0', fontSize: '14px', color: '#f1f5f9' }}>Student Reviews:</h4>
            <div style={{ background: '#0f172a', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>
              {(reviews[activeModalBook.id] || []).length === 0 ? (
                <div style={{ fontSize: '13px', color: '#94a3b8' }}>No reviews yet. Be the first to leave one below!</div>
              ) : (
                (reviews[activeModalBook.id] || []).map((rev, i) => (
                  <div key={i} style={{ marginBottom: '8px', fontSize: '13px' }}>
                    <strong>{rev.user}</strong> <span style={{ color: '#fbbf24' }}>{'⭐'.repeat(rev.stars)}</span>
                    <div style={{ color: '#cbd5e1' }}>{rev.comment}</div>
                  </div>
                ))
              )}
            </div>

            {/* Leave a review form */}
            <form onSubmit={handleAddReview} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input 
                type="text" 
                placeholder="Your Name (e.g., Girish)" 
                value={reviewName} 
                onChange={(e) => setReviewName(e.target.value)} 
                style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #475569', background: '#0f172a', color: '#fff', fontSize: '13px' }}
              />
              <textarea 
                placeholder="Write your brief review of this textbook..." 
                value={reviewText} 
                onChange={(e) => setReviewText(e.target.value)} 
                rows="2" 
                style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #475569', background: '#0f172a', color: '#fff', fontSize: '13px' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <select value={reviewStars} onChange={(e) => setReviewStars(Number(e.target.value))} style={{ padding: '6px', borderRadius: '6px', background: '#0f172a', color: '#fff', border: '1px solid #475569' }}>
                  <option value={5}>5 Stars ⭐⭐⭐⭐⭐</option>
                  <option value={4}>4 Stars ⭐⭐⭐⭐</option>
                  <option value={3}>3 Stars ⭐⭐⭐</option>
                </select>
                <button type="submit" style={{ padding: '8px 16px', background: '#38bdf8', color: '#0f172a', border: 'none', borderRadius: '6px', fontWeight: 700, cursor: 'pointer' }}>
                  Post Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Live Chapter Reader */}
      {readingBook && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', zIndex: 1000 }}>
          <div style={{ background: '#1e293b', maxWidth: '650px', width: '100%', borderRadius: '12px', padding: '28px', border: '1px solid #475569' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <span style={{ background: '#0284c7', color: '#fff', fontSize: '11px', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>ONLINE READER</span>
                <h3 style={{ margin: '6px 0 0 0', color: '#38bdf8' }}>{readingBook.title}</h3>
              </div>
              <button onClick={() => setReadingBook(null)} style={{ background: 'transparent', color: '#94a3b8', border: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>
            </div>

            {/* Reader Controls */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', background: '#0f172a', padding: '8px 16px', borderRadius: '8px', marginBottom: '16px' }}>
              <span style={{ fontSize: '13px', color: '#94a3b8' }}>Font Size:</span>
              <button onClick={() => setFontSize(Math.max(12, fontSize - 2))} style={{ padding: '4px 8px', background: '#334155', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>A-</button>
              <span style={{ fontSize: '13px', fontWeight: 600 }}>{fontSize}px</span>
              <button onClick={() => setFontSize(Math.min(24, fontSize + 2))} style={{ padding: '4px 8px', background: '#334155', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>A+</button>
              <span style={{ marginLeft: 'auto', fontSize: '13px', color: '#4ade80' }}>● Chapter 1 Sample Loaded</span>
            </div>

            <div style={{ background: '#0f172a', padding: '20px', borderRadius: '8px', border: '1px solid #334155', fontSize: `${fontSize}px`, lineHeight: '1.7', color: '#e2e8f0', minHeight: '160px' }}>
              {readingBook.sampleText}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button onClick={() => setReadingBook(null)} style={{ padding: '8px 20px', background: '#334155', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>
                Close Reader
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
