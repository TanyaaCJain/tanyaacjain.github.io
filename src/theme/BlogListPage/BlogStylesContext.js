import { createContext, useContext } from 'react';
import baseStyles from './styles.module.css';

export const BlogStylesContext = createContext(baseStyles);
export const useBlogStyles = () => useContext(BlogStylesContext);
