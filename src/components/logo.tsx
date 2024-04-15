import useTranslate from "hooks/useTranslate";
import { Clapperboard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Paths } from "utils/constants";

const Logo = () => {
  const { locale } = useTranslate();
  const navigate = useNavigate();

  const handleClick = () => navigate(Paths.Home);

  return (
    <div className="logo" onClick={handleClick}>
      <Clapperboard />
      <div className="title">{locale("LogoTitle")}</div>
      <div className="sub-title">{locale("LogoSubTitle")}</div>
    </div>
  );
};

export default Logo;
