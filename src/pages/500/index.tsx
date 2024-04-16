import { Button, Result } from "antd";
import useTranslate from "hooks/useTranslate";
import { useNavigate } from "react-router-dom";
import { Paths } from "utils/constants";

const Error = () => {
  const { locale } = useTranslate();
  const navigate = useNavigate();

  return (
    <Result
      status="500"
      title="500"
      subTitle={locale("ErrorOccured")}
      extra={
        <Button type="primary" onClick={() => navigate(Paths.Home)}>
          {locale("BackHome")}
        </Button>
      }
    />
  );
};

export default Error;
