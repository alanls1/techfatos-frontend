"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import EdgesensorHighIcon from "@mui/icons-material/EdgesensorHigh";
import { useRouter } from "next/navigation";

const FireNav = styled(List)<{ component?: React.ElementType }>({
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});

export default function CustomizedList({
  games,
  smartphones,
  computadores,
}: {
  games: string;
  smartphones: string;
  computadores: string;
}) {
  const router = useRouter();
  const data = [
    { icon: <SmartphoneIcon />, label: "Celulares", link: smartphones },
    { icon: <EdgesensorHighIcon />, label: "Computadores", link: computadores },
    { icon: <VideogameAssetIcon />, label: "Jogos", link: games },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        ".css-1on354r-MuiPaper-root": {
          height: "max-content",
        },
        flexDirection: "row-reverse",
      }}
    >
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
          palette: {
            mode: "dark",
            primary: { main: "rgb(102, 157, 246)" },
            background: { paper: "rgb(5, 30, 52)" },
          },
        })}
      >
        <Paper elevation={0} sx={{ maxWidth: 256 }}>
          <FireNav component="nav" disablePadding>
            <ListItemButton component="a" href="#customized-list">
              <ListItemIcon sx={{ fontSize: 20 }}>🔥</ListItemIcon>
              <ListItemText
                sx={{ my: 0 }}
                primary="Topicos Relevantes"
                primaryTypographyProps={{
                  fontSize: 20,
                  fontWeight: "medium",
                  letterSpacing: 0,
                  width: "100%",
                }}
              />
            </ListItemButton>

            <Box>
              {data.map((item) => (
                <ListItemButton
                  key={item.label}
                  sx={{
                    py: 0,
                    minHeight: 32,
                    color: "rgba(255,255,255,.8)",
                    marginBlock: "10px",
                  }}
                  onClick={() => router.push(item.link)}
                >
                  <ListItemIcon sx={{ color: "inherit" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: "medium",
                    }}
                  />
                </ListItemButton>
              ))}
            </Box>
          </FireNav>
        </Paper>
      </ThemeProvider>
    </Box>
  );
}
