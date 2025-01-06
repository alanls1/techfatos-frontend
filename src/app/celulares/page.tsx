"use client";
import GameComponent from "@/components/gamesComponent/gameComponent";
import { fetchSmartphones } from "@/services";
import { Pagination, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const { currentPage, news, totalPages } = await fetchSmartphones(page);

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
    <>
      {isLoading && <div className="h-screen"></div>}
      <main>
        {data && (
          <GameComponent
            dataProps={data}
            urlLocation="celulares"
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
