import { Box, Button } from "@mui/material";

import tech from "./tech.png";
import Link from "next/link";

export default function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={tech.src} alt="Logo Tech error 404" width={300} height={400} />
      <div
        style={{
          marginLeft: "-180px",
        }}
      >
        <h3 className="text-7xl">
          404<span className="text-xs font-extrabold">Not Found</span>
        </h3>
        <Button
          variant="contained"
          sx={{
            "@media(max-width:400)": {
              fontSize: "0.75rem",
            },
          }}
        >
          <a href="/" className="text-xs sm:text-base">
            Voltar para tela inicial
          </a>
        </Button>
      </div>
    </Box>
  );
}
