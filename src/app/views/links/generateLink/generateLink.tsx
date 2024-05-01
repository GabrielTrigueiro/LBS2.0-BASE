import React, { useState } from "react";
import {
  Button,
  SelectChangeEvent,
  Autocomplete,
  TextField,
  Box,
} from "@mui/material";

import { TGenerateLinkBodyRequest } from "core/models/sale/link";
import { Actions, Container } from "./styles";
import { fetchIndicationsByCoupon } from "core/querryes/indication/indicationQuerry";
import { useQuery } from "@tanstack/react-query";
import { TIndicationUser } from "core/models/indication";

interface IGenerateLinkProps {
  payload: TGenerateLinkBodyRequest;
  setCoupon: React.Dispatch<React.SetStateAction<string>>;
  setPayload: React.Dispatch<React.SetStateAction<TGenerateLinkBodyRequest>>;
  onSubmit: () => void;
  haveIndication?: boolean;
}

function GenerateLink(props: IGenerateLinkProps) {
  const { payload, setPayload, onSubmit, setCoupon, haveIndication } = props;
  const [search, setSearch] = useState("");

  // pegar as indicações para listar
  const { data } = useQuery({
    queryKey: ["indications", search],
    queryFn: () => fetchIndicationsByCoupon(search),
  });

  return (
    <Container>
      <Actions>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Autocomplete
            sx={{ width: "200px" }}
            inputValue={search}
            onInputChange={(event, newInputValue) => {
              setSearch(newInputValue);
            }}
            onChange={(event: any, newValue: TIndicationUser | null) => {
              setPayload((prevState) => ({
                ...prevState,
                idIndiction: newValue?.id || "",
              }));
              setCoupon(newValue?.coupon || "");
            }}
            options={data?.content || []}
            getOptionLabel={(option) => option.coupon}
            renderInput={(params) => (
              <TextField variant="outlined" {...params} label="Coupon" />
            )}
          />
        </Box>
      </Actions>
      <Button disabled={!payload.idIndiction} onClick={onSubmit}>
        Gerar link
      </Button>
    </Container>
  );
}

export default GenerateLink;
