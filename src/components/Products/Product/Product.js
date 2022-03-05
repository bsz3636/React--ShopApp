import styles from './Product.module.scss';
import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import ProductImage from './ProductImage/ProductImage';
import ProductForm from './ProductForm/ProductForm';


const Product = ({title, name, colors, sizes, basePrice}) => {

  const [currentColor, setCurrentColor] = useState(colors[0])
  
  const [currentSize, setCurrentSize] = useState(sizes[0].name)
 
  const price = useMemo (() => {
    const clickedSize = sizes.find(element => element.name === currentSize)
    return basePrice + clickedSize.additionalPrice
  }, [sizes, basePrice, currentSize]);

  const handleSubmit = e => {
    e.preventDefault();
    console.log ('Summary');
    console.log ('=============');
    console.log ('Name: ', title);
    console.log ('Price: ', price);
    console.log ('Size: ', currentSize);
    console.log ('Color: ', currentColor);
  };

  return (
    <article className={styles.product}>
      
      <ProductImage 
        title={title}
        name={name}
        currentColor={currentColor}/>

      <div>
        <header>
          <h2 className={styles.name}>{title}</h2>
          <span className={styles.price}>{price} $</span>
        </header>
        
        <ProductForm
        handleSubmit={handleSubmit}
        sizes={sizes}
        colors={colors}
        currentColor={currentColor}
        currentSize={currentSize}
        setCurrentColor={setCurrentColor}
        setCurrentSize={setCurrentSize} />

      </div>
    </article>
  )
};
  
Product.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  basePrice: PropTypes.number.isRequired,
  sizes: PropTypes.array.isRequired,
  colors: PropTypes.array.isRequired,
};

export default Product;