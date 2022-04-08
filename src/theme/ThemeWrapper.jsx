import { ThemeProvider } from "@mui/system";
import theme from "./theme";

function ThemeWrapper({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default ThemeWrapper;
