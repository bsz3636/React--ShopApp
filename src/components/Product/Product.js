import styles from './Product.module.scss';
import clsx from 'clsx';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';

const Product = props => {

  const [currentColor, setCurrentColor] = useState(props.colors[0])
  
  const [currentSize, setCurrentSize] = useState(props.sizes[0].name)
 
  const getPrice = () => {
    const clickedSize = props.sizes.find(element => element.name === currentSize)
    return props.basePrice + clickedSize.additionalPrice;
  }

  const prepareColorClassName = color => {
    return styles['color' + color[0].toUpperCase() + color.substr(1).toLowerCase()];
  }

  const handleSubmit = e => {
    e.preventDefault();
    console.log ('Summary');
    console.log ('=============');
    console.log ('Name: ',props.title);
    console.log ('Price: ',getPrice());
    console.log ('Size: ', currentSize);
    console.log ('Color: ', currentColor);
  };

  return (
    <article className={styles.product}>
      <div className={styles.imageContainer}>
        <img 
          className={styles.image}
          alt={props.title}
          src={`${process.env.PUBLIC_URL}/images/products/shirt-${props.name}--${currentColor}.jpg`} />
      </div>
      <div>
        <header>
          <h2 className={styles.name}>{props.title}</h2>
          <span className={styles.price}>{getPrice()} $</span>
        </header>
        <form onSubmit={handleSubmit}>
          <div className={styles.sizes}>
            <h3 className={styles.optionLabel}>Sizes</h3>
            <ul className={styles.choices}>
            
              {props.sizes.map(size => <li key={size.name}><button type="button" onClick={e => setCurrentSize(size.name)} className={clsx(currentSize === size.name && styles.active)}>{size.name}</button></li>)}

            </ul>
          </div>
          <div className={styles.colors}>
            <h3 className={styles.optionLabel}>Colors</h3>
            <ul className={styles.choices}>

              {props.colors.map(color => <li key={color.name} ><button type="button"onClick={e => setCurrentColor(color)} className={clsx(prepareColorClassName(color), currentColor === color && styles.active)} /></li>)}
            
            </ul>
          </div>
          <Button className={styles.button}>
            <span className="fa fa-shopping-cart" />
          </Button>
        </form>
      </div>
    </article>
  )
  /*
  Product.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
  };*/
};

export default Product;