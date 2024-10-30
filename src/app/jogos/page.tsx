"use client";
import GameComponent from "@/components/gamesComponent/gameComponent";
import { fetchGames } from "@/services";
import { Pagination, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const { currentPage, news, totalPages } = await fetchGames(page);

        setData(news);
        setPage(currentPage);
        setTotalPage(totalPages);

        setInterval(() => {
          setIsLoading(false);
        }, 1000);
      } catch (error) {}
    }

    fetchData();
  }, [page]);

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

  const handlePage = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

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
        <div className="mt-32 flex justify-center">
          <Pagination
            count={totalPage}
            color="primary"
            page={page}
            onChange={handlePage}
            size="medium"
            sx={{
              "@media (max-width: 400px)": {
                ".css-1pm1cjd-MuiButtonBase-root-MuiPaginationItem-root ,.css-1gaup4j-MuiButtonBase-root-MuiPaginationItem-root":
                  {
                    minWidth: {
                      xs: "26px",
                    },
                    height: "26px",
                  },
              },
            }}
          />
        </div>
      </main>
    </>
  );
}
