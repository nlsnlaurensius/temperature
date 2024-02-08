import React from "react";
import TemperatureProvider from "./components/context/TemperatureContext";
import TemperatureConverter from "./TemperatureConverter";
import { Container } from "@mui/material";
import "./Temp.css";

const Temp = () => {
  return (
    <Container maxWidth="100%" className="temp">
      <TemperatureProvider>
        <TemperatureConverter />
      </TemperatureProvider>
    </Container>
  );
};

export default Temp;
