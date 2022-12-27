import { Container, Paper } from "@mui/material";

interface StandardFormProps {
  leftComponent: React.ReactNode;
  rightComponent: React.ReactNode;
}

function StandardForm({ leftComponent, rightComponent }: StandardFormProps) {
  return (
    <Container
      sx={{
        minWidth: "100vw",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: {
            md: "70%",
            sm: "65%",
            xs: "90%",
          },
          height: "85vh",
        }}
      >
        <Container
          sx={{
            width: "45%",
            backgroundColor: "layout.carolinaBlue",
            display: {
              md: "flex",
              xs: "none",
            },
          }}
        >
          {leftComponent}
        </Container>
        <Container
          sx={{
            backgroundColor: "layout.babyPowder",
          }}
        >
          {rightComponent}
        </Container>
      </Paper>
    </Container>
  );
}
export default StandardForm;
