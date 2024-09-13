"use client";
import { Logout } from "@/services/admin";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import React from "react";

const AvatarMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    return;
  };

  const logout = () => {
    Logout();
  };

  return (
    <div className="flex flex-row-reverse p-8">
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Avatar
          sx={{ bgcolor: "deepOrange[500]" }}
          alt="Remy Sharp"
          src="/broken-image.jpg"
        />
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleClose}>
          <a href="/admin/adicionar">Adicionar</a>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Button onClick={logout}>Logout</Button>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default AvatarMenu;
