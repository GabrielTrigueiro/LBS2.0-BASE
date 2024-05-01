import { Box, Button, Container, Grid, Typography } from "@mui/material";
import styled from "styled-components";
import theme from "theme";


export const LinkContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const BoxLink = styled(Box)`
  display: flex;
  flex-direction: row;
  padding: 1em;
  border-left: 4px solid;
  border-color: ${theme.palette.primary.main};
  border-radius: 0.3em;
  background-color: ${({ theme }) => theme.COLORS.WHITE} !important;
  width: 1000px;
  justify-content: space-around;
  align-items: center;
`;


export const TitleLink = styled(Typography)`
  color: ${({ theme }) => theme.COLORS.BLUE3} !important;
  font-weight: bold !important;
`;


export const LinkText = styled(Typography)`
  width: 200px;
  display: flex;
  flex-direction: row !important;
  color: ${({ theme }) => theme.COLORS.BLACK} !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    color: ${({ theme }) => theme.COLORS.GRAY5} !important;
  }
`;