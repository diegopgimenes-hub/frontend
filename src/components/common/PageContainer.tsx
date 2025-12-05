import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box, Breadcrumbs, Typography, breadcrumbsClasses, styled } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

interface PageContainerProps {
  title?: string;
  breadcrumbs?: { title: string; path?: string }[];
  icon?: React.ReactNode;
  actions?: React.ReactNode; // 🔹 agora suportado
  children: React.ReactNode;
}

// Estilo dos breadcrumbs
const PageHeaderBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: ((theme as any).vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: "center",
  },
}));

export default function PageContainer({
  title,
  breadcrumbs,
  icon,
  actions,
  children,
}: PageContainerProps) {
  return (
    <Box sx={{ p: 3 }}>
      {(title || breadcrumbs) && (
        <Box sx={{ mb: 3 }}>
          {/* Cabeçalho com ícone, título e ações */}
          {(title || actions) && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                rowGap: 1,
                mb: breadcrumbs ? 0.5 : 2,
              }}
            >
              {/* Título + ícone */}
              {title && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  {icon && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        color: theme => ((theme as any).vars || theme).palette.primary.main,
                      }}
                    >
                      {icon}
                    </Box>
                  )}
                  <Typography variant="h4" component="h1" fontWeight={600}>
                    {title}
                  </Typography>
                </Box>
              )}

              {/* Ações à direita */}
              {actions && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: 1,
                  }}
                >
                  {actions}
                </Box>
              )}
            </Box>
          )}

          {/* Breadcrumbs */}
          {breadcrumbs && (
            <PageHeaderBreadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              {breadcrumbs.map((item, index) =>
                item.path ? (
                  <Typography
                    key={index}
                    color="text.secondary"
                    component={RouterLink}
                    to={item.path}
                    sx={{
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    {item.title}
                  </Typography>
                ) : (
                  <Typography key={index} color="text.primary">
                    {item.title}
                  </Typography>
                ),
              )}
            </PageHeaderBreadcrumbs>
          )}
        </Box>
      )}

      {/* Conteúdo principal */}
      <Box>{children}</Box>
    </Box>
  );
}
