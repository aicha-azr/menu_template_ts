import meal from '../assets/meal.png';
import burger from '../assets/burger1.png';
import pizza from '../assets/pizza1.png';
import dessert from '../assets/Dessert.png';
import drinks from '../assets/drinks.png';

interface FoodTypeItem {
  title: string;
  image: string;
}

const Type: FoodTypeItem[] = [
  {
    title: "all",
    image: meal
  },
  {
    title: "Burger",
    image: burger
  },
  {
    title: "Pizza",
    image: pizza
  },
  {
    title: "Dessert",
    image: dessert
  },
  {
    title: "Drinks",
    image: drinks
  },
  {
    title: "Drinks",
    image: drinks
  },
  {
    title: "Drinks",
    image: drinks
  },
];

export default Type;
