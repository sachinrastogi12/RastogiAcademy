import "./NavBar.css";
import CloseIcon from "@mui/icons-material/Close";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import HelpOutlineSharpIcon from "@mui/icons-material/HelpOutlineSharp";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { makeStyles } from "@mui/styles";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const useStyles = makeStyles((theme) => ({
  helpIcon: {
    fontSize: "large",
  },
}));
export function NavBar(props) {
  const navigate = useNavigate();
  const classes = useStyles();
  const { title, handleHelp } = props;

  const handleClose = () => {
    navigate("/service");
    // window.open("about:blank", "_self");
    // window.close();
  };

  return (
    <>
      <div class="mainContent-nav">
        <div></div>
        <div className="nav-back">
          <Link to="/service">
            {" "}
            <ArrowBackIcon></ArrowBackIcon>Go back
          </Link>
        </div>
        <div class="nav-middle">
          <div class="navbar-title">{title}</div>
        </div>

        <div class="navbar-leftcontent">
          <button onClick={(e) => handleHelp()}>
            <QuestionMarkIcon fontSize="large" />
          </button>
          <button onClick={(e) => handleClose()}>
            <CloseIcon fontSize="large" />{" "}
          </button>
        </div>
      </div>
    </>
  );
}
