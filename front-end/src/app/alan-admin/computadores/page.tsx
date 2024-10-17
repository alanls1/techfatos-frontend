"use client";
import GameComponent from "@/components/gamesComponentAdmin/gameComponent";
import { fetchComputers } from "@/services";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import withAuth from "../withAuth";

function Home() {
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const dataFetch = await fetchComputers();

        setData(dataFetch.findComputers);
      } catch (error) {}
    }

    fetchData();
  }, []);

  const incluesArr = [
    "Computador",
    "PC",
    "Laptop",
    "Desktop",
    "Notebook",
    "Processador",
    "RAM",
    "SSD",
    "HDD",
    "GPU",
    "Placa de vídeo",
    "Tela",
    "Resolução de tela",
    "Teclado",
    "Mouse",
    "Placa-mãe",
    "Portas USB",
    "Conectividade",
    "Sistema operacional",
    "Windows",
    "macOS",
    "Linux",
    "Software",
    "Atualização de software",
    "Antivírus",
    "Segurança",
    "Hardware",
    "Performance",
    "Lançamento de computador",
    "Tecnologia",
    "Inovação",
    "IA",
    "Robôs",
    "inteligência artificial",
  ];

  return (
    <main className="">
      <Typography
        variant="h1"
        className="text-center my-10"
        sx={{ fontSize: "2rem" }}
      >
        Atualize-se com as últimas notícias e tendências do mundo da tecnologia
        e computadores.
      </Typography>
      {data && <GameComponent dataProps={data} incluesArr={incluesArr} />}
    </main>
  );
}

export default withAuth(Home);
