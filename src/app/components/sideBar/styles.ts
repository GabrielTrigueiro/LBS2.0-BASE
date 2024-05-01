import { Box, List } from "@mui/material";
import styled from "styled-components";
import theme from "theme";
import LogoMin from "images/assets/logoPqn.png";
import LogoMax from "images/assets/logo2.png";

export const SideBarBody = styled(Box)`
  height: 100%;
  padding: 5%;
  overflow: hidden;
`;

export const SideBarToggle = styled(Box)`
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 7%;
  &:hover {
    background-color: ${({ theme }) => theme.COLORS.BLUE};
    .icon {
      color: #fff;
    }
    .icon-border {
      border-color: #fff;
    }
  }
`;

export const IconWrapper = styled.span`
  &.icon {
    color: #fff;
  }
  &.icon-border {
    border-color: #fff;
  }
`;

export const IconList = styled(List)<{ $isOpen: boolean }>`
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.$isOpen ? "start" : "center")};
  text-align: center;
  height: 100%;
  gap: 5px;
`;

export const LogoSidebarMin = styled(Box)`
  background-image: url(${LogoMin});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 60px;
  height: 60px;
  overflow: hidden;
  margin: auto;
  margin-top: 15px;
`;

export const LogoSidebarMax = styled(Box)`
  background-image: url(${LogoMax});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin: auto;
  width: 105px;
  height: 105px;
  overflow: hidden;
`;
