import { Box, IconButton } from "@mui/material";
import { formatCurrencyBR, formatDateBr } from "core/utils/globalFunctions";
import { QrCode, ContentCopy } from "@mui/icons-material";
import copy from "clipboard-copy";

import { TPixBodyResponse } from "core/models/payment/pix";
import theme from "core/theme/theme";
import { InfoColumn } from "./styles";
import { InfoKey, InfoValue } from "app/components/styles";
import PixIcon from "@mui/icons-material/Pix";

interface IPixInfoProps {
  pix: TPixBodyResponse;
  isClient?: boolean
}

const PixInfo = (props: IPixInfoProps) => {
  const { pix, isClient } = props;
  const { brcode, dateCreation, dueDate, status, value, paymentDate } = pix;

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        marginBottom: "-8px",
        justifyContent: "space-between",
        alignItems: "center",
        background: theme.COLORS.GRAY6,
        borderRadius: 1,
        padding: "0.3rem 0.5rem",
        borderLeft:
          status === "LIQUIDADO"
            ? `6px solid ${theme.COLORS.GREEN1}`
            : `6px solid ${theme.COLORS.YELLOW}`,
      }}
    >
      <PixIcon sx={{ fontSize: "30px", color: "#000" }} />
      <InfoColumn>
        <InfoKey>Emissão</InfoKey>
        <InfoValue>{formatDateBr(dateCreation)}</InfoValue>
      </InfoColumn>
      <InfoColumn>
        <InfoKey>Vencimento</InfoKey>
        <InfoValue>{formatDateBr(dueDate)}</InfoValue>
      </InfoColumn>
      <InfoColumn>
        <InfoKey>Pagamento</InfoKey>
        <InfoValue>{formatDateBr(paymentDate)}</InfoValue>
      </InfoColumn>
      <InfoColumn>
        <InfoKey>Valor</InfoKey>
        <InfoValue>{formatCurrencyBR(value)}</InfoValue>
      </InfoColumn>
      <InfoColumn>
        <InfoKey>Status</InfoKey>
        <InfoValue>{status}</InfoValue>
      </InfoColumn>
      <IconButton
        disabled={status === "LIQUIDADO"}
        onClick={() => copy(brcode)}
      >
        <ContentCopy
          sx={{
            fontSize: "30px",
            color:
              status === "LIQUIDADO" ? theme.COLORS.GRAY4 : theme.COLORS.BLUE,
          }}
        />
      </IconButton>
    </Box>
  );
};

export default PixInfo;
