import { useParams } from "react-router-dom";

import plus from "../assets/plus.png";
import left from "../assets/leftArrow.png"
import right from "../assets/rightArrow.png"

const DECK = {
  name: "deck",
  id: "0",
  size: 10,
  cards: [
    {
      front: "f1",
      back: "b1,",
    },
    {
      front: "f2",
      back: "b2,",
    },
  ],
};

const DeckPage = () => {
  const params = useParams();

  return (
    // <>
    //   <p>{params.deckId}</p>
    //   <p></p>
    // </>

    <>
      <div className="flex flex-col my-[10vh] mx-[15vw] w-[50vw]">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl text-gray-700 font-semibold border-b-4 border-gray-200 mb-3">
            {params.deckId + " " + DECK.name}
          </h1>
          <div>
            <button className="bg-blue-600 p-1 rounded-md mb-3 hover:bg-violet-700 duration-200">
              <img src={plus} className="size-3 invert" />
            </button>
            <button className="bg-blue-600 p-3 rounded-md mb-3 text-white text-xl hover:bg-violet-700 duration-200">...</button>
          </div>
        </div>

        <div className="bg-white rounded-2xl h-96 w-[50vw] transform hover:rotate-x-30">test</div>

        <div className="flex justify-center items-center gap-5 my-5">
            <button className="bg-white p-3 rounded-xl hover:bg-gray-200 transition duration-200">
                <img src={left} className="size-6 opacity-20"/>
            </button>
            <span className="font-semibold text-xl text-gray-500">1</span>
            <button className="bg-white p-3 rounded-xl">
                <img src={right} className="size-6 opacity-20"/>
            </button>
        </div>
      </div>
    </>
  );
};

export default DeckPage;
