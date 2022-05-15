import React, { Dispatch, SetStateAction, useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";

type TTabOptions = {
  labels: string[];
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
};
const TabOptions: React.FC<TTabOptions> = ({ labels, value, setValue }) => {
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        {labels.map((item, index) => (
          <Tab key={index} value={index} label={item} />
        ))}
      </Tabs>
    </Box>
  );
};
export default TabOptions;
