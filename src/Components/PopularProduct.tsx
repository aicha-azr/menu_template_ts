import React, { useState } from "react";
import Product from "../DB/PopularProduct";
import Add from "./AddToCart";
import Content from "./ProductContent";

const PopularProduct: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [productVisible, setProductVisible] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const handleClick = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };
  interface ProductItem {
    id: number;
    image: string;
    title: string;
    price: number;
    description: string;
    popular: boolean;
    promotion: boolean;
    ingredients?: string;
    proprice: number;
    type: string;
    quantity: number;
}
  const toggleProduct = (item: ProductItem) => {
    setProductVisible(!productVisible);
    setSelectedProduct(item);
  };

  return (
    <>
      <div className="flex justify-around">
        {Product.map((item: ProductItem, index: number) => (
          <div key={index} className="w-[157px] h-fit bg-[#EFEEEE] rounded-[20px] relative md:w-1/3" id="2">
            <div onClick={() => toggleProduct(item)}>
              <img src={item.image} alt={item.title} width={157} height={10} className="h-[120px] w-[157px] rounded-t-[20px] md:w-full md:h-[180px] object-cover" />
              <h3 className="text-center font-bold text-black text-2xl">{item.title}</h3>
              <div className="flex justify-between p-2">
                <div>
                  <h4 className="text-[#C9AA05] font-bold">{item.price}$</h4>
                </div>
                <div className={`fixed top-[5rem] left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-md transition-transform duration-500 ease-out ${showNotification ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                  Product added to cart!
                </div>
              </div>
            </div>
            <div className="rounded-full justify-end bg-[#279C61] text-white font-bold text-center absolute bottom-3 right-3 shadow shadow-lg shadow-gray-500 focus:shadow-none transition duration-300" onClick={handleClick}>
              <Add Data={item} />
            </div>
          </div>
        ))}
      </div>
      {productVisible && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm">
          <Content product={selectedProduct} visible={productVisible} onClose={() => setProductVisible(false)} />
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

export default PopularProduct;
