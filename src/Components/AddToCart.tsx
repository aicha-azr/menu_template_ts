import React, { useState } from "react";
import { Plus } from "lucide-react";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  quantity: number;
}

const Add: React.FC<{ Data: Product }> = ({ Data }) => {
  const [existProduct, setExistProduct] = useState<Product | null>(null);

  const DataExist = async () => {
    try {
      const result = await axios.get(`https://json-4m9i.onrender.com/cart/${Data.id}`);
      if (result.data) {
        setExistProduct(result.data);
        addQuantity(result.data);
      } else {
        addToCart();
      }
    } catch (e: any) {
      if (e.response && e.response.status === 404) {
        addToCart();
      } else {
        console.log("error: ", e);
      }
    }
  };

  const addQuantity = async (product: Product) => {
    try {
      const updatedProduct = {
        ...product,
        quantity: (product.quantity || 1) + 1
      };
      const result = await axios.put(`https://json-4m9i.onrender.com/cart/${Data.id}`, updatedProduct);
      console.log("Updated product: ", result.data);
    } catch (e) {
      console.log("error: ", e);
    }
  };

  const addToCart = async () => {
    try {
      const addData = await axios.post("https://json-4m9i.onrender.com/cart", { ...Data, quantity: 1 });
      console.log("Product added to cart: ", addData.data);
    } catch (e) {
      console.log('error:', e);
    }
  };

  return (
    <>
      <Plus onClick={DataExist} />
    </>
  );
};

export default Add;
