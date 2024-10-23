"use client";
import GameComponent from "@/components/gamesComponentAdmin/gameComponent";
import { fetchSmartphones } from "@/services";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import withAuth from "../withAuth";

function Home() {
  const [data, setData] = useState<any>();

  useEffect(() => {
    async function fetchData() {
      try {
        const dataFetch = await fetchSmartphones();

        setData(dataFetch.findSmartphones);
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
    <main className="">
      <Typography
        variant="h1"
        className="text-center my-10"
        sx={{ fontSize: "2rem" }}
      >
        Fique atualizado com as últimas notícias e tendências do mundo dos
        celulares
      </Typography>
      {data && <GameComponent dataProps={data} incluesArr={incluesArr} />}
    </main>
  );
}

export default withAuth(Home);
