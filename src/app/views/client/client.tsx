import Add
  from "@mui/icons-material/Add";
import { PageContentContainer } from "app/components/styles";
import DataTablePagination from "app/components/table/pagination/pagination";
import DataTable from "app/components/table/table/table";
import TableHeader from "app/components/table/tableHeader/TableHeader";
import { ITableHeadCell, Order } from "core/models/table";
import theme from "core/theme/theme";
import { useState } from "react";

const head: ITableHeadCell[] = [
  { name: "id", label: "ID", align: "left" },
  { name: "coupon", label: "Coupon", align: "left" },
  { name: "cpforcnpj", label: "CPF", align: "left" },
  { name: "isActive", label: "Ativo", align: "left" },
];

function Client() {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState("coupon");

  return (
    <PageContentContainer>
      <TableHeader
        mainActionFunction={() => console.log()}
        mainActionLabel="Cadastrar cliente"
        mainIcon={<Add sx={{ color: theme.COLORS.YELLOW2 }} />}
      />
      <DataTable
        head={head}
        data={[]}
        order={order}
        orderBy={orderBy}
        setOrder={setOrder}
        setOrderBy={setOrderBy}
      />
      <DataTablePagination
        setPage={setPage}
        page={page}
        setRowsPerPage={setRowsPerPage}
        rowsPerPage={rowsPerPage}
        count={count}
      />
    </PageContentContainer>
  )
}

export default Client