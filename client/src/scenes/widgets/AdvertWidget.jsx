import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:3001/assets/info4.jpeg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
        onError={(e) => console.error("Error loading image:", e)}
      />

      <FlexBetween>
        <Typography color={main}>Manscaped</Typography>
        <Typography color={medium}>Manscaped.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Men’s health and hygiene is at the core of MANSCAPED®—it is the essence
        of our cause. This partnership will raise awareness on an issue that
        impacts men of all ages. Early detection is imperative. Not only do we
        feel compelled to get the word out, we feel that it’s our duty to do so.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
