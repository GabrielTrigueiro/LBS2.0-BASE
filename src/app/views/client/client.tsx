import Add
  from "@mui/icons-material/Add";
import { PageContentContainer } from "app/components/styles";
import TableHeader from "app/components/table/tableHeader/TableHeader";
import theme from "core/theme/theme";

function Client() {
  return (
    <PageContentContainer>
      <TableHeader
        mainActionFunction={() => console.log()}
        mainActionLabel="Cadastrar cliente"
        mainIcon={<Add sx={{ color: theme.COLORS.YELLOW2 }} />}
      />
    </PageContentContainer>
  )
}

export default Client