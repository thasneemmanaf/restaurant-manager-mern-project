import React from "react";
import Alert from "@material-ui/lab/Alert";
import Box from "@material-ui/core/Box";

export default function AlertBox(props) {
  return (
    <Box mt={6} ml={45} mr={45}>
      <Alert severity="error">{props.children}</Alert>
    </Box>
  );
}
