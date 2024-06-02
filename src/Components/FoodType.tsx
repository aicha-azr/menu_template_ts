import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Type from '../DB/foodType';


interface FoodTypeItem {
  title: string;
  image: string;
}

const FoodType: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [scrollableWidth, setScrollableWidth] = useState<number | null>(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const deviceWidth = window.innerWidth;
    console.log(deviceWidth);
    const totalWidth = Type.length * 40; 
    if (totalWidth > deviceWidth) {
      setScrollableWidth(totalWidth);
    } else {
      setScrollableWidth(null);
    }
  }, []);

  const handleClick = (index: number) => {
    setSelectedItem(index);
    navigate(`/menu/${Type[index].title}`);
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-black font-bold text-3xl text-start ml-1">Food Types</h2>
      <div className='flex gap-3 md:gap-5 overflow-x-scroll scroll-smooth' style={{ width: scrollableWidth ? `${scrollableWidth}px` : '100vw' }}>
        {Type.map((item: FoodTypeItem, index: number) => (
          <div key={index} className={`flex flex-col items-center ${selectedItem === index ? 'text-[#279C61]' : ''}`} style={{ minWidth: '100px' }} onClick={() => handleClick(index)}>
            <div className={`flex items-center justify-center p-1 w-[80px] h-[80px] md:w-[110px] md:h-[110px] rounded-[20px] ${selectedItem === index ? 'bg-[#279C61]' : 'bg-[#EFEEEE]'}`}>
              <img src={item.image} alt={item.title} className="rounded-full flex-1 cover" />
            </div>
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodType;
