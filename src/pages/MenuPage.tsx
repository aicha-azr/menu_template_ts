import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';







import FoodType from '../Components/FoodType';
import NavBar from '../Components/NavBar';
import Cover from '../Components/Cover';
import Section from '../Components/Section';
import Product from '../Components/PromotionProduct';
import Add from '../Components/AddToCart';
import PopularProduct from '../Components/PopularProduct';

interface Dish {
  id: number;
  title: string;
  type: string;
  image: string;
  price: number;
  description: string;
  quantity: number;
  popular?: boolean;
  promotion?:boolean;
  proprice: number;
}

const MenuPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Dish | null>(null);
  const [productVisible, setProductVisible] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://json-4m9i.onrender.com/dishes');
        setDishes(response.data);
      } catch (e) {
        console.log('error: ', e);
      }
    };
    fetchData();
  }, []);

  const filteredDishes = dishes.filter(item =>
    item.title.toLowerCase().includes(inputValue.toLowerCase()) || 
    item.type.toLowerCase().includes(inputValue.toLowerCase())
  );

  const toggleProduct = (item: Dish) => {
    setProductVisible(!productVisible);
    setSelectedProduct(item);
  };

  const handleClick = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  return (
    <>
      <main className="grid grid-col gap-1 w-fit max-w-full h-[100vh] overflow-y-auto fixed left-0 right-0 top-0 pb-[8rem] md:justify-center md:mx-auto scroll-smooth items-start">
        <div className="flex flex-col gap-1 w-screen">
          <div className="h-[6rem] flex">
            <Cover title="Restaurant" />
          </div>
          <div className='bg-[#EFEEEE] rounded-[10px] shadow-md flex items-start p-2 gap-2 h-fit mx-2 sm:mt-0 mt-2'>
            <Search color={'#ABA9A9'} />
            <input 
              id="search" 
              type="text" 
              placeholder='Search..' 
              className='bg-[#EFEEEE] p-1 w-full focus:outline-none h-fit' 
              onChange={(e) => setInputValue(e.target.value)} 
            />
          </div>
          {inputValue ? (
            filteredDishes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3 w-full min-h-full" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
                {filteredDishes.map((item) => (
                  <React.Fragment key={item.id}>
                    <div onClick={() => toggleProduct(item)} className="flex p-3 shadow-lg rounded-lg drop-shadow h-fit md:min-w-1/3 mx-auto relative">
                      <img src={item.image} alt={item.title} className="w-[110px] h-[113px] rounded-lg self-center" />
                      <div className="flex flex-col p-2 gap-3 self-center">
                        <div className="flex justify-between font-bold">
                          <h3>{item.title}</h3>
                          <h3 className="text-[#C9AA05]">{item.price}$</h3>
                        </div>
                        <div className="text-start text-[#667C8A]">{item.description}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-subgrid gap-4 col-span-3">
                      <div className="rounded-full justify-end bg-[#279C61] text-white font-bold text-center absolute bottom-3 right-3 shadow shadow-lg shadow-gray-500 focus:shadow-none transition duration-300" onClick={() => handleClick()}>
                        <Add Data={item} />
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            ) : "no product found"
          ) : (
            <>
              <FoodType />
              <Section title="Promotion" product={<Product />} />
              <Section title="Popular" product={<PopularProduct />} />
            </>
          )}
          {/*productVisible && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm">
              <Content product={selectedProduct} visible={selectedProduct} onClose={() => setProductVisible(false)} />
            </div>
          )*/}
          {showAlert && (
            <div className="fixed top-20 w-screen flex justify-center items-center">
              <div className="transform -translate-x-1/2 transition-transform duration-500 ease-out bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-slide-down w-fit">
                Product added to cart!
              </div>
            </div>
          )}
          <style >{`
            .animate-slide-down {
              transform: translateY(-100%);
              animation: slide-down 0.5s ease-out forwards;
            }
            @keyframes slide-down {
              from {
                transform: translateY(-100%);
              }
              to {
                transform: translateY(0);
              }
            }
          `}</style>
        </div>
      </main>
      <footer className="fixed bottom-0 left-0 right-0 z-10">
        <NavBar />
      </footer>
    </>
  );
};

export default MenuPage;
