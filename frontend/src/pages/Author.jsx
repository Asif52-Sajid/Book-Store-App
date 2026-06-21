import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { HiOutlineSearch } from 'react-icons/hi';
import { useAppContext } from '../context/AppContext';

// Clean components import straight from the flat components folder
import AuthorCard from '../components/AuthorCard';
import AuthWarningModal from '../components/AuthWarningModal';
import AuthorDossierPanel from '../components/AuthorDossierPanel';
import BookDetailsModal from '../components/BookDetailsModal';

const Author = ({ books }) => {
    const context = useAppContext();
    const user = context?.user || null;

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('ALL');
    const [selectedAuthor, setSelectedAuthor] = useState(null);
    const [selectedBook, setSelectedBook] = useState(null);
    const [showAuthWarning, setShowAuthWarning] = useState(false);

    // CONTROL BACKGROUND DOCUMENT BODY BLEED SCROLLING
    useEffect(() => {
        if (selectedAuthor || selectedBook || showAuthWarning) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedAuthor, selectedBook, showAuthWarning]);

    const safeBooks = Array.isArray(books) ? books : [];
    const uniqueAuthorNames = [...new Set(safeBooks.map(book => book.author).filter(Boolean))];

    const getInitials = (name) => {
        if (!name) return "??";
        const parts = name.split(' ');
        return parts.length >= 2 ? (parts[0][0] + parts[1][0]).toUpperCase() : name.slice(0, 2).toUpperCase();
    };

    const authorsDatabase = uniqueAuthorNames.map((name, index) => {
        const authorBooks = safeBooks.filter(b => b.author?.toLowerCase() === name.toLowerCase());
        const mainCategory = authorBooks[0]?.tag || "Fiction";
        const cardColors = ["bg-[#ffd166]", "bg-[#ff6b6b]", "bg-[#4ea8de]", "bg-[#b5e2fa]"];
        const bios = [
            "Specializing in deep structural worldbuilding, complex alternative narrative flows, and high-fidelity prose design layouts.",
            "An award-winning novelist focused on historical modernism, dark romantic mysteries, and deep thematic character development.",
            "A technical theorist exploring the boundaries of science fiction, synthetic intelligence ethics, and cybernetic prose structures.",
            "Dedicated archivist of biographical non-fiction, exploring historical turning points and underground political movements."
        ];

        return {
            id: index + 1,
            name: name,
            avatarBg: cardColors[index % cardColors.length],
            initials: getInitials(name),
            bio: bios[index % bios.length],
            category: mainCategory.toUpperCase(),
            booksCount: authorBooks.length,
            works: authorBooks,
            followers: Math.floor(1.5 * (index + 2) * 1000)
        };
    });

    const availableCategories = ['ALL', ...new Set(authorsDatabase.map(auth => auth.category))];

    const filteredAuthors = authorsDatabase.filter(author => {
        const matchesSearch = author.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'ALL' || author.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleViewDossier = (author) => {
        if (!user) {
            setShowAuthWarning(true);
        } else {
            setSelectedAuthor(author);
        }
    };

    return (
        <div className="bg-[#fafafa] min-h-screen text-[#222] pb-24 pt-12 font-['Work_Sans']">
            <div className="w-[92%] lg:w-[85%] mx-auto space-y-10">
                
                {/* PAGE HEADER */}
                <div className="text-left max-w-xl space-y-2">
                    <h1 className="text-4xl md:text-5xl font-[1000] uppercase tracking-tighter italic leading-none">
                        CREATOR <span className="text-[#64d4ac]">DIRECTORY</span>
                    </h1>
                    <p className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wider">
                        Explore verified publication records, active text archives and author profiles.
                    </p>
                </div>

                {/* SEARCH AND FILTERS */}
                <div className="space-y-6">
                    <div className="relative max-w-md w-full">
                        <input 
                            type="text"
                            placeholder="SEARCH CREATORS BY NAME..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border-4 border-[#222] px-5 py-4 pl-12 rounded-2xl font-black text-sm uppercase tracking-wider placeholder-gray-400 focus:outline-none shadow-[4px_4px_0px_0px_#222] focus:shadow-none focus:translate-x-0.5 focus:translate-y-0.5 transition-all"
                        />
                        <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#222]" size={22} />
                    </div>

                    <div className="flex flex-wrap gap-3 items-center justify-start">
                        {availableCategories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl border-2 border-[#222] transition-all shadow-[2px_2px_0px_0px_#222] ${
                                    selectedCategory === cat 
                                    ? "bg-[#64d4ac] text-[#222] translate-x-0.5 translate-y-0.5 shadow-none" 
                                    : "bg-white text-[#222] hover:bg-gray-50"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* CREATOR GRID SYSTEM */}
                {filteredAuthors.length === 0 ? (
                    <div className="bg-white border-4 border-[#222] p-12 rounded-2xl border-dashed text-center font-bold text-gray-400">
                        NO VERIFIED CREATORS MATCH YOUR FILTER CRITERIA
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredAuthors.map((author, idx) => (
                            <AuthorCard 
                                key={author.id}
                                author={author}
                                idx={idx}
                                user={user}
                                onClick={() => handleViewDossier(author)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* DYNAMIC WINDOW MODAL MOUNT INTERFACES */}
            <AnimatePresence>
                <AuthWarningModal 
                    isOpen={showAuthWarning} 
                    onClose={() => setShowAuthWarning(false)} 
                />

                <AuthorDossierPanel 
                    author={selectedAuthor} 
                    onClose={() => setSelectedAuthor(null)} 
                    onSelectBook={(book) => setSelectedBook(book)} 
                />

                <BookDetailsModal 
                    book={selectedBook} 
                    onClose={() => setSelectedBook(null)} 
                    onDismissAll={() => {
                        setSelectedBook(null);   
                        setSelectedAuthor(null); 
                    }}
                />
            </AnimatePresence>
        </div>
    );
};

export default Author;