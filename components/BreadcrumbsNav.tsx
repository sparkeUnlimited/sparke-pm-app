"use client";

import { Breadcrumbs, Link as MuiLink, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BreadcrumbNav() {
  const pathname = usePathname() ?? "";
  const pathnames = pathname.split("/").filter((x) => x);

  const makeLabel = (segment: string) =>
    segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());

  let accumulated = "";

  return (
    <Breadcrumbs sx={{ color: "white", fontWeight: 800, my: 2 }} aria-label="breadcrumb">
      <MuiLink component={Link} href="/" underline="hover" color="inherit" sx={{ fontWeight: 800 }}>
        Home
      </MuiLink>
      {pathnames.map((segment, index) => {
        accumulated += `/${segment}`;
        const label = makeLabel(segment);
        const isLast = index === pathnames.length - 1;
        const isLink = !isLast && segment !== "forms";

        return isLink ? (
          <MuiLink
            key={accumulated}
            component={Link}
            href={accumulated}
            underline="hover"
            color="inherit"
            sx={{ fontWeight: 800 }}
          >
            {label}
          </MuiLink>
        ) : (
          <Typography
            key={accumulated}
            color="text.primary"
            sx={{ fontWeight: 800 }}
          >
            {label}
          </Typography>
        );
      })}
    </Breadcrumbs>
  );
}
