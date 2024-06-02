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
const Product: ProductItem[] = [
    {
      id: 2,
        image: "https://i.pinimg.com/236x/c8/26/80/c8268014e2b1ed2bd4323847c6090939.jpg",
      title: "Cheese Pizza",
      price: 32,
      description: "Pizza, dish of Italian origin consisting of a flattened disk of bread dough.",
      ingredients: "flour,olive oil,sugar,salt,Parmesan cheese,mozzarella cheese",
      popular: true,
      promotion: false,
      proprice: 0,
      type: "Pizza",
        quantity: 1
    },
    {
      id: 2,
        image: "https://i.pinimg.com/236x/c8/26/80/c8268014e2b1ed2bd4323847c6090939.jpg",
        title: "Cheese Pizza",
        price: 32,
        description: "Pizza, dish of Italian origin consisting of a flattened disk of bread dough.",
        ingredients: "flour,olive oil,sugar,salt,Parmesan cheese,mozzarella cheese",
        popular: true,
        promotion: false,
        proprice: 0,
        type: "Pizza",
          quantity: 1
    },
    

]
export default Product;