// 1. IMPORT ALL YOUR LOCAL IMAGES IN ONE PLACE
import b1 from '../assets/book1.jpg'; 
import b2 from '../assets/book2.jpg';
import b3 from '../assets/book3.jpg';
import b4 from '../assets/book4.jpg';
import b5 from '../assets/book5.jpg';
import b6 from '../assets/book6.jpg';
import b7 from '../assets/book7.jpg';
import b8 from '../assets/book8.jpg';
import b9 from '../assets/book9.jpg';
import b10 from '../assets/book10.jpg';
import b11 from '../assets/book11.jpg';

// 2. THE MASTER DATA ENGINE STORAGE ARRAY
export const allBooks = [
    // Flash Sale Book Array Blocks (IDs 1-6)
    { id: 1, title: "Milk and Honey", price: 12, img: b1, tag: "Bestseller", author: "Rupi Kaur", desc: "A collection of poetry and prose about survival. About the experience of violence, abuse, love, loss, and femininity." },
    { id: 2, title: "Matt Ridely", price: 15, img: b2, tag: "Trending", author: "Matt Ridley", desc: "An evolutionary journey exploring innovation, human nature, and how ideas spread and mutate across global cultures." },
    { id: 3, title: "Cover Book Mockup", price: 10, img: b3, tag: "Trending", author: "Design Studio", desc: "A premium minimalist structural layout designed for high-end graphic showcases and modern publishing standards." },
    { id: 4, title: "Book Mockup", price: 18, img: b4, tag: "Hot", author: "Studio Press", desc: "The foundational layout blueprint featuring standard dimensional aspects for upcoming creative physical releases." },
    { id: 5, title: "Being the Red Flag", price: 20, img: b5, tag: "New Release", author: "A. K. Vlad", desc: "A gripping modern psychological drama analyzing complex human dynamics, modern relationship red flags, and personal transformations." },
    { id: 6, title: "Automun", price: 15, img: b6, tag: "Fresh In", author: "Marcus Woods", desc: "A cozy seasonal collection of short narratives exploring changes, crisp environments, and nostalgic architectural aesthetics." },
    
    // New Arrivals / Recently Added Blocks (IDs 7-11)
    { id: 7, title: "One Last Good Day", price: 25, img: b7, tag: "Must Read", author: "Sarah Jenkins", desc: "An emotional, fast-paced philosophical fiction looking deep into a single character's final transformative 24 hours on earth." },
    { id: 8, title: "Create Your Own Business", price: 30, img: b8, tag: "Hot", author: "Studio Press", desc: "An altered variation layout featuring distinct textured finishes and vintage color calibrations for premium publishing." },
    { id: 9, title: "The Psychology of Money", price: 35, img: b9, tag: "New Release", author: "A. K. Vlad", desc: "The direct sequel expanding the complex psychological saga into global territories and corporate underground structures." },
    { id: 10, title: "A Love Story", price: 25, img: b10, tag: "Fresh In", author: "Marcus Woods", desc: "Expanded paperback release containing unreleased sketch layouts, author commentary tracks, and bonus conceptual poetry." },
    { id: 11, title: "The Bike Guy", price: 26, img: b11, tag: "Must Read", author: "Sarah Jenkins", desc: "The heavy premium hardcover compilation including gold-leaf edge details and exclusive high-fidelity illustration inserts." }
];

// ==========================================
// FIX ENGINE: ALIAS EXPORTS FOR MAXIMUM CRASH SAFETY
// This ensures components looking for 'books' OR 'allBooks' find the data.
// ==========================================
export const books = allBooks; 

// Universal default fallback export
export default allBooks;