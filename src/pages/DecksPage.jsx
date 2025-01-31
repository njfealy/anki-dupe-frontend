import { useState, useEffect } from "react";

const DecksPage = () => {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const fetchDecks = async () => {
      const response = await fetch("http://localhost:3000/decks");
      const resData = await response.json();
      setDecks(resData.items);
    };

    fetchDecks();
  }, []);

  useEffect(() => {
    console.log(decks);
  }, [decks]);

  return (
    <>
      <div className="px-10 py-8">
        <h1 className="text-2xl font-semibold tSext-gray-700">Decks</h1>
        <div>
          <ul>
            {decks.map((deck) => {
              return (
                <li key={deck._id} className="bg-white p-3 rounded-lg m-1">
                  <div>
                    <h2>{deck.name}</h2>
                    <p>{deck.size} cards</p>
                    <button className="rounded-lg px-4 py-2 mb-1 font-semibold text-white bg-blue-700 transition hover:bg-violet-700 hover:duration-200">Edit</button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DecksPage;
