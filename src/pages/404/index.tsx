import { Button, Result } from "antd";
import useTranslate from "hooks/useTranslate";
import { useNavigate } from "react-router-dom";
import { Paths } from "utils/constants";

const NotFoundPage = () => {
  const { locale } = useTranslate();
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle={locale("NotFoundTitle")}
      extra={
        <Button type="primary" onClick={() => navigate(Paths.Home)}>
          {locale("BackHome")}
        </Button>
      }
    />
  );
};

export default NotFoundPage;
