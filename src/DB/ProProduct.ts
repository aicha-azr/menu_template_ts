interface ProductItem {
  id: number;
  title: string;
  image: string;
  price: number;
  proprice: number;
  description: string;
  quantity:number;
  popular?: boolean;
  promotion?:boolean;
  type: string;
}
const Product :ProductItem[]= [
    {
      id: 3,
        image: "https://i.pinimg.com/236x/1b/f9/f9/1bf9f909ecceb79c29284794c2d74217.jpg",
      title: "Burger",
      price: 32,
      description: "a dish consisting of fillings—usually a patty of ground meat, typically beef—placed inside a sliced bun or bread roll.",
      popular: false,
      promotion: true,
      proprice: 20,
      type: "Burger",
        quantity: 1
    },
    {
      id: 3,
        image: "https://i.pinimg.com/236x/1b/f9/f9/1bf9f909ecceb79c29284794c2d74217.jpg",
      title: "Burger",
      price: 32,
      description: "a dish consisting of fillings—usually a patty of ground meat, typically beef—placed inside a sliced bun or bread roll.",
      popular: false,
      promotion: true,
      proprice: 20,
      type: "Burger",
        quantity: 1
    },
  

]
export default Product;