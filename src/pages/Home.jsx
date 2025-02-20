import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      const response = await fetch("http://localhost:3000/deck/all");
      if (response.ok) {
        const resData = await response.json();
        setTrending(resData.decks);
      }
    };
    fetchTrending();
  }, []);

  const viewDeckHandler = (deck) => {
    console.log(deck);
  };
  return (
    <>
      <div className="flex flex-col px-32 py-10">
        <div>
          <h1>Welcome to Anki Dupe!</h1>
        </div>
        <h1 className="text-2xl  font-semibold text-gray-600">
          Trending Decks
        </h1>
        <div className="bg-gray-300 min-h-48 rounded-xl">
          <ul className="">
            <div className="flex p-3 rounded-lg">
              {trending.map((deck) => {
                return (
                  <li key={deck._id}>
                    <NavLink to={`/decks/${deck._id}`}>
                      <div>
                        <div className="flex flex-col bg-white rounded-lg p-3 w-48 m-2 gap-2 hover:-translate-y-2 transition duration-200 hover:border-b-2 hover:border-gray-200">
                          <div className="flex">
                            <img
                              src={deck.creator.picture}
                              className="size-6 rounded-3xl"
                            />
                            <div className="flex items-end text-gray-500 font-semibold text-sm pl-2">
                              {deck.creator.username}
                            </div>
                          </div>
                          <div className="text-xl text-gray-600 font-semibold">
                            {deck.name}
                          </div>
                          <div className="text-gray-500">
                            {deck.size} card{deck.size != 1 && "s"}
                          </div>
                          <div className="size-full bg-gray-500"></div>
                        </div>
                      </div>
                    </NavLink>
                  </li>
                );
              })}
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default HomePage;
