"use client";
import GameComponent from "@/components/gamesComponent/gameComponent";
import { fetchComputers } from "@/services";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const dataFetch = await fetchComputers();

        setData(dataFetch.findComputers);
        setInterval(() => {
          setIsLoading(false);
        }, 1000);
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
    <>
      {isLoading && <div className="h-screen"></div>}

      <main className="px-2">
        <Typography
          variant="h1"
          className="text-center my-10 "
          sx={{ fontSize: { md: "2rem", sm: "1.75rem", xs: "1.5rem" } }}
        >
          {!isLoading &&
            "Atualize-se com as últimas notícias e tendências do mundo da tecnologia e computadores."}
        </Typography>
        {data && (
          <GameComponent
            dataProps={data}
            urlLocation="computadores"
            incluesArr={incluesArr}
          />
        )}
      </main>
    </>
  );
}
