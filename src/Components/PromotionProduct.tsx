import React, { useState } from "react";
import ProProduct from "../DB/ProProduct";

import Add from "./AddToCart";
import Content from "./ProductContent";

interface ProductItem {
  id: number;
  title: string;
  image: string;
  price: number;
  proprice: number;
  description: string;
  quantity:number;
  type: string;
}

const Product: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [productVisible, setProductVisible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleClick = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  const toggleProduct = (item: ProductItem) => {
    setProductVisible(!productVisible);
    setSelectedProduct(item);
  };

  return (
    <>
      <div className="flex justify-around">
        {ProProduct.map((item: ProductItem, index: number) => (
          <div key={index} className="relative bg-[#EFEEEE] rounded-[20px] md:w-1/3" id="3">
            <div onClick={() => toggleProduct(item)}>
              <img
                src={item.image}
                alt={item.title}
                width={157}
                height={10}
                className="rounded-t-[20px] md:w-full md:h-[180px] md:object-cover"
              />
              <h3 className="text-center font-bold text-black text-2xl">{item.title}</h3>
              <div className="flex justify-between p-2 md:text-xl">
                <div>
                  <h4 className="text-[#FF434E] font-bold line-through">{item.price}$</h4>
                  <h4 className="text-[#279C61] font-bold">{item.proprice}$</h4>
                </div>
              </div>
            </div>
            <div
              className="rounded-full justify-end bg-[#279C61] text-white font-bold text-center absolute bottom-3 right-3 shadow shadow-lg shadow-gray-500 focus:shadow-none transition duration-300"
              onClick={handleClick}
            >
              <Add Data={item} />
            </div>
          </div>
        ))}
      </div>
      {productVisible && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm">
          <Content product={selectedProduct} visible={productVisible}  onClose={() => setProductVisible(false)} />
        </div>
      )}
      {showAlert && (
        <div className="fixed top-20 w-screen flex justify-center items-center">
          <div className="transform -translate-x-1/2 transition-transform duration-500 ease-out bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-slide-down w-fit">
            Product added to cart!
          </div>
        </div>
      )}
      <style>{`
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

export default Product;
