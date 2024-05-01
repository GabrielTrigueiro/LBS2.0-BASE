import { Box, Button } from '@mui/material'

import GenericTextField from 'app/components/genericTextField/GenericTextField'
import { InfoCardContainer, InfoCardTitle, InfoCard } from 'app/components/styles'
import { RegisterPage, RegisterPageHeader, RegisterPageContent } from 'app/views/registerIndication/styles'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function RegisterProduct() {
  const navigate = useNavigate();
  return (
    <RegisterPage>
      <RegisterPageHeader>Cadastrar produto</RegisterPageHeader>
      <RegisterPageContent>
        <Box
          sx={{
            gap: " 1rem",
            display: "flex",
            flexDirection: "row",
            alignItems: "start",
          }}
        >
          <InfoCardContainer sx={{ width: 350 }}>
            <InfoCardTitle sx={{ whiteSpace: "nowrap" }}>
              Informações pessoais
            </InfoCardTitle>
            <InfoCard>
              dsaldmsalkdmlaskdklsadlksa
              {/* <GenericTextField<string>
                error={!!formik.errors.coupon}
                helperText={formik.errors.coupon}
                small
                name={"coupon"}
                label={"Coupon"}
                value={formik.values.coupon}
                props={{
                  onChange: formik.handleChange,
                }}
              /> */}
            </InfoCard>
          </InfoCardContainer>

        </Box>
        <Box sx={{ gap: " 1rem", display: "flex", flexDirection: "row" }}>
          <Button onClick={() => navigate("/produtos")} variant="outlined">
            Voltar
          </Button>
          <Button onClick={() => console.log('foi')}>Cadastrar</Button>
        </Box>
      </RegisterPageContent>
    </RegisterPage>
  )
}

export default RegisterProduct