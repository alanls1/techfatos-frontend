"use client";
import GameComponent from "@/components/gamesComponentAdmin/gameComponent";
import { fetchSmartphones } from "@/services";
import { Pagination, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import withAuth from "../withAuth";

function Home() {
  const [data, setData] = useState<any>();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const { currentPage, news, totalPages } = await fetchSmartphones(page);

        setData(news);
        setPage(currentPage);
        setTotalPage(totalPages);
      } catch (error) {}
    }

    fetchData();
  }, [page]);

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

  const handlePage = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

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
  );
}

export default withAuth(Home);
