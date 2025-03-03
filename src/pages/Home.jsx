import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";

import flashcards from "../assets/flashcards2.png";

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
      <div className="bg-gradient-to-r from-gray-950 to-gray-700  text-slate-100 py-40 flex flex-col items-center">
        <div className="flex items-end justify-center text-8xl  gap-6 mb-8">
          <h1 className="font-serif italic">Welcome to </h1>
          <h1 className="font-semibold bg-gradient-to-br from-fuchsia-200 from-20% via-blue-400 via-60% to-blue-900 saturate-200 bg-clip-text text-transparent drop-shadow-sm -translate-y-1 ">
            Anki Dupe.
          </h1>
        </div>
        <div className="flex gap-8 justify-center  max-w-[1000px] px-3">
          <div className="font text-2xl w-1/2 flex flex-col justify-between">
            <div>
              A stylish clone of the ultimate study app, Anki. This is a project
              that aims to provide a fresher and more modern user experience as
              the famous flashcard program, while still delivering the same key
              features.
            </div>
            <div>
              Anki Dupe uses the{" "}
              <Link
                target="_blank"
                to="https://github.com/open-spaced-repetition/fsrs4anki/wiki"
                className="inline bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent font-semibold saturate-200 hover:opacity-60 transition"
              >
                FSRS algorithm
              </Link>
              , which makes learning up to{" "}
              <p className="inline bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent font-semibold saturate-200">
                40% more efficient
              </p>{" "}
              when compared to other spaced-repetition algorithms.
            </div>
          </div>
          <div className="bg-[#7ca6fa] flex justify-center w-1/2 rounded-md p-12 ">
            <img src={flashcards} className="size-72" />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center p-24">
        <div className="w-[1000px]">
          <h1 className="text-4xl  font-semibold text-gray-700 mb-2">
            Trending Decks
          </h1>
          <div className="bg-gray-300 h-96 rounded-xl p-3">
            <ul className="flex flex-wrap">
              {trending.map((deck) => {
                return (
                  <li key={deck._id}>
                    <NavLink to={`/decks/${deck._id}`}>
                      <div className="w-52 h-28">
                        <div className="flex flex-col bg-white rounded-lg p-3 w-48 m-2 hover:border-b-2 hover:border-b-gray-400 hover:-translate-y-1 transition">
                          <div className="flex">
                            <img
                              src={deck.creator.picture}
                              className="size-6 rounded-3xl"
                            />
                            <div className="flex items-end text-gray-500 font-semibold text-sm pl-2">
                              {deck.creator.username}
                            </div>
                          </div>
                          <div className="text-xl text-gray-600 font-semibold truncate">
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
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
