import { createSlice } from '@reduxjs/toolkit';

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    addToFavorites: (state, action) => {
      // Check if the product is not already in favorites
      const existingProduct = state.find(
        (product) => product._id === action.payload._id
      );
      if (!existingProduct) {
        // Create a new array with the new product added
        return [...state, action.payload];
      }
      // If the product is already in favorites, return the existing state
      return state;
    },
    removeFromFavorites: (state, action) => {
      // Remove the product with the matching ID
      return state.filter((product) => product._id !== action.payload._id);
    },
    setFavorites: (state, action) => {
      // Set the favorites from localStorage
      return action.payload || [];
    },
  },
});

export const { addToFavorites, removeFromFavorites, setFavorites } =
  favoriteSlice.actions;
export const selectFavoriteProduct = (state) => state.favorites;
export default favoriteSlice.reducer;
