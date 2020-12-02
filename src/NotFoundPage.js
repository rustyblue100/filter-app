import React from "react";
import { Container, Box, Button, Icon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useParams, useLocation } from "react-router-dom";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";

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
