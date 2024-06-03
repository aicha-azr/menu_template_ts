import { Banknote, CircleCheck } from "lucide-react";
import { Minus, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import Cover from "../Components/Cover";
import NavBar from "../Components/NavBar";

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    proprice?: number;
    promotion?: boolean;
    quantity: number;
}

const CartPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [PopUp, setPopUp] = useState<boolean>(false);
    const [reductionPrice, setReductionPrice] = useState<string>('0.00');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get<Product[]>("https://json-4m9i.onrender.com/cart");
                setProducts(result.data);
                calculateReduction(result.data);
            } catch (error) {
                console.log("Error fetching products:", error);
            }
        };
        fetchData();
    }, [products]);

    const incrementQuantity = async (index: number, id: number) => {
        try {
            const response = await axios.get<Product>(`https://json-4m9i.onrender.com/cart/${id}`);
            const existingProduct = response.data;

            existingProduct.quantity++;
            console.log(existingProduct);

            await axios.put(`https://json-4m9i.onrender.com/cart/${id}`, existingProduct);

            const newProducts = [...products];
            newProducts[index].quantity++;
            setProducts(newProducts);
        } catch (error) {
            console.log("Error incrementing quantity:", error);
        }
    };

    const decrementQuantity = async (index: number, id: number) => {
        try {
            const response = await axios.get<Product>(`https://json-4m9i.onrender.com/cart/${id}`);
            const existingProduct = response.data;

            if (existingProduct.quantity > 0) {
                existingProduct.quantity--;

                await axios.put(`https://json-4m9i.onrender.com/cart/${id}`, existingProduct);

                const newProducts = [...products];
                newProducts[index].quantity--;
                setProducts(newProducts);
            }
        } catch (error) {
            console.log("Error decrementing quantity:", error);
        }
    };

    const deleteProduct = async (id: number) => {
        try {
            const result = await axios.delete(`https://json-4m9i.onrender.com/cart/${id}`);
            console.log(result);

            if (result.status === 200) {
                const updatedProducts = products.filter(product => product.id !== id);
                setProducts(updatedProducts);
            }
        } catch (error) {
            console.log("Error deleting product:", error);
        }
    };

    const calculateReduction = (products: Product[]) => {
        let total = 0;
        products.forEach(item => {
            if (item.promotion) {
                total += (item.proprice! * item.quantity);
            } else {
                total += (item.price * item.quantity);
            }
        });
        setReductionPrice(total.toFixed(2));
    };

    const TogglePopUp = () => {
        setPopUp(!PopUp);
    };

    const ClosePopUp = () => {
        setPopUp(false);
    };

    return (
        <>
            <main className="grid grid-col gap-2 w-fit max-w-full h-[100vh] overflow-y-auto pb-20 fixed left-0 right-0 top-0 pb-[10rem] justify-center">
                <div className="w-screen flex flex-col justify-start">
                    <div className="h-[6rem] flex">
                        <Cover title="Cart" />
                    </div>
                    <div>
                        <div className="flex flex-col gap-2 justify-center items-center mt-2">
                            {products.length > 0 ? (
                                products.map((item, index) => (
                                    <div key={index} className="text-black bg-[#EFEEEE] rounded rounded-[15px] p-4 w-[320px] min-w-screen md:w-1/2 relative">
                                        <div className="bg-[#279C61] rounded-full absolute top-0 right-0 text-white font-bold shadow-md" onClick={() => deleteProduct(item.id)}>
                                            <X />
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="flex gap-1 text-black font-bold">
                                                <p>{item.quantity}x</p>
                                                <p>{item.title}</p>
                                            </div>
                                            <p className="font-bold text-[#C9AA05] mr-4">{(item.price * item.quantity).toFixed(2)}$</p>
                                        </div>
                                        <div className="text-start text-light">{item.description}</div>
                                        <div className="text-black font-bold flex justify-around items-center">
                                            <p>Quantity:</p>
                                            <div className="bg-[#EFEEEE] rounded-[20px] p-2 flex gap-3 font-bold text-white justify-between">
                                                <div className="bg-[#C9AA05] rounded-full" onClick={() => incrementQuantity(index, item.id)}>
                                                    <Plus />
                                                </div>
                                                <h2 className="text-black font-bold min-w-[30px]">{item.quantity}</h2>
                                                <div className="bg-[#C9AA05] rounded-full" onClick={() => decrementQuantity(index, item.id)}>
                                                    <Minus />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-black">No products found</div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 p-2 md:w-1/2 w-full mx-auto self-center">
                        <h2 className="font-bold text-black text-start">Payment Method</h2>
                        <div className="text-[#279C61] flex justify-between shadow-md p-2 rounded rounded-15">
                            <div className="flex gap-1">
                                <CircleCheck />
                                <p>Cash</p>
                            </div>
                            <Banknote />
                        </div>
                    </div>
                    <div className="flex flex-col rounded shadow-md bg-white text-black p-4 gap-3 md:w-1/2 self-center w-full mx-auto">
                        <h2 className="text-start font-bold text-2xl">Summary</h2>
                        <div className="flex flex-col font-bold gap-1">
                            <div className="flex justify-between">
                                <p>Total</p>
                                <p>{reductionPrice}$</p>
                            </div>
                        </div>
                        <button className="bg-[#279C61] font-bold text-white rounded shadow-md items-center mx-10" onClick={TogglePopUp}>Confirm my order</button>
                    </div>
                    {PopUp && (
                        <div className="fixed inset-0 z-50 backdrop-filter backdrop-blur-sm flex justify-center items-center">
                            <div className="flex flex-col text-black bg-white h-fit min-w-[312px] p-4 gap-5 rounded relative shadow-lg">
                                <div className="absolute top-0 right-0 bg-[#279C61] rounded-full text-white font-bold" onClick={ClosePopUp}>
                                    <X size={30} />
                                </div>
                                <div className="flex flex-col items-center font-bold">
                                    <CircleCheck className="text-[#279C61]" size={35} />
                                    <h2 className="text-xl">Order Placed</h2>
                                </div>
                                <div className="flex flex-col font-bold gap-1">
                                    <div className="flex justify-between">
                                        <p>Your order Id</p>
                                        <p>#####</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>Your order Ticket</p>
                                        <p>#####</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>Payment Mode</p>
                                        <p>Cash</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>Total</p>
                                        <p>{reductionPrice}$</p>
                                    </div>
                                </div>
                                <button className="bg-[#279C61] rounded text-white font-bold">Save</button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <footer className="fixed bottom-0 left-0 right-0 z-10">
                <NavBar />
            </footer>
        </>
    );
};

export default CartPage;
