import { 
  FaTshirt, FaCannabis, FaPaintBrush, FaCoffee, FaUtensils, FaShoppingCart,
  FaPrescriptionBottleAlt, FaTree, FaHiking, FaSpa, FaHotel, FaGlassMartiniAlt,
  FaSmoking, FaLandmark, FaMusic, FaEnvelope, FaBalanceScale, FaHeartbeat,
  FaFilm, FaLaptopCode, FaUniversity, FaPalette, FaGem, FaHotTub, FaChurch,
  FaCar, FaCampground, FaHandHoldingHeart
} from 'react-icons/fa';
import { MdLocalGroceryStore } from 'react-icons/md';

export const subcategoryIcons = {
  1: FaTshirt,        // Clothing
  2: FaCannabis,      // Cannabis
  3: FaPaintBrush,    // Gallery
  5: FaCoffee,        // Cafe
  6: FaUtensils,      // Restaurant
  7: MdLocalGroceryStore, // Grocery
  8: FaPrescriptionBottleAlt, // Pharmacy
  9: FaTree,          // Park
  10: FaHiking,       // Outfitter
  11: FaSpa,          // Spa Hotel
  12: FaHotel,        // Hotel
  13: FaGlassMartiniAlt, // Bar
  14: FaSmoking,      // Smoke Shop
  15: FaLandmark,     // Museum
  16: FaMusic,        // Venue
  17: FaEnvelope,     // Mail
  18: FaBalanceScale, // Legal
  19: FaHeartbeat,    // Health
  20: FaFilm,         // Movies
  21: FaLaptopCode,   // CoWorking
  22: FaUniversity,   // Bank
  23: FaPalette,      // Art Store
  24: FaGem,          // Gems
  25: FaHotTub,       // Hot Spring
  26: FaChurch,       // Church
  27: FaCar,          // Auto
  28: FaCampground,   // Campground
  29: FaHandHoldingHeart // Food Bank
};

export const getIconForSubcategory = (subcategoryId) => {
  return subcategoryIcons[subcategoryId] || FaShoppingCart; // Default icon
};