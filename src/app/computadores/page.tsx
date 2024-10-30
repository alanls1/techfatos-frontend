"use client";
import GameComponent from "@/components/gamesComponent/gameComponent";
import { fetchComputers } from "@/services";
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
        const { currentPage, news, totalPages } = await fetchComputers(page);

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

  const handlePage = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

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
