import React, { useEffect, useState, useContext } from "react";
import { Button, Container, Typography, Grid, Box, TextField, Autocomplete } from "@mui/material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { TemperatureContext } from "./components/context/TemperatureContext";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

function TemperatureConverter() {
  const { fromUnit, setFromUnit, toUnit, setToUnit, temperature, setTemperature } = useContext(TemperatureContext);

  const [resultTemperature, setResultTemperature] = useState(0);
  const [calculationSteps, setCalculationSteps] = useState([]);
  const [showSteps, setShowSteps] = useState(false);

  useEffect(() => {
    setResultTemperature(0);
    setCalculationSteps([]);
  }, [temperature]);

  const convertTemperature = async () => {
    const steps = [];
    let convertedTemperature = 0;

    const addStep = (step) => {
      steps.push(step);
    };

    const convert = (formula, unit) => {
      addStep(<Typography>{formula}</Typography>);
      convertedTemperature = eval(formula);
    };

    if (fromUnit === toUnit) {
      setResultTemperature(parseFloat(temperature).toFixed(2));
      setCalculationSteps([
        <Typography key="sameUnit" sx={{ fontWeight: "bold" }}>
          Same unit selected, result is equal to the input temperature.
        </Typography>,
      ]);
      setShowSteps(true);

      setTimeout(() => {
        setShowSteps(false);
      }, 500);
      return;
    }

    switch (fromUnit) {
      case "Celsius":
        convert(`${temperature} * 9/5 + 32`, toUnit);
        break;
      case "Fahrenheit":
        convert(`${temperature} * 5/9`, "Celsius");
        break;
      case "Kelvin":
        convert(`${temperature} - 273.15`, "Celsius");
        break;
      case "Reamur":
        convert(`${temperature} * 5/4`, "Celsius");
        break;
      default:
        break;
    }

    setResultTemperature(convertedTemperature.toFixed(2));
    setCalculationSteps(steps);
    setShowSteps(true);

    setTimeout(() => {
      setShowSteps(false);
    }, 500);
  };

  const handleSwitch = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setShowSteps(false);
  };

  const handleConvert = () => {
    convertTemperature();
  };

  const boxStyles = {
    background: "#DBF3FA",
    marginTop: "10rem",
    textAlign: "center",
    color: "#222",
    minHeight: "20rem",
    borderRadius: 5,
    padding: "4rem 2rem",
    border: "2px solid #ddd",
    boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
    position: "relative",
  };

  const temperatureOptions = ["Celsius", "Fahrenheit", "Kelvin", "Reamur"];

  return (
    <Container maxWidth="md" sx={boxStyles}>
      <Typography variant="h5" sx={{ marginBottom: "2rem" }} fontWeight="bold">
        Temperature Converter
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md>
          <TextField
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            label="Temperature"
            fullWidth
            InputProps={{
              type: "number",
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Autocomplete
            options={temperatureOptions}
            value={fromUnit}
            disableClearable
            onChange={(e, newValue) => {
              setFromUnit(newValue);
            }}
            renderInput={(params) => <TextField {...params} label={"From"} />}
          />
        </Grid>
        <Grid item xs={12} md="auto">
          <Button
            onClick={handleSwitch}
            sx={{
              borderRadius: 1,
              height: "100%",
            }}
          >
            <CompareArrowsIcon sx={{ fontSize: 30 }} />
          </Button>
        </Grid>
        <Grid item xs={12} md={3}>
          <Autocomplete
            options={temperatureOptions}
            value={toUnit}
            disableClearable
            onChange={(e, newValue) => {
              setToUnit(newValue);
            }}
            renderInput={(params) => <TextField {...params} label={"To"} />}
          />
        </Grid>
      </Grid>

      <Box sx={{ textAlign: "center", marginTop: "1rem" }}>
        <Typography>{fromUnit} =</Typography>
        {showSteps && (
          <Box>
            {calculationSteps.map((step, index) => (
              <Typography key={index} sx={{ fontWeight: index === calculationSteps.length - 1 ? "bold" : "normal" }}>
                {step}
              </Typography>
            ))}
          </Box>
        )}
        <Typography variant="h5" sx={{ marginTop: "5px", fontWeight: "bold" }}>
          {showSteps ? "Calculating..." : `${resultTemperature} ${toUnit}`}
        </Typography>
        <Button
          onClick={handleConvert}
          sx={{
            marginTop: "1rem",
            borderRadius: 1,
          }}
        >
          Convert
        </Button>
      </Box>
      <Link to="https://nelsonlaurensius.vercel.app/#projects">
        <Button startIcon={<HomeIcon />} className="back-to-home-button">
          Back to Projects
        </Button>
      </Link>
    </Container>
  );
}

export default TemperatureConverter;
