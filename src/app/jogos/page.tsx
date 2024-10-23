"use client";
import GameComponent from "@/components/gamesComponent/gameComponent";
import { fetchGames } from "@/services";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const dataFetch = await fetchGames();

        setData(dataFetch.findGames);
        setInterval(() => {
          setIsLoading(false);
        }, 1000);
      } catch (error) {}
    }

    fetchData();
  }, []);

  const incluesArr = [
    "games",
    "game",
    "jogo",
    "jogos",
    "steam",
    "Gaming",
    "Videogames",
    "Multiplayer",
    "Single-player",
    "Adventure",
    "Action",
    "Role-playing",
    "Strategy",
    "Simulation",
    "Arcade",
    "Puzzle",
    "RPG",
    "MMORPG",
    "FPS",
    "TPS",
    "Platformer",
    "Indie Games",
    "Online Games",
    "Battle Royale",
    "Sandbox",
    "Campaign",
  ];

  return (
    <>
      {isLoading && <div className="h-screen"></div>}

      <main className="px-2">
        <Typography
          variant="h1"
          className="text-center my-10"
          sx={{ fontSize: "2rem" }}
        >
          {!isLoading &&
            "Fique por dentro das últimas novidades e tendências do universo dos games"}
        </Typography>
        {data && (
          <GameComponent
            dataProps={data}
            urlLocation="jogos"
            incluesArr={incluesArr}
          />
        )}
      </main>
    </>
  );
}
