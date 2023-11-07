import {
  AppBar,
  Box,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Stack,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { UIContext } from "../store/ui";

declare module "@mui/material/AppBar" {
  interface AppBarPropsColorOverrides {
    mgrey: true;
  }
}

const StyledSpeedDialAction = styled(SpeedDialAction)({
  "& .MuiSpeedDialAction-staticTooltipLabel": {
    maxWidth: 100,
    width: 100,
    color: "white",
  },
});

function ActionsSpeedDial() {
  const { push } = useRouter();

  return (
    <>
      <Box width={56} display={{ xs: "block", lg: "none" }} />
      <SpeedDial
        ariaLabel="Navigation"
        direction="down"
        icon={<SpeedDialIcon />}
        FabProps={{ sx: { width: 40, minHeight: 0, height: 40 } }}
      >
        <StyledSpeedDialAction
          tooltipTitle="Account"
          tooltipOpen
          onClick={() => push("/account")}
        />
      </SpeedDial>
    </>
  );
}

export default function Navbar() {
  const { user } = useContext(UIContext);

  return (
    <AppBar position="fixed" color="mgrey">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link href="/">
          <Typography letterSpacing="1rem">Pizza</Typography>
        </Link>
        <Stack
          direction="row"
          justifyContent="space-between"
          display={{ xs: "none", lg: "flex" }}
          gap={{ lg: 5, xl: 10 }}
        >
          <Link href={user ? "/account" : "/login"}>
            {user ? "My Account" : "Login"}
          </Link>
        </Stack>
        <Stack
          position="absolute"
          top={7}
          right={0}
          zIndex={10}
          display={{ xs: "flex", lg: "none" }}
          justifyContent="center"
          alignItems="center"
        >
          <ActionsSpeedDial />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
