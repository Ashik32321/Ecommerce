import React, { useState } from 'react';
import { Carousel} from 'react-bootstrap';
import "../PurchaseCssFiles/PurchaseAdd.css"


const ads = [
  {
    title: 'Ad 1',
    description: 'This is the first ad description.',
    image :"./Images/Add.webp",
    link: 'https://example.com/ad1',
  },
  {
    title: 'Ad 2',
    description: 'This is the second ad description.',
    image: './Images/Add3.webp',
    link: 'https://example.com/ad2',
  },
  {
    title: 'Ad 3',
    description: 'This is the second ad description.',
    image: './Images/Add1.webp',
    link: 'https://example.com/ad2',
  },
  // Add more ads as needed
];

const PurchaseAdds = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

 

  return (
    <div className='container-fluid mt-3 ' >
      <Carousel activeIndex={index} onSelect={handleSelect} interval={2000}>
        {ads.map((ad, adIndex) => (
          <Carousel.Item key={adIndex}>
            <img className="d-block w-100 img-fluid  adimage" src={ad.image} alt={ad.title} />
            
          </Carousel.Item>
        ))}
      </Carousel>
     
    </div>
  );
};

export default PurchaseAdds;

