import { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from '../../redux/features/favorites/favoriteSlice';
import {
  addFavoriteToLocalStorage,
  getFavoritesFromLocalStorage,
  removeFavoriteFromLocalStorage,
} from '../../Utils/localStorage';

const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    dispatch(setFavorites(favoritesFromLocalStorage));
    setIsFavorite(favoritesFromLocalStorage.some((p) => p._id === product._id));
  }, [dispatch, product]);

  const toggleFavorites = () => {
    setIsFavorite(!isFavorite);
    if (isFavorite) {
      dispatch(removeFromFavorites(product));
      removeFavoriteFromLocalStorage(product._id);
    } else {
      dispatch(addToFavorites(product));
      addFavoriteToLocalStorage(product);
    }
  };

  return (
    <div
      className='absolute top-2 right-5 cursor-pointer'
      onClick={toggleFavorites}>
      {isFavorite ? (
        <FaHeart className='text-pink-500' />
      ) : (
        <FaRegHeart className='text-white' />
      )}
    </div>
  );
};

export default HeartIcon;
