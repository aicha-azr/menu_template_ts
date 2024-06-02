import React, { useState, useEffect } from "react";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";

import 'aos/dist/aos.css';
import axios from "axios";
import Aos from "aos";

interface Product {
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

interface ContentProps {
  product: Product;
  visible: boolean;
  onClose: () => void;
}

const Content: React.FC<ContentProps> = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState<number>(product.quantity);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  useEffect(() => {
    Aos.init();
  }, []);

  const updateQuantityInDatabase = async (newQuantity: number) => {
    const updatedProduct = { ...product, quantity: newQuantity };
    try {
      await axios.put(`https://json-4m9i.onrender.com/dishes/${product.id}`, updatedProduct);
    } catch (error) {
      console.error('Error updating quantity in database:', error);
    }
  };

  const handleClick = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  const increment = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateQuantityInDatabase(newQuantity);
  };

  const decrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateQuantityInDatabase(newQuantity);
    }
  };

  const addToCart = async () => {
    const productToAdd = { ...product, quantity };
    try {
      const response = await axios.post("https://json-4m9i.onrender.com/cart", productToAdd);
      console.log(response.data);
    } catch (error) {
      console.log('Error adding to cart:', error);
    }
  };

  return (
    <>
      <div className="bg-white rounded-[20px] p-0.5 w-[80%] max-w-[500px] relative mt-[10rem] mb-[10rem] lg:h-fit self-center " data-aos="fade-up">
        <div className="text-white font-bold bg-[#279C61] rounded-full absolute top-0 right-0 cursor-pointer" onClick={onClose}>
          <X />
        </div>
        <div className="h-fit rounded rounded-[20px]">
          <img src={product.image} className="w-full h-[12rem] rounded-t-[20px] object-cover shadow-md" alt="" />
          <div className="flex justify-around items-center w-full mt-4">
            <h2 className="text-black font-bold text-1xl text-start">{product.title}</h2>
            <div className="bg-[#EFEEEE] rounded-[20px] p-2 flex gap-3 font-bold text-white min-w-[120px] justify-between">
              <div className="bg-[#C9AA05] rounded-full cursor-pointer" onClick={increment}>
                <Plus />
              </div>
              <h2 className="text-black font-bold">{quantity}</h2>
              <div className="bg-[#C9AA05] rounded-full cursor-pointer" onClick={decrement}>
                <Minus />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-start text-black mt-2 pl-1">
            <h3 className="font-bold">Description:</h3>
            <p>{product.description}</p>
          </div>
          <div className="bg-[#279C61] text-white font-bold flex items-center p-2 px-3 rounded-[20px] mt-2 shadow-md justify-between" onClick={() => {
            addToCart();
            handleClick();
          }}>
            <div className="flex gap-2">
              <ShoppingBag />
              <p>Add to Cart</p>
            </div>
            <div>
              <p>Price:</p>
              <p>{(product.price * quantity).toFixed(2)}$</p>
            </div>
          </div>
        </div>
      </div>
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
    </>
  );
};

export default Content;
``
