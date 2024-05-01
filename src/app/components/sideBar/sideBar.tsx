import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import HailIcon from "@mui/icons-material/Hail";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import ReceiptIcon from "@mui/icons-material/Receipt";
import DiscountIcon from "@mui/icons-material/Discount";
import { Divider, useMediaQuery } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { CSSObject, Theme, styled } from "@mui/material/styles";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CampaignIcon from "@mui/icons-material/Campaign";
import PaymentsIcon from '@mui/icons-material/Payments';
import useSideBarHook from "core/hooks/sideBarHook";
import { useAppSelector } from "core/hooks/reduxHooks";
import theme from "theme";
import SideBarItem from "../sideBarItem/sideBarItem";
import { IconList, IconWrapper, LogoSidebarMax, LogoSidebarMin, SideBarBody, SideBarToggle } from "./styles";
import ArticleIcon from '@mui/icons-material/Article';
import { Link } from "react-router-dom";
import LinkIcon from '@mui/icons-material/Link';

const drawerWidth = 200;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  ...transitionMixin(theme, theme.transitions.duration.enteringScreen),
  [theme.breakpoints.down("sm")]: {
    width: "100svw",
  },
});

const closedMixin = (theme: Theme): CSSObject => ({
  ...transitionMixin(theme, theme.transitions.duration.leavingScreen),
  width: `calc(${theme.spacing(8)} + 1px)`,
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
});

const transitionMixin = (theme: Theme, duration: number): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration,
  }),
  overflowX: "hidden",
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...((open && openedMixin(theme)) || (!open && closedMixin(theme))),
  "& .MuiDrawer-paper": {
    ...((open && openedMixin(theme)) || (!open && closedMixin(theme))),
    border: "none",
  },
}));

function SideBar() {
  const { isOpen, onClose, onOpen } = useSideBarHook();
  const basicUserInfo = useAppSelector((state) => state.auth.userInfo);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const logoRedirectUrl = basicUserInfo?.group === "CLIENT" ? "/aulas" : "/dashboard";

  return (
    <Drawer
      sx={{
        textAlign: "center",
        overflow: "hidden",
      }}
      variant={"permanent"}
      open={isOpen}
      onClose={onClose}
    >
      <Link to={logoRedirectUrl}>
        {isOpen ? <LogoSidebarMax /> : <LogoSidebarMin />}
      </Link>


      <SideBarBody>
        <IconList $isOpen={isOpen}>
          <SideBarItem
            icon={DashboardIcon}
            link="/dashboard"
            label="Dashboard"
            notAcceptGroup="CLIENT"
            acepptRoles={[
              // "ROLE_SELLER",
              // "ROLE_INDICATIONS",
              //"ROLE_COURSES",
              "ROLE_ADMIN",
            ]}
          />
          <SideBarItem
            icon={LinkIcon}
            link="/links"
            label="Links"
            acepptRoles={
              ["ROLE_ADMIN",
                "ROLE_SELLER",
                "ROLE_CRUD_SELLER",]}
            notAcceptGroup="INDICATION"
          />
          <SideBarItem
            icon={MonetizationOnIcon}
            link="/financeiro"
            label="Financeiro"
            acepptRoles={["ROLE_ADMIN"]}
            notAcceptGroup="CLIENT"
          />
          <SideBarItem
            icon={CampaignIcon}
            link="/campanhas"
            label="Campanhas"
            acepptRoles={["ROLE_ADMIN"]}
            notAcceptGroup="CLIENT"
          />
          <SideBarItem
            icon={ReceiptIcon}
            link="/vendas"
            label="Vendas"
            notAcceptGroup="CLIENT"
            acepptRoles={[
              "ROLE_ADMIN",
              "ROLE_SELLER",
              "ROLE_INDICATIONS",
              "ROLE_CRUD_SELLER",
              "ROLE_CRUD_INDICATIONS",
            ]}
          />
          <Divider flexItem />
          <SideBarItem
            icon={HailIcon}
            link="/vendedores"
            label="Vendedores"
            acepptRoles={["ROLE_ADMIN", "ROLE_CRUD_SELLER"]}
          />
          <SideBarItem
            icon={Diversity3Icon}
            link="/indicacoes"
            label="Indicacoes"
            acepptRoles={[
              "ROLE_ADMIN",
              "ROLE_INDICATIONS",
              "ROLE_CRUD_INDICATIONS",
            ]}
          />
          <SideBarItem
            icon={DiscountIcon}
            link="/cupons"
            label="Cupons"
            acepptRoles={["ROLE_ADMIN", "ROLE_CRUD_SELLER", "ROLE_SELLER"]}
          />

          {basicUserInfo?.group !== "CLIENT" && <Divider flexItem />}
          {basicUserInfo?.group === "CLIENT" && (
            <>
              <SideBarItem
                icon={PaymentsIcon}
                link="/pagamentos"
                label="Pagamentos"
                acepptRoles={["ROLE_COURSES"]}
                notAcceptGroup="ROLE_ADMIN"
              />
              <SideBarItem
                icon={ArticleIcon}
                link="/contrato"
                label="Contrato"
                acepptRoles={["ROLE_COURSES"]}
                notAcceptGroup="ROLE_ADMIN"
              />
            </>
          )}
          <SideBarItem
            icon={OndemandVideoIcon}
            link="/aulas"
            label="Aulas"
            acepptRoles={["ROLE_ADMIN", "ROLE_COURSES", "ROLE_CRUD_COURSES"]}
          />
        </IconList>
      </SideBarBody>
      {!isMobile && (
        <SideBarToggle onClick={isOpen ? onClose : onOpen}>
          {isOpen ? (
            <IconWrapper className="icon">
              <ChevronLeftIcon color="primary" sx={{ border: "2px solid" }} className="icon" />
            </IconWrapper>
          ) : (
            <IconWrapper className="icon">
              <ChevronRightIcon color="primary" sx={{ border: "2px solid" }} className="icon" />
            </IconWrapper>
          )}
        </SideBarToggle>
      )}
    </Drawer>
  );
}

export default SideBar;
