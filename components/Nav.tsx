"use client";

import * as React from "react";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Logo from "@/components/Logo";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import HomeIcon from "@mui/icons-material/Home";
/* import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import CampaignIcon from "@mui/icons-material/Campaign";
import InfoIcon from "@mui/icons-material/Info";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import ContactSupportIcon from "@mui/icons-material/ContactSupport"; */
import { useRouter } from "next/navigation";
import WorkIcon from "@mui/icons-material/Work";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SafetyCheckIcon from "@mui/icons-material/HealthAndSafety";
import DescriptionIcon from "@mui/icons-material/Description";
import BuildIcon from "@mui/icons-material/Build";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NotesIcon from "@mui/icons-material/StickyNote2";
import CorrectiveActionRegister from "@/lib/EHS/Corrective_Action_Register.json";
import InternalAuditChecklist from "@/lib/EHS/Internal_Audit_Checklist.json";
import InternalAuditReport from "@/lib/EHS/Internal_Audit_Report.json";
import ModifiedDutyLog from "@/lib/EHS/Modified_Duty_Log.json";
import ReturnToWorkAgreement from "@/lib/EHS/Return_to_Work_Agreement.json";
import SafetyObjectiveWorksheet from "@/lib/EHS/Safety_Objective_Worksheet.json";

const basePages = [
  "Estimate",
  "Journal",
  "Tasks",
  "Look Ahead",
  "Safety",
  "EHS",
  "Tools",
  "Dashboard",
] as const;
const pageIcons = {
  Home: <HomeIcon fontSize="large" />,
  Estimate: <DashboardIcon fontSize="large" />,
  Journal: <NotesIcon fontSize="large" />,
  Tasks: <AssignmentIcon fontSize="large" />,
  "Look Ahead": <WorkIcon fontSize="large" />,
  Safety: <SafetyCheckIcon fontSize="large" />,
  EHS: <SafetyCheckIcon fontSize="large" />,
  Tools: <BuildIcon fontSize="large" />,
  Dashboard: <DashboardIcon fontSize="large" />,
};

const formLinks = [
  { title: CorrectiveActionRegister.title, slug: "corrective-action-register" },
  { title: InternalAuditChecklist.title, slug: "internal-audit-checklist" },
  { title: InternalAuditReport.title, slug: "internal-audit-report" },
  { title: ModifiedDutyLog.title, slug: "modified-duty-log" },
  { title: ReturnToWorkAgreement.title, slug: "return-to-work-agreement" },
  { title: SafetyObjectiveWorksheet.title, slug: "safety-objective-worksheet" },
];

export default function Nav() {
  const router = useRouter();

  const pages = [...basePages] as string[];

  const pageRoutes = {
    Home: "/",
    Estimate: "https://estimating.sparkeunlimited.ca",
    Journal: "/journal",
    Tasks: "/tasks",
    "Look Ahead": "/lookahead",
    Safety: "/safety",
    EHS: "/ehs",
    Tools: "/tools",
    Dashboard: "/dashboard",
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElForms, setAnchorElForms] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenFormsMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElForms(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseFormsMenu = () => {
    setAnchorElForms(null);
  };

  return (
    <AppBar sx={{ backgroundColor: "inherit" }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
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
              width={100}
              height={100}
              style={{ objectFit: "contain" }}
            />
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem
                  sx={{
                    background:
                      page === "Contact Us"
                        ? "linear-gradient(to right, #f59e0b, #ea580c, #fbbf24)"
                        : "inherit",
                    borderRadius: "9999px",
                    border: page === "Contact Us" ? "2px solid transparent" : "none",
                    position: "relative",
                    overflow: "hidden",
                    pointerEvents: page === "Promotions" ? "none" : "auto",
                    opacity: page === "Promotions" ? 0.5 : 1,
                  }}
                  key={page}
                  onClick={() => {
                    handleCloseNavMenu(); // Close the menu
                    router.push(pageRoutes[page]); // Navigate to the desired page
                  }}
                >
                  {pageIcons[page]}
                  <Typography sx={{ textAlign: "center", marginLeft: 1 }}>{page}</Typography>
                </MenuItem>
              ))}
              {formLinks.map((form) => (
                <MenuItem
                  key={form.slug}
                  onClick={() => {
                    handleCloseNavMenu();
                    router.push(`/forms/${form.slug}`);
                  }}
                >
                  <DescriptionIcon sx={{ mr: 1 }} />
                  <Typography>{form.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "space-between",
            }}
          >
            <Button onClick={() => router.push(pageRoutes.Home)}>
              <Image
                src="/assets/img/Sparke_Full_Logo.png"
                alt="logo"
                width={100}
                height={100}
                style={{ objectFit: "contain" }}
              />
            </Button>

            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => router.push(pageRoutes[page])}
                sx={{
                  my: 3,
                  color: page === "Contact Us" ? "black" : "white",
                  fontWeight: 800,
                  display: "flex",
                  pointerEvents: page === "Promotions" ? "none" : "auto",
                  background:
                    page === "Contact Us"
                      ? "linear-gradient(to right, #f59e0b, #ea580c, #fbbf24)"
                      : "inherit",
                  borderRadius: "9999px",
                  border: page === "Contact Us" ? "2px solid transparent" : "none",
                  position: "relative",
                  overflow: "hidden",
                  padding: "2px 6px",
                  opacity: page === "Promotions" ? 0.5 : 1,
                }}
                startIcon={pageIcons[page]}
              >
                {page}
              </Button>
            ))}
            <Button
              onClick={handleOpenFormsMenu}
              sx={{ my: 3, color: "white", fontWeight: 800 }}
              startIcon={<DescriptionIcon />}
            >
              Forms
            </Button>
            <Menu
              anchorEl={anchorElForms}
              open={Boolean(anchorElForms)}
              onClose={handleCloseFormsMenu}
            >
              {formLinks.map((form) => (
                <MenuItem
                  key={form.slug}
                  onClick={() => {
                    handleCloseFormsMenu();
                    router.push(`/forms/${form.slug}`);
                  }}
                >
                  {form.title}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
