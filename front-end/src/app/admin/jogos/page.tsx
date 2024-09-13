"use client";
import GameComponent from "@/components/gamesComponentAdmin/gameComponent";
import { fetchGames } from "@/services";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import withAuth from "../withAuth";

function Home() {
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const dataFetch = await fetchGames();

        setData(dataFetch.findGames);
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
    <main className="">
      <Typography
        variant="h1"
        className="text-center my-10"
        sx={{ fontSize: "2rem" }}
      >
        Fique por dentro das últimas novidades e tendências do universo dos
        games
      </Typography>
      {data && <GameComponent dataProps={data} incluesArr={incluesArr} />}
    </main>
  );
}

export default withAuth(Home);
