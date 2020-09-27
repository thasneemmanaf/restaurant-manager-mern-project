import React from "react";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";

export default function SimpleRating(props) {
  return (
    <div>
      <Box component="fieldset" mb={-1} borderColor="transparent">
        <Rating name="disabled" value={props.rating} disabled />
      </Box>
    </div>
  );
}
