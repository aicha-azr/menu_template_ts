import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Aos from "aos";
import "aos/dist/aos.css";
import Cover from "../Components/Cover";
import Add from "../Components/AddToCart";
import Content from "../Components/ProductContent";
import NavBar from "../Components/NavBar";


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

const Page: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productVisible, setProductVisible] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const result = await axios.get('https://json-4m9i.onrender.com/dishes');
      setProducts(result.data);
    } catch (e) {
      console.error('Error fetching data:', e);
    }
  };

  useEffect(() => {
    Aos.init();
    fetchData();
  }, []);

  useEffect(() => {
    let filtered: Product[] = [];
    if (type === "Promotion") {
      filtered = products.filter(prod => prod.promotion);
    } else if (type === "Popular") {
      filtered = products.filter(prod => prod.popular);
    }
    setFilteredProducts(filtered);
    console.log(filteredProducts);
  }, [type, products]);

  const toggleProduct = (item: Product) => {
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
      <main className="grid grid-cols-1 gap-1 md:gap-0 w-fit max-w-full h-[100vh] overflow-y-auto fixed left-0 right-0 top-0 pb-[10rem] mb-[20rem] justify-center ">
        <div className="flex flex-col gap-1 w-screen">
          <div className="h-[6rem] flex">
            <Cover title="Menu" />
          </div>
          {/* <SearchSection /> */}
          <div className="flex flex-col">
            <h2 className="text-black font-bold text-3xl text-start ml-1">{type}</h2>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3 w-full min-h-full" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
                {filteredProducts.map((item, index) => (
                  <div key={index}>
                    <div
                      onClick={() => toggleProduct(item)}
                      className="flex p-3 shadow-lg rounded-lg drop-shadow h-fit md:min-w-1/3 mx-auto relative"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-[110px] h-[113px] rounded-lg self-center"
                      />
                      <div className="flex flex-col p-2 gap-3 self-center">
                        <div className="flex justify-between font-bold">
                          <h3>{item.title}</h3>
                          <h3 className="text-[#C9AA05]">{item.price}$</h3>
                        </div>
                        <div className="text-start text-[#667C8A]">{item.description}</div>
                      </div>
                      <div className="grid grid-cols-subgrid gap-4 col-span-3">
                        <div className="rounded-full justify-end bg-[#279C61] text-white font-bold text-center absolute bottom-3 right-3 shadow shadow-lg shadow-gray-500 focus:shadow-none transition duration-300" onClick={handleClick}>
                          <Add Data={item} />
                        </div>
                      </div>
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
          </div>
        </div>
      </main>
      <footer className="fixed bottom-0 left-0 right-0 z-10">
        <NavBar/>
      </footer>
    </>
  );
};

export default Page;
