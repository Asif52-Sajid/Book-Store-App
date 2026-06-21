import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = ({ books, setBooks, categories, setCategories }) => {
    const navigate = useNavigate();

    // --- SECURITY SYSTEM ---
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');
    const [loginError, setLoginError] = useState('');
    const ADMIN_PASSWORD = "01862871766"; 

    // --- FORM STATES FOR NEW BOOK ---
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [tag, setTag] = useState('');
    const [description, setDescription] = useState('');
    const [publishedDate, setPublishedDate] = useState('');
    
    // Multi-Category Selection Array State
    const [selectedCategories, setSelectedCategories] = useState([]);
    
    // New Category Text Input State (Moved up for clean initialization)
    const [newCategoryName, setNewCategoryName] = useState('');
    
    // Desktop Image Storage State
    const [imagePreview, setImagePreview] = useState(null);

    // --- CUSTOM MODAL SYSTEM STATE ---
    const [modal, setModal] = useState({
        isOpen: false,
        type: 'alert', // 'alert' or 'confirm'
        title: '',
        message: '',
        onConfirm: null
    });

    const triggerPopup = (type, title, message, onConfirm = null) => {
        setModal({ isOpen: true, type, title, message, onConfirm });
    };

    const closeModal = () => {
        setModal({ isOpen: false, type: 'alert', title: '', message: '', onConfirm: null });
    };

    // Toggle Category Selection Handler
    const handleCategoryToggle = (categoryName) => {
        if (selectedCategories.includes(categoryName)) {
            setSelectedCategories(selectedCategories.filter(cat => cat !== categoryName));
        } else {
            setSelectedCategories([...selectedCategories, categoryName]);
        }
    };

    // 1. Handle Secret Password Check
    const handleAdminLogin = (e) => {
        e.preventDefault();
        if (passwordInput === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            setLoginError('');
        } else {
            setLoginError('❌ Access Denied! Wrong Admin Password.');
        }
    };

    // 2. Convert Desktop File Upload into Live Base64 String Data
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); 
            };
            reader.readAsDataURL(file);
        }
    };

    // 3. Handle Creating a Brand New Category Option
    const handleAddCategory = (e) => {
        e.preventDefault();
        const cleanName = newCategoryName.trim();
        if (cleanName && !categories.includes(cleanName)) {
            setCategories([...categories, cleanName]);
            setNewCategoryName('');
            triggerPopup('alert', '✨ SUCCESS', `"${cleanName.toUpperCase()}" category has been dynamically created!`);
        }
    };

    // 🗑️ 4. Handle Deleting an Existing Category
    const handleDeleteCategory = (categoryToDelete) => {
        if (categoryToDelete === "All") {
            triggerPopup('alert', '⚠️ RESTRICTED ACTION', "The baseline core 'All' navigation row filter cannot be deleted!");
            return;
        }
        
        triggerPopup(
            'confirm',
            '🗑️ ERASE CATEGORY',
            `Are you sure you want to permanently delete the category "${categoryToDelete}"? This will remove it from any assigned books.`,
            () => {
                setCategories(categories.filter(cat => cat !== categoryToDelete));
                setSelectedCategories(selectedCategories.filter(cat => cat !== categoryToDelete));
                
                // Update existing books to strip out deleted category references
                const updatedBooks = books.map(book => ({
                    ...book,
                    categories: (book.categories || []).filter(cat => cat !== categoryToDelete)
                }));
                setBooks(updatedBooks);
            }
        );
    };

    // 5. Handle Submitting and Publishing the Dynamic Book Product Card
    const handleAddBook = (e) => {
        e.preventDefault();

        if (selectedCategories.length === 0) {
            triggerPopup('alert', '⚠️ SELECTION REQUIRED', 'Please assign at least one category to this book asset before publishing.');
            return;
        }
        
        const newBook = {
            id: Date.now(), 
            title: title.toUpperCase(),
            author: author.toUpperCase(), 
            price: Number(price),
            img: imagePreview || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600",
            tag: tag.toUpperCase(),
            categories: selectedCategories, // Saved array payload mapping data dependencies
            category: selectedCategories[0] || 'General', // Fallback property to preserve legacy components if needed
            description: description, 
            publishedDate: publishedDate || new Date().toISOString().split('T')[0] 
        };

        setBooks([...books, newBook]);
        
        // Reset Inputs
        setTitle('');
        setAuthor('');
        setPrice('');
        setTag('');
        setDescription('');
        setPublishedDate('');
        setImagePreview(null);
        setSelectedCategories([]); // Wipe category checklist clean for next upload
        
        triggerPopup('alert', '🎉 SYSTEM PUBLISHED', `"${newBook.title}" by ${newBook.author} has been added to active stock index!`);
    };

    // 🗑️ 6. Handle Deleting a Specific Book
    const handleDeleteBook = (bookId, bookTitle) => {
        triggerPopup(
            'confirm',
            '⚠️ DROP INVENTORY',
            `Are you completely sure you want to drop "${bookTitle}" out of active inventory?`,
            () => {
                setBooks(books.filter(book => book.id !== bookId));
            }
        );
    };

    // --- GATE KEEPER VIEW ---
    if (!isAuthenticated) {
        return (
            <div className="bg-[#222] min-h-screen flex items-center justify-center p-4">
                <div className="bg-white border-4 border-black p-8 rounded-[2rem] shadow-[8px_8px_0px_0px_#ff6b6b] max-w-md w-full text-center">
                    <span className="text-4xl">🔒</span>
                    <h2 className="text-2xl font-[1000] uppercase italic tracking-tighter mt-2 mb-6">
                        RESTRICTED <span className="text-[#ff6b6b]">AREA</span>
                    </h2>
                    <form onSubmit={handleAdminLogin} className="space-y-4">
                        <input 
                            type="password" required value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)}
                            placeholder="Enter Secret Admin Password" className="w-full bg-[#f8f9fa] border-3 border-black p-3 rounded-xl font-bold text-center"
                        />
                        {loginError && <p className="text-red-500 text-xs font-black">{loginError}</p>}
                        <button type="submit" className="w-full bg-[#ff6b6b] text-white font-black uppercase py-3 rounded-xl border-3 border-black shadow-[4px_4px_0px_0px_#222]">
                            Verify Credentials →
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#f8f9fa] min-h-screen py-12 px-4 text-[#222]">
            <div className="max-w-5xl mx-auto space-y-12">
                
                {/* Header Layout Control Block */}
                <div className="border-b-4 border-[#222] pb-6 flex items-center justify-between gap-4 flex-wrap">
                    <h1 className="text-3xl md:text-5xl font-[1000] uppercase italic tracking-tighter">
                        ADMIN <span className="text-[#64d4ac]">VERIFIED</span>
                    </h1>
                    <button onClick={() => navigate('/')} className="bg-white border-3 border-[#222] px-4 py-2 font-black uppercase text-xs rounded-xl shadow-[3px_3px_0px_0px_#222]">
                        ← Exit Dashboard
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* LEFT SIDEBAR SECTION */}
                    <div className="space-y-6">
                        {/* Form: Manage Categories */}
                        <div className="bg-white border-4 border-[#222] p-6 rounded-[2rem] shadow-[6px_6px_0px_0px_#222]">
                            <h3 className="font-black text-sm uppercase tracking-wide border-b-2 border-dashed border-gray-200 pb-2 mb-4">Manage Global Categories</h3>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                                {categories.map((cat, index) => (
                                    <div key={index} className="flex items-center gap-1.5 bg-[#f8f9fa] border-2 border-black px-2 py-1 rounded-lg text-xs font-black uppercase">
                                        <span>{cat}</span>
                                        {cat !== "All" && (
                                            <button 
                                                type="button" onClick={() => handleDeleteCategory(cat)}
                                                className="text-red-500 hover:text-red-700 font-bold ml-0.5 text-sm"
                                            >
                                                &times;
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <form onSubmit={handleAddCategory} className="space-y-4">
                                <input 
                                    type="text" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)}
                                    placeholder="e.g., MANGA" className="w-full bg-[#f8f9fa] border-3 border-[#222] p-2.5 rounded-xl text-xs font-bold"
                                />
                                <button type="submit" className="w-full bg-[#64d4ac] text-[#222] font-black uppercase text-xs p-3 rounded-xl border-3 border-[#222] shadow-[3px_3px_0px_0px_#222]">+ Add Category</button>
                            </form>
                        </div>

                        {/* Image Preview Window Area */}
                        <div className="bg-white border-4 border-[#222] p-4 rounded-[2rem] shadow-[6px_6px_0px_0px_#222] text-center">
                            <h4 className="font-black text-xs uppercase mb-2 text-gray-400">Cover Upload Preview</h4>
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto object-cover rounded-xl border-2 border-black" />
                            ) : (
                                <div className="border-4 border-dashed border-gray-200 h-40 rounded-xl flex items-center justify-center text-xs text-gray-400 font-bold bg-[#f8f9fa]">No File Chosen Yet</div>
                            )}
                        </div>
                    </div>

                    {/* MAIN CONTENT FORM MODULE */}
                    <div className="md:col-span-2 bg-white border-4 border-[#222] p-6 md:p-8 rounded-[2.5rem] shadow-[8px_8px_0px_0px_#222]">
                        <h3 className="font-black text-lg uppercase border-b-4 border-[#222] pb-3 mb-6">📖 Upload New Book Asset</h3>
                        
                        <form onSubmit={handleAddBook} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            
                            <div className="sm:col-span-2">
                                <label className="block text-xs font-black uppercase mb-1">Select Cover Image From Desktop</label>
                                <input 
                                    type="file" accept="image/*" onChange={handleImageUpload}
                                    className="w-full bg-[#f8f9fa] border-3 border-[#222] p-2 rounded-xl font-bold text-xs file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-black file:bg-[#222] file:text-white"
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-xs font-black uppercase mb-1">Book Title</label>
                                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="THE AMAZING SCI-FI NOVEL" className="w-full bg-[#f8f9fa] border-3 border-[#222] p-3 rounded-xl font-bold" />
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-xs font-black uppercase mb-1">Author Name (Can write multiple books)</label>
                                <input type="text" required value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="STEPHEN KING" className="w-full bg-[#f8f9fa] border-3 border-[#222] p-3 rounded-xl font-bold" />
                            </div>

                            {/* STYLISH INTERACTIVE MULTI-SELECT CATEGORY CHECKBOX GRID */}
                            <div className="sm:col-span-2">
                                <label className="block text-xs font-black uppercase mb-2">Assign Target Rows / Categories (Select All That Apply)</label>
                                <div className="border-3 border-[#222] bg-[#f8f9fa] p-4 rounded-xl max-h-40 overflow-y-auto grid grid-cols-2 gap-2">
                                    {categories.filter(c => c !== "All").map((cat, idx) => {
                                        const isChecked = selectedCategories.includes(cat);
                                        return (
                                            <button
                                                key={idx} type="button" onClick={() => handleCategoryToggle(cat)}
                                                className={`flex items-center justify-between border-2 border-black p-2 rounded-lg text-xs font-black uppercase transition-all ${
                                                    isChecked 
                                                    ? 'bg-[#64d4ac] shadow-[2px_2px_0px_0px_#222] translate-x-[-2px] translate-y-[-2px]' 
                                                    : 'bg-white hover:bg-gray-100'
                                                }`}
                                            >
                                                <span>{cat}</span>
                                                <span>{isChecked ? '✅' : '⬜'}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-black uppercase mb-1">Retail Price ($)</label>
                                <input type="number" required value={price} onChange={(e) => setPrice(e.target.value)} placeholder="19" className="w-full bg-[#f8f9fa] border-3 border-[#222] p-3 rounded-xl font-bold" />
                            </div>

                            <div>
                                <label className="block text-xs font-black uppercase mb-1">Card Badge Tag (Optional)</label>
                                <input type="text" value={tag} onChange={(e) => setTag(e.target.value)} placeholder="e.g., HOT, NEW" className="w-full bg-[#f8f9fa] border-3 border-[#222] p-3 rounded-xl font-bold" />
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-xs font-black uppercase mb-1">Publication Release Date</label>
                                <input type="date" value={publishedDate} onChange={(e) => setPublishedDate(e.target.value)} className="w-full bg-[#f8f9fa] border-3 border-[#222] p-3 rounded-xl font-bold" />
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-xs font-black uppercase mb-1">Book Summary / Description</label>
                                <textarea rows="4" required value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Provide summary..." className="w-full bg-[#f8f9fa] border-3 border-[#222] p-3 rounded-xl font-medium text-sm" />
                            </div>

                            <div className="sm:col-span-2 pt-2">
                                <button type="submit" className="w-full bg-[#64d4ac] text-[#222] font-black uppercase py-4 rounded-2xl border-4 border-[#222] shadow-[5px_5px_0px_0px_#222]">
                                    💾 Save & Publish Product Live
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* --- REAL-TIME LIVE INVENTORY TRACKING SECTION --- */}
                <div className="bg-white border-4 border-[#222] p-6 md:p-8 rounded-[2.5rem] shadow-[8px_8px_0px_0px_#222]">
                    <h3 className="font-black text-xl uppercase italic pb-3 border-b-4 border-[#222] mb-6 flex items-center justify-between">
                        <span>📦 Current Storefront Inventory</span>
                        <span className="text-sm bg-[#64d4ac] border-2 border-black px-3 py-1 rounded-xl shadow-[2px_2px_0px_0px_#222] normal-case font-bold">
                            Total: {books.length} items
                        </span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {books.map((book) => (
                            <div 
                                key={book.id} 
                                className="bg-[#f8f9fa] border-3 border-[#222] p-4 rounded-2xl flex flex-col justify-between shadow-[4px_4px_0px_0px_#222] hover:translate-y-0.5 hover:shadow-none transition-all"
                            >
                                <div className="flex gap-4 items-start mb-4">
                                    <img 
                                        src={book.img} alt={book.title} 
                                        className="w-16 h-20 object-cover rounded-xl border-2 border-black bg-white shrink-0 shadow-[2px_2px_0px_0px_#222]" 
                                    />
                                    <div className="min-w-0 flex-1">
                                        <h4 className="font-[1000] text-sm uppercase tracking-tight text-gray-900 truncate" title={book.title}>
                                            {book.title}
                                        </h4>
                                        <p className="text-xs text-gray-500 font-bold truncate">by {book.author}</p>
                                        
                                        {/* Multi-Category Badge Rendering Row */}
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {(book.categories || [book.category]).map((c, i) => (
                                                <span key={i} className="text-[8px] font-black bg-[#64d4ac]/20 text-[#222] border border-black px-1.5 py-0.5 rounded-md uppercase">
                                                    {c || "General"}
                                                </span>
                                            ))}
                                            <span className="text-[8px] font-black bg-[#ff6b6b] text-white border border-black px-1.5 py-0.5 rounded-md">
                                                ${book.price}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <button 
                                    type="button" onClick={() => handleDeleteBook(book.id, book.title)}
                                    className="w-full bg-[#ff6b6b]/10 text-red-600 hover:bg-[#ff6b6b] hover:text-white border-2 border-red-600 py-1.5 rounded-xl font-black uppercase text-xs transition-colors"
                                >
                                    🗑️ Delete Asset
                                </button>
                            </div>
                        ))}
                    </div>

                    {books.length === 0 && (
                        <div className="text-center py-12 bg-[#f8f9fa] rounded-2xl border-4 border-dashed border-gray-200 text-gray-400 font-bold">
                            No books currently in stock. Use the form above to add your first asset!
                        </div>
                    )}
                </div>

            </div>

            {/* --- CUSTOM NEO-BRUTALIST MODAL COMPONENT --- */}
            {modal.isOpen && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white border-4 border-black p-6 md:p-8 rounded-[2rem] shadow-[8px_8px_0px_0px_#222] max-w-md w-full">
                        <h3 className="text-xl font-[1000] uppercase tracking-tighter border-b-4 border-black pb-3 mb-4 text-[#222]">
                            {modal.title}
                        </h3>
                        <p className="text-sm font-bold text-gray-700 mb-6 leading-relaxed">
                            {modal.message}
                        </p>
                        
                        <div className="flex gap-4">
                            {modal.type === 'confirm' ? (
                                <>
                                    <button 
                                        onClick={() => { if (modal.onConfirm) modal.onConfirm(); closeModal(); }}
                                        className="flex-1 bg-[#ff6b6b] text-white font-black uppercase py-3 rounded-xl border-3 border-black shadow-[3px_3px_0px_0px_#222]"
                                    >
                                        Yes, Action It
                                    </button>
                                    <button 
                                        onClick={closeModal}
                                        className="flex-1 bg-white text-[#222] font-black uppercase py-3 rounded-xl border-3 border-black shadow-[3px_3px_0px_0px_#222]"
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button 
                                    onClick={closeModal}
                                    className="w-full bg-[#64d4ac] text-[#222] font-black uppercase py-3 rounded-xl border-3 border-black shadow-[3px_3px_0px_0px_#222] text-center"
                                >
                                    Acknowledge & Close
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;