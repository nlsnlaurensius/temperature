import { createContext, useState } from 'react';

export const TemperatureContext = createContext();

const TemperatureProvider = ({ children }) => {
  const [fromUnit, setFromUnit] = useState("Celsius");
  const [toUnit, setToUnit] = useState("Fahrenheit");
  const [temperature, setTemperature] = useState("");

  const value = {
    fromUnit,
    setFromUnit,
    toUnit,
    setToUnit,
    temperature,
    setTemperature,
  };

  return (
    <TemperatureContext.Provider value={value}>
      {children}
    </TemperatureContext.Provider>
  );
};

export default TemperatureProvider;
