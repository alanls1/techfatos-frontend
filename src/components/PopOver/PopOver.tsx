import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const Popover = () => {
  useEffect(() => {
    const termsAccepted = localStorage.getItem("termsAcceptedTechFatos");
    if (!termsAccepted || termsAccepted === "false") {
      setOpenModal(true);
    }
  }, []);

  const [openModal, setOpenModal] = useState<boolean | null>(null);

  const handleAccept = () => {
    localStorage.setItem("termsAcceptedTechFatos", "true");
    setOpenModal(false);
  };

  const handleDecline = () => {
    localStorage.setItem("termsAcceptedTechFatos", "false");
    setOpenModal(true);
    window.location.href = "/termsandpolicies";
  };

  return (
    <>
      {openModal && (
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            width: "100%",
            zIndex: 100,
            paddingInline: {
              md: 5,
              xs: 2,
            },
            paddingBlockEnd: 4,
            backgroundColor: "white",
            color: "white",
            background: "#1F2937",
            paddingTop: 1,
          }}
        >
          <Box>
            <h1>Termos de Uso</h1>
            <Typography
              sx={{
                textWrap: "balance",
                fontSize: { md: 16, xs: 12 },
                paddingInline: "4px",
              }}
            >
              Por favor, leia e aceite nossos{" "}
              <a href="/termsandpolicies" style={{ color: "rgb(50 141 248)" }}>
                Termos de Uso
              </a>{" "}
              para continuar usando o site.
            </Typography>
            <Box sx={{ marginBlockStart: "15px" }}>
              <Button
                variant="contained"
                sx={{ width: { md: 200, xl: 150 }, marginInlineEnd: 2 }}
                onClick={handleAccept}
              >
                Aceitar
              </Button>
              <Button
                variant="outlined"
                sx={{
                  width: { md: 200, xl: 150 },
                  borderColor: "white",
                  color: "white",
                }}
                onClick={handleDecline}
              >
                Recusar
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Popover;
