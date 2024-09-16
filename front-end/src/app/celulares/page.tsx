"use client";
import GameComponent from "@/components/gamesComponent/gameComponent";
import { fetchSmartphones } from "@/services";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const dataFetch = await fetchSmartphones();

        setData(dataFetch.findSmartphones);
        setInterval(() => {
          setIsLoading(false);
        }, 1000);
      } catch (error) {}
    }

    fetchData();
  }, []);

  const incluesArr = [
    "Smartphone",
    "Celular",
    "Mobile",
    "Telefone",
    "Telefone móvel",
    "Android",
    "iOS",
    "iPhone",
    "Samsung",
    "Xiaomi",
    "Huawei",
    "Nokia",
    "Motorola",
    "LG",
    "Apple",
    "Tablet",
    "Phablet",
    "5G",
    "Tecnologia móvel",
    "Aplicativos",
    "Apps",
    "Recarga",
    "Acessórios para celular",
    "Capa para celular",
    "Carregador",
    "Bateria",
    "Tela",
    "Resolução de tela",
    "Chip",
    "SIM card",
    "Rede móvel",
    "Wi-Fi",
    "Bluetooth",
    "Conectividade",
    "Atualização de software",
    "Segurança móvel",
    "Aplicativo de mensagens",
    "Redes sociais",
    "Jogos para celular",
    "Câmera",
    "Foto",
    "Vídeo",
    "Lançamento de celular",
  ];

  return (
    <>
      {isLoading && <div className="h-screen"></div>}
      <main className="px-2 ">
        <Typography
          variant="h1"
          className="text-center my-10"
          sx={{ fontSize: "2rem" }}
        >
          {!isLoading &&
            " Fique atualizado com as últimas notícias e tendências do mundo dos celulares"}
        </Typography>
        {data && (
          <GameComponent
            dataProps={data}
            urlLocation="celulares"
            incluesArr={incluesArr}
          />
        )}
      </main>
    </>
  );
}
