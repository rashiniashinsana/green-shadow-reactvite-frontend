import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;

interface HeaderComponentProps {
    section?: string;
    button?: string;
    addPopupAction?: () => void;
    searchAction: React.Dispatch<React.SetStateAction<string>>;
}

export const HeaderComponent = ({ section,button, addPopupAction ,searchAction }: HeaderComponentProps) => {
    return (
        <>
            <header>
                <h2 className="mb-10">
                    <span className="font-sans text-4xl text-lime-300 mb-6">{section}</span>
                </h2>

                <button
                    className="bg-gradient-to-r from-lime-500 to-emerald-700 hover:from-emerald-800 hover:to-lime-500 mb-1 mt-3 p-2 rounded-md text-white"
                    onClick={addPopupAction}>
                    <span>{button}</span>
                </button>
                <div
                    className=" absolute top-11 right-10 mt-10 bg-opacity-70 bg-green-100 rounded-2xl shadow-lg  py-1 w-50 ">
                    <div className="z-index">
                    <input
                        type="text"
                        className={` flex-grow bg-transparent outline-none text-black-700 placeholder-gray-400  px-3 ${input}`}
                        placeholder="Search"
                        onChange={(e) => searchAction(e.target.value)}
                    />
                        </div>
                </div>
            </header>


        </>
    );
};

export default HeaderComponent;
