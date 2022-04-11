import { Box, Button, Container } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Container>
      <h1>404 Page NotFound</h1>;
      <Box mt={1} mb={2}>
        <Button
          style={{
            padding: 0,
            minHeight: 0,
            minWidth: 0,
          }}
          startIcon={<ArrowBackIcon />}
          size="medium"
          to={{
            pathname: "/",
          }}
          component={Link}
          color="secondary"
        >
          Return to home page
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
