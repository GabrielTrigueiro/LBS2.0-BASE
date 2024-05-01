import FileDownloadIcon from "@mui/icons-material/FileDownload";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import { Box, IconButton } from "@mui/material";
import { useState } from "react";

import {
  TBoletoBodyResponse,
  TBoletoActions,
} from "core/models/payment/boleto";
import DefaultMenu, { IMenuItemProps } from "app/components/menu/DefaultMenu";
import { useAppSelector } from "core/hooks/reduxHooks";
import {
  formatCurrency,
  formatCurrencyBR,
  formatDateBr,
} from "core/utils/globalFunctions";
import DefaultModal from "../../defaultModal/defaultModal";
import Info, { ItemColumn } from "../Info";
import AlterBoletoDate from "../alterDate/alterDate";
import DiscountBoleto from "../discount/discount";
import DefaultDialog from "app/components/defaultDialog/defaultDialog";
import { BoletoService } from "core/api/boleto/boletoService";
import { TNewClientBodyRequest } from "core/models/client";
import { handleGeneratePDF } from "app/views/nameCleaner/microComponents/paymentTypes/displayBoleto/displayBoleto";
import theme from "core/theme/theme";
import { InfoColumn } from "./styles";
import { InfoKey, InfoValue } from "app/components/styles";
import BoletoSvg from "images/assets/boletoSvg.svg";

interface IBoletoInfoProps {
  boleto: TBoletoBodyResponse;
  client: TNewClientBodyRequest;
  reRender?: () => void;
}

const BoletoInfo = (props: IBoletoInfoProps) => {
  const basicUserInfo = useAppSelector((state) => state.auth.userInfo);

  const { boleto, reRender } = props;
  const {
    nossoNumero,
    dueDate,
    installment,
    issuancedate,
    status,
    value,
    seuNumero,
    discount,
    paymentDate,
    paymentValue,
  } = boleto;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState<TBoletoActions>();
  const [dialog, setDialog] = useState(false);

  const open = Boolean(anchorEl);

  const onCloseDialog = () => {
    setDialog(false);
  };

  const onOpenDialog = () => {
    setDialog(true);
    handleCloseMenu();
  };

  const items: IMenuItemProps[] = [
    { function: () => handleMenuItem("DATE"), label: "Alterar data" },
    { function: () => handleMenuItem("DISCOUNT"), label: "Descontar" },
    { function: () => onOpenDialog(), label: "Baixar" },
  ];

  const boletoColumns: ItemColumn[] = [
    {
      title: "--",
      items: [{ value: `${installment}` }],
    },
    {
      title: "Datas",
      items: [
        { value: `Emissão: ${formatDateBr(issuancedate)}` },
        { value: `Vencimento: ${formatDateBr(dueDate)}` },
        { value: `Pagamento: ${formatDateBr(paymentDate)}` },
      ],
    },
    {
      title: "Valores",
      items: [
        { value: `A pagar: ${formatCurrency(value)}` },
        { value: `Desconto: ${formatCurrency(discount)}` },
        { value: `Pago: ${formatCurrency(paymentValue)}` },
      ],
    },
    {
      title: "Nosso/Seu número",
      items: [{ value: nossoNumero }, { value: seuNumero }],
    },
    {
      title: "Status",
      items: [{ value: status }],
    },
  ];

  const onClose = () => {
    setModal(false);
  };

  const onOpen = () => {
    setModal(true);
  };

  const handleMenuItem = (actionType: TBoletoActions) => {
    setModalType(actionType);
    onOpen();
    handleCloseMenu();
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleConfirm = async () => {
    if (nossoNumero) {
      await BoletoService.DownBoleto(String(nossoNumero));
      onCloseDialog();
      onClose();
      if (reRender) {
        reRender();
      }
    }
  };

  let body;

  switch (modalType) {
    case "DATE":
      body = (
        <AlterBoletoDate
          onCloseModal={onClose}
          nossoNumero={String(nossoNumero)}
          refetch={reRender}
        />
      );
      break;
    case "DISCOUNT":
      body = (
        <DiscountBoleto
          onCloseModal={onClose}
          nossoNumero={String(nossoNumero)}
          refetch={reRender}
        />
      );
      break;
  }

  function isMenuDisabled(): boolean {
    if (
      basicUserInfo &&
      basicUserInfo.roles &&
      basicUserInfo.roles.includes("ROLE_ADMIN")
    ) {
      return false;
    }
    return true;
  }

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "start",
          background: theme.COLORS.GRAY6,
          borderRadius: 1,
          padding: "0.3rem 0.5rem",
          borderLeft: !paymentDate
            ? `6px solid ${theme.COLORS.YELLOW}`
            : `6px solid ${theme.COLORS.GREEN1}`,
        }}
      >
        <img
          alt="boleto"
          src={BoletoSvg}
          height={"20px"}
          style={{ margin: "auto 0px" }}
        ></img>
        <InfoColumn sx={{ alignSelf: "center" }}>
          <InfoKey>Parcela</InfoKey>
          <InfoValue sx={{ textAlign: "center" }}>{installment}</InfoValue>
        </InfoColumn>
        <InfoColumn>
          <InfoKey>Datas</InfoKey>
          <InfoValue>Emissão: {formatDateBr(issuancedate)}</InfoValue>
          <InfoValue>Vencimento: {formatDateBr(dueDate)}</InfoValue>
          <InfoValue>Pagamento: {formatDateBr(paymentDate)}</InfoValue>
        </InfoColumn>
        <InfoColumn>
          <InfoKey>Valores</InfoKey>
          <InfoValue>A pagar: {formatCurrencyBR(value)}</InfoValue>
          <InfoValue>Desconto: {formatCurrencyBR(discount)}</InfoValue>
          <InfoValue>Pago: {formatCurrencyBR(paymentValue)}</InfoValue>
        </InfoColumn>
        <InfoColumn>
          <InfoKey>Nosso/Seu número</InfoKey>
          <InfoValue>{nossoNumero}</InfoValue>
          <InfoValue>{seuNumero}</InfoValue>
        </InfoColumn>
        <InfoColumn>
          <InfoKey>Status</InfoKey>
          <InfoValue>{status}</InfoValue>
        </InfoColumn>
        <IconButton
          sx={{ alignSelf: "center" }}
          onClick={() =>
            handleGeneratePDF({ boletoInfos: boleto, client: props.client })
          }
        >
          <FileDownloadIcon
            sx={{
              fontSize: "30px",
              color: (theme) => theme.palette.primary.main,
            }}
          />
        </IconButton>
        <IconButton
          sx={{ alignSelf: "center" }}
          disabled={isMenuDisabled()}
          onClick={handleClick}
        >
          <MoreHorizIcon
            sx={{
              fontSize: "30px",
              color: isMenuDisabled() ? theme.COLORS.GRAY4 : theme.COLORS.BLUE2,
            }}
          />
        </IconButton>
      </Box>
      <DefaultModal
        title={
          modalType === "DATE"
            ? "Alterar data de vencimento"
            : modalType === "DISCOUNT"
              ? "Descontar boleto"
              : "Baixar o boleto"
        }
        isOpen={modal}
        onOpen={onOpen}
        onClose={onClose}
      >
        {body}
      </DefaultModal>
      <DefaultMenu
        anchor={anchorEl}
        menuItems={items}
        onClose={handleCloseMenu}
        status={open}
      />
      <DefaultDialog
        title="Baixar boleto?"
        isOpen={dialog}
        onCloseAction={onCloseDialog}
        confirmAction={handleConfirm}
      />
    </>
  );
};

export default BoletoInfo;
