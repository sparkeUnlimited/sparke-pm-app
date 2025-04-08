"use client";

import * as React from "react";
import { useRouter } from "next/router";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import WorkIcon from "@mui/icons-material/Work";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SafetyCheckIcon from "@mui/icons-material/HealthAndSafety";
import BuildIcon from "@mui/icons-material/Build";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NotesIcon from "@mui/icons-material/StickyNote2";
import Image from "next/image";

const pages = [
  { label: "Journal", icon: <NotesIcon fontSize="large" />, route: "/journal" },
  { label: "Tasks", icon: <AssignmentIcon fontSize="large" />, route: "/tasks" },
  { label: "Look Ahead", icon: <WorkIcon fontSize="large" />, route: "/lookahead" },
  { label: "Safety", icon: <SafetyCheckIcon fontSize="large" />, route: "/safety" },
  { label: "Tools", icon: <BuildIcon fontSize="large" />, route: "/tools" },
  { label: "Dashboard", icon: <DashboardIcon fontSize="large" />, route: "/dashboard" },
];

export default function Nav() {
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "rgba(0, 0, 0, 0.85)", mb: 3 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo + Mobile Nav Button */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "space-between",
            }}
          >
            <Image
              src="/assets/img/Sparke_Full_Logo.png"
              alt="logo"
              width={150}
              height={150}
              style={{ objectFit: "contain" }}
            />
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
              aria-label="menu"
              edge="start"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map(({ label, route, icon }) => (
                <MenuItem
                  key={label}
                  onClick={() => {
                    handleCloseNavMenu();
                    router.push(route);
                  }}
                >
                  {icon}
                  <Typography sx={{ marginLeft: 1 }}>{label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo + Desktop Buttons */}
          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, alignItems: "center", gap: 2 }}
          >
            <Image
              src="/assets/img/Sparke_Full_Logo.png"
              alt="logo"
              width={150}
              height={150}
              style={{ objectFit: "contain" }}
            />
            {pages.map(({ label, route, icon }) => (
              <Button
                key={label}
                onClick={() => router.push(route)}
                startIcon={icon}
                sx={{
                  my: 2,
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "9999px",
                  textTransform: "none",
                }}
              >
                {label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
