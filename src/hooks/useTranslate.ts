import { useIntl } from "react-intl";

function useTranslate() {
  const { formatMessage: f } = useIntl();

  const locale = (value: string, opts?: any) =>
    f({ id: value, defaultMessage: value }, opts);

  return { locale };
}

export default useTranslate;
