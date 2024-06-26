import React, { useCallback, useEffect, useState } from 'react';
import './ProductList.css';
import ProductItem from '../ProductItem/ProductItem';
import { useTelegram } from '../../hooks/useTelegram';
import Button from '../Button/Button';

const productlist = [
  {
    id: 1,
    img: 'fff',
    title: "towar 1",
    description: "sdfdd dfdsfdf df sd fds f",
    price: 100
  },
  {
    id: 2,
    img: 'fff',
    title: "towar 2",
    description: "vcnvkjv jkk v vkjv ",
    price: 150
  },
  {
    id: 3,
    img: 'fff',
    title: "towar 3",
    description: "vcnvkjv jkk v vkjv ",
    price: 50
  },
  {
    id: 4,
    img: 'fff',
    title: "towar 4",
    description: "vcnvkjv jkk v vkjv ",
    price: 250
  }
]

const getTotalPrice = (items = []) => {
  return items.reduce((acc, item) => {
    return acc += item.price
  }, 0);
}

const ProductList = () => {


  const [addedItems, setAddedItems] = useState([]);
  const { tg, queryId } = useTelegram();

  const [lampa, setLampa] = useState("aaa");
  const [lampa1, setLampa1] = useState(queryId);


  const onSendData = useCallback(() => {
    const data = {
      products: addedItems,
      totalPrice: getTotalPrice(addedItems),
      queryId:queryId
    }

    fetch('https://botshop.maz-manipulator.by/web-data',
      {
        method: 'POST',
         headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    )
      .then((response) => {
      setLampa('posle fech')
      setLampa1(response.queryId)
    });
   
  }, [addedItems, queryId])

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData)
    return () => {
      tg.offEvent('mainButtonClicked', onSendData)
    }
  }, [onSendData])


  const testfetch = () => {
     const data = {
      products: "s",
      totalPrice: 10,
      queryId:10
    }

  fetch('https://botshop.maz-manipulator.by/user',
      {
        method: 'POST',
         headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    ).then( (response) => {
      setLampa('test fech')
      setLampa1(response.name)
    });
}


  const onAdd = (product) => {
    const alredyAdded = addedItems.find((el) => el.id === product.id);
    let newItems = [];

    if (alredyAdded) {
      newItems = addedItems.filter((el) => el.id !== product.id);
    } else {
      newItems = [...addedItems, product]
    }

    setAddedItems(newItems);

    if (newItems.length > 0) {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Купить ${getTotalPrice(newItems)}`
      });

    } else {
      tg.MainButton.hide();
    }
  }


  return (
    
    <div className='list'>{lampa}{lampa1}
      <Button onClick={testfetch}>test fetch</Button>
      <Button onClick={onSendData}>onSendData</Button>
      {productlist.map(item => (
        <ProductItem
          key={item.id}
          product={item}
          onAdd={onAdd}
          className={'item'}
        />
      ))}
    </div>
  );
}

export default ProductList;