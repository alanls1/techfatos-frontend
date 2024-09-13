"use client";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { useRouter } from "next/navigation";

const Navbar = ({
  home,
  cpu,
  smartphones,
  games,
}: {
  home: string;
  cpu: string;
  smartphones: string;
  games: string;
}) => {
  const router = useRouter();

  return (
    <header className="w-full flex flex-col items-center bg-[#1F2937] text-white pt-4">
      <nav className="w-full flex justify-around items-center">
        <a href={home} style={{ fontFamily: "fantasy", fontSize: "1.3rem" }}>
          Tech
          <span className="text-red-400">Fatos</span>
        </a>
        <div>
          <FormControl
            sx={{
              m: 1,
              width: {
                sm: "25ch",
                xs: "20ch",
              },
              div: { borderColor: "white" },
            }}
            variant="outlined"
          >
            <InputLabel
              htmlFor="search"
              sx={{ top: -6, color: "white", ".Mui-focused": "white" }}
            >
              Search
            </InputLabel>
            <OutlinedInput
              id="search"
              type={"text"}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const target = e.target as HTMLInputElement;
                  router.push(`/pesquisa/${target.value}`);
                }
              }}
              sx={{
                borderRadius: "50px",
                alignItems: "center",
                color: "white",
                ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                input: {
                  paddingBlock: "10px",
                },
              }}
              endAdornment={
                <InputAdornment position="end">
                  <SearchIcon sx={{ cursor: "pointer", color: "white" }} />
                </InputAdornment>
              }
              label="search"
              aria-label="search"
            />
          </FormControl>
        </div>
      </nav>
      <ul className="md:w-1/2 flex flex-wrap justify-evenly mt-8 mb-8">
        <li className="cursor-pointer mx-4">
          <a href={cpu}>Computadores</a>
        </li>
        <li className="cursor-pointer mx-4">
          <a href={smartphones}>Celulares</a>
        </li>
        <li className="cursor-pointer mx-4">
          <a href={games}>Jogos</a>
        </li>
      </ul>
    </header>
  );
};

export default Navbar;
