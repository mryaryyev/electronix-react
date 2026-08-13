import { Box, Button, Container, Stack, Typography } from "@mui/material"
import "../css/app.css"
import { RippleBadge } from "./MaterialTheme/styled"

export const App = () => {
  return (
    <Container sx={{ background: "orange" }}>
      <Stack direction={"column"}>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component={"h4"}>
            Create React App on TypeScript with REDUX
          </Typography>
        </Box>
        <Box>
          <RippleBadge badgeContent={4}>
            <Button variant="contained">Contained</Button>
          </RippleBadge>
        </Box>
      </Stack>
    </Container>
  )
}
