import Deck from "../components/Deck";

import plus from "../assets/plus.png"

const StudyPage = () => {
  const DUMMY_DECKS = [
    {
      name: "deck1",
      id: "1",
      size: "5",
    },
    {
      name: "deck2",
      id: "2",
      size: "4",
    },
    {
      name: "deck3",
      id: "3",
      size: "6",
    },
  ];
  const decks = DUMMY_DECKS;

  return (
    <>
      <div className="flex flex-col my-[10vh] mx-[15vh]">
        <div className="flex items-center gap-5">
          <h1 className="text-4xl text-gray-700 font-semibold border-b-4 border-gray-200 mb-3">
            Study
          </h1>
          <button className="bg-blue-600 p-1 rounded-md mb-3 hover:bg-violet-700 duration-200">
            <img src={plus} className="size-3 invert"/>
          </button>
        </div>

        <div className="flex gap-3">
          {decks.map((deck) => {
            return <Deck name={deck.name} id={deck.id} size={deck.size}></Deck>;
          })}
        </div>
      </div>
    </>
  );
};

export default StudyPage;
