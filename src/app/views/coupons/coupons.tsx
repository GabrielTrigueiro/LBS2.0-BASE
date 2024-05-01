import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ShieldIcon from "@mui/icons-material/Shield";
import GppBadIcon from "@mui/icons-material/GppBad";
import { PageContentContainer } from "app/components/styles";
import { Order } from "core/models/table";
import { useEffect, useState } from "react";
import { ContentBody } from "../sellerList/styles";
import { StyledDivDataTable } from "app/components/table/tableHead/styles";
import { SalesCell, SalesTypography } from "../sales/styles";
import { fetchCoupons } from "core/querryes/coupon/couponQuerry";
import { useQuery } from "@tanstack/react-query";
import {
  formatCurrencyBR,
  formatDateBr,
  formatDocument,
} from "core/utils/globalFunctions";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DefaultMenu, { IMenuItemProps } from "app/components/menu/DefaultMenu";
import { TCouponResponse } from "core/models/coupons";
import { CouponService } from "core/api/coupons/couponService";
import { Notification } from "app/components/toastNotification/toastNotification";
import { AxiosError } from "axios";

import DefaultModal from "app/components/modals/defaultModal/defaultModal";
import {
  Container,
  InfoCard,
  InfoCardContainer,
  InfoCardTitle,
  InfoKey,
  InfoRow,
  InfosSection,
  InfoValue,
  Title,
} from "./styles";
import DefaultDialog from "app/components/defaultDialog/defaultDialog";
import { StyledCircle } from "app/components/table/table/table";
import DataTablePagination from "app/components/table/pagination/pagination";
import { useAppSelector } from "core/hooks/reduxHooks";
import TableHeader from "app/components/table/tableHeader/TableHeader";
import theme from "core/theme/theme";
import { useNavigate } from "react-router-dom";
import { TRole, verifyRole } from "core/utils/roles";

export function formatValueForDisplay(value: string): string {
  if (!value) return "";
  const formattedValue = formatDocument(value);
  return formattedValue;
}

const Coupons = () => {
  const basicUserInfo = useAppSelector((state) => state.auth.userInfo);
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [param, setParam] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [tempCoupom, setTempCoupom] = useState<TCouponResponse>();
  const [coupomInfo, setCoupomInfo] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const acceptRoles: TRole[] = [
    "ROLE_ADMIN", "ROLE_CRUD_SELLER", "ROLE_SELLER",];
  const notAcceptGroup: string = "CLIENT";

  const open = Boolean(anchorEl);

  const handleAddParam = async () => {
    setIsLoading(true);
    await CouponService.createParam({
      id: Number(tempCoupom?.id),
      list: [param],
    })
      .then((resp) => {
        Notification("Processo realizado", "success");
        handleCloseMenu();
        setIsLoading(false);
        setDialog(false);
        setParam("");
        coupons.refetch();
      })
      .catch((err: AxiosError) => {
        Notification(err.message, "error");
        setIsLoading(false);
      });
  };

  const handleActive = (id: string) => {
    CouponService.activeOrNotCoupon(Number(id))
      .then((resp) => {
        Notification("Processo realizado", "success");
        handleCloseMenu();
        coupons.refetch();
      })
      .catch((err: AxiosError) => {
        Notification(err.message, "error");
      });
  };

  const handleProtect = (id: string) => {
    CouponService.protectOrNotCoupon(Number(id))
      .then((resp) => {
        Notification("Processo realizado", "success");
        handleCloseMenu();
        coupons.refetch();
      })
      .catch((err: AxiosError) => {
        Notification(err.message, "error");
      });
  };

  const items: IMenuItemProps[] = [
    {
      function: () => {
        setCoupomInfo(true);
        handleCloseMenu();
      },
      label: "Informações",
    },
  ];

  const itemsAdmin: IMenuItemProps[] = [
    {
      function: () => {
        setCoupomInfo(true);
        handleCloseMenu();
      },
      label: "Informações",
    },
    {
      function: () => handleActive(tempCoupom?.id ?? ""),
      label: tempCoupom?.active ? "Desativar" : "Ativar",
    },
    {
      function: () => handleProtect(tempCoupom?.id ?? ""),
      label: tempCoupom?.isProtected ? "Desproteger" : "Proteger",
    },
  ];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const coupons = useQuery({
    queryKey: ["coupons", page, rowsPerPage, orderBy, order],
    staleTime: Infinity,
    queryFn: () => fetchCoupons(page, rowsPerPage, orderBy, order),
  });

  useEffect(() => {
    if (coupons.isSuccess && coupons.data) {
      setCount(coupons.data.totalElements);
    }
  }, [coupons.isSuccess, coupons.data]);
  
  if (
    !verifyRole(basicUserInfo?.roles, acceptRoles) ||
    basicUserInfo?.group === notAcceptGroup
  ) {
    navigate(-1);
    return null;
  }

  return (
    <PageContentContainer>
      <TableHeader
        mainActionLabel="Cadastrar cupom"
        mainActionFunction={() => navigate("/cadastroCoupon")}
        mainActionDisabled={basicUserInfo?.group !== "ADMIN"}
        mainIcon={
          <AddIcon
            sx={{
              fontSize: "20px",
              color: theme.COLORS.BLUE3,
            }}
          />
        }
      />
      <ContentBody>
        <Table>
          <TableHead>
            <TableRow>
              <StyledDivDataTable>Cupom</StyledDivDataTable>
              <StyledDivDataTable>Valor em Pix</StyledDivDataTable>
              <StyledDivDataTable>Valor em parcela</StyledDivDataTable>
              <StyledDivDataTable>Data de criação</StyledDivDataTable>
              <StyledDivDataTable>Parcelas</StyledDivDataTable>
              <StyledDivDataTable>Protegido</StyledDivDataTable>
              <StyledDivDataTable>Ativo</StyledDivDataTable>
              <StyledDivDataTable align="center">Opções</StyledDivDataTable>
            </TableRow>
          </TableHead>
          <TableBody>
            {coupons.data?.content.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <SalesCell component="th" scope="row" size="small">
                  <SalesTypography>{row.coupon}</SalesTypography>
                </SalesCell>
                <SalesCell component="th" scope="row" size="small">
                  <SalesTypography>
                    Cpf: {formatCurrencyBR(Number(row.valuePixCpf))}
                  </SalesTypography>
                  <SalesTypography>
                    Cnpj: {formatCurrencyBR(Number(row.valuePixCnpj))}
                  </SalesTypography>
                </SalesCell>
                <SalesCell component="th" scope="row" size="small">
                  <SalesTypography>
                    Cpf: {formatCurrencyBR(Number(row.valueInstallmentCpf))}
                  </SalesTypography>
                  <SalesTypography>
                    Cnpj: {formatCurrencyBR(Number(row.valueInstallmentCnpj))}
                  </SalesTypography>
                </SalesCell>
                <SalesCell component="th" scope="row" size="small">
                  <SalesTypography>
                    {formatDateBr(row.createdAt)}
                  </SalesTypography>
                </SalesCell>
                <SalesCell component="th" scope="row" size="small">
                  <SalesTypography>{row.quantityInstallments}</SalesTypography>
                </SalesCell>
                <SalesCell component="th" scope="row" size="small">
                  {row.isProtected ? (
                    <ShieldIcon sx={{ color: "#83e509" }} />
                  ) : (
                    <GppBadIcon sx={{ color: "#ff000080" }} />
                  )}
                </SalesCell>
                <SalesCell component="th" scope="row" size="small">
                  <StyledCircle isActive={row.active} />
                </SalesCell>
                <SalesCell
                  align="center"
                  component="th"
                  scope="row"
                  size="small"
                >
                  <IconButton
                    disabled={coupons.isFetching || coupons.isLoading}
                    onClick={(event) => {
                      setTempCoupom(row);
                      handleClick(event);
                    }}
                  >
                    <MoreHorizIcon
                      sx={{
                        fontSize: "30px",
                        color: theme.COLORS.BLUE2,
                      }}
                    />
                  </IconButton>
                </SalesCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <DataTablePagination
          setPage={setPage}
          page={page}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
          count={count}
        />
        <DefaultMenu
          anchor={anchorEl}
          menuItems={basicUserInfo?.group === "ADMIN" ? itemsAdmin : items}
          onClose={handleCloseMenu}
          status={open}
        />
        <DefaultDialog
          title="Adicionar parametro"
          disabled={!param || isLoading}
          confirmAction={() => handleAddParam()}
          isOpen={dialog}
          onCloseAction={() => setDialog(false)}
          body={
            <TextField
              sx={{ m: 1 }}
              label="Parâmetro"
              value={formatValueForDisplay(param)} // Use a função formatValueForDisplay para formatar o valor visualmente
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setParam(event.target.value);
              }}
            />
          }
        />
        <DefaultModal
          isOpen={coupomInfo}
          onClose={() => setCoupomInfo(false)}
          onOpen={() => setCoupomInfo(true)}
          title=""
        >
          <Container>
            <Title>Detalhes do coupon</Title>
            <InfosSection>
              <InfoCardContainer>
                <InfoCardTitle>Coupon</InfoCardTitle>
                <InfoCard sx={{ width: 500 }}>
                  <InfoRow>
                    <InfoKey>Coupon:</InfoKey>
                    <InfoValue>{tempCoupom?.coupon}</InfoValue>
                  </InfoRow>
                  <InfoRow>
                    <InfoKey>Parcela Cpf:</InfoKey>
                    <InfoValue>
                      {formatCurrencyBR(
                        Number(tempCoupom?.valueInstallmentCpf)
                      )}
                    </InfoValue>
                  </InfoRow>
                  <InfoRow>
                    <InfoKey>Parcela Cnpj:</InfoKey>
                    <InfoValue>
                      {formatCurrencyBR(
                        Number(tempCoupom?.valueInstallmentCnpj)
                      )}
                    </InfoValue>
                  </InfoRow>
                  <InfoRow>
                    <InfoKey>Pix Cpf:</InfoKey>
                    <InfoValue>
                      {formatCurrencyBR(Number(tempCoupom?.valuePixCpf))}
                    </InfoValue>
                  </InfoRow>
                  <InfoRow>
                    <InfoKey>Pix Cnpj:</InfoKey>
                    <InfoValue>
                      {formatCurrencyBR(Number(tempCoupom?.valuePixCnpj))}
                    </InfoValue>
                  </InfoRow>
                  <InfoRow>
                    <InfoKey>Parcelas:</InfoKey>
                    <InfoValue>{tempCoupom?.quantityInstallments}</InfoValue>
                  </InfoRow>
                  <InfoRow>
                    <InfoKey>Descrição:</InfoKey>
                    <InfoValue>{tempCoupom?.description}</InfoValue>
                  </InfoRow>
                </InfoCard>
              </InfoCardContainer>
            </InfosSection>
            <Button
              onClick={() => setDialog(true)}
              variant="outlined"
              sx={{ margin: "0.5rem auto" }}
            >
              Adicionar parametro
            </Button>
            {tempCoupom && tempCoupom.params.length > 0 && (
              <Box>
                <InfoCardTitle sx={{ marginLeft: "1rem" }}>
                  Parametros
                </InfoCardTitle>
                <Box
                  sx={{
                    padding: "1rem",
                    maxHeight: 200,
                    background: theme.COLORS.BLUE3,
                    overflowY: "scroll",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  {tempCoupom?.params.map((param) => (
                    <Box
                      key={param.id}
                      sx={{
                        background: theme.COLORS.WHITE,
                        flexDirection: "row",
                        display: "flex",
                        justifyContent: "space-between",
                        borderRadius: 1,
                        padding: "0.5rem",
                      }}
                    >
                      <InfoRow>
                        <InfoKey>id:</InfoKey>
                        <InfoValue>{param.id}</InfoValue>
                      </InfoRow>
                      <InfoRow>
                        <InfoKey>Doc:</InfoKey>
                        <InfoValue>{formatDocument(param.param)}</InfoValue>
                      </InfoRow>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </Container>
        </DefaultModal>
      </ContentBody>
    </PageContentContainer>
  );
};

export default Coupons;
