import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;

interface HeaderComponentProps {
    section?: string;
    button?: string;
    addPopupAction?: () => void; // Add this prop for the button click
    searchAction: React.Dispatch<React.SetStateAction<string>>;
}

export const HeaderComponent = ({ section,button, addPopupAction ,searchAction }: HeaderComponentProps) => {
    return (
        <>
            <header>
                <h2 className="mb-10">
                    <span className="font-sans text-4xl text-lime-700 mb-6">{section}</span>
                </h2>

                <button
                    className="bg-gradient-to-r from-lime-500 to-emerald-700 hover:from-emerald-800 hover:to-lime-500 mb-6 p-2 rounded-md text-white"
                    onClick={addPopupAction} // Use the callback here
                >
                    <span>{button}</span>
                </button>


            </header>

            <div>
                <input
                    type="text"
                    className={`px-3 search-bar ${input}`}
                    placeholder="Search ......"
                    onChange={(e) => searchAction(e.target.value)}
                />
            </div>


        </>
    );
};

export default HeaderComponent;
