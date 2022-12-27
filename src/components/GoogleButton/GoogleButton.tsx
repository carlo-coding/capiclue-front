import { StandardButton } from "../StandardButton";
import GoogleLogo from "../../assets/google-icon.svg";

interface IGoogleButtonProps {
  children: string;
}

function GoogleButton({ children }: IGoogleButtonProps) {
  return (
    <StandardButton
      sx={{
        color: "layout.gunmetal",
        backgroundColor: "layout.babyPowder",
        borderColor: "layout.indigoDye",
        borderStyle: "solid",
        borderWidth: "1px",
        position: "relative",
        "& img": {
          position: "absolute",
          left: "10px",
          top: "50%",
          transform: "translateY(-50%)",
        },
      }}
    >
      <img src={GoogleLogo} alt={"GoogleLogo"} />
      {children}
    </StandardButton>
  );
}
export default GoogleButton;
