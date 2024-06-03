import Cover from "../Components/Cover";
import Form from "../Components/Form";
import NavBar from "../Components/NavBar";


const Reclamation = () => {
    return (
        <>
            <main className="grid grid-col gap-2 w-fit max-w-full h-[100vh] overflow-y-auto pb-20 fixed left-0 right-0 top-0 pb-[10rem] justify-center">
                <div className="h-[6rem] flex">
                    <Cover title="Reclamation" />
                </div>
                <div className="flex flex-col justify-center items-center w-screen">
                    <Form />
                </div>
            </main>

            <footer className="fixed bottom-0 left-0 right-0 z-10">
                <NavBar />
            </footer>
        </>
    );
}

export default Reclamation;
