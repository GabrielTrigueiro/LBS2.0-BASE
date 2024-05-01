import { Add } from "@mui/icons-material";
import { PageContentContainer } from "app/components/styles";
import TableHeader from "app/components/table/tableHeader/TableHeader";
import theme from "core/theme/theme";

function Provider() {
  return (
    <PageContentContainer>
      <TableHeader
        mainActionFunction={() => console.log()}
        mainActionLabel="Cadastrar fornecedor"
        mainIcon={<Add sx={{ color: theme.COLORS.YELLOW2 }} />}
      />
    </PageContentContainer>
  )
}

export default Provider