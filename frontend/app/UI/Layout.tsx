"use client";
import { Box, Stack } from "@mui/material";
import Navbar from "./Navbar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Box>
      <Navbar />
      <Stack
        alignItems="center"
        justifyContent="center"
        mt={20}
        minHeight="100%"
      >
        {children}
      </Stack>
    </Box>
  );
}
