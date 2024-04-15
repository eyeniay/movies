import { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qs from "query-string";

interface IUrlParams<T> {
  values: T;
  update: (params: T) => void;
}

function useUrlParams<T>(defaultValues: Partial<T> = {}): IUrlParams<T> {
  const location = useLocation();
  const navigate = useNavigate();

  const update = useCallback(
    (params: any) => {
      navigate({
        search: qs.stringify(params, {
          encode: false,
          skipEmptyString: true,
          arrayFormatSeparator: ",",
          arrayFormat: "separator",
        }),
      });
    },
    [navigate]
  );

  const values = useMemo(
    () =>
      ({
        ...defaultValues,
        ...qs.parse(location.search, {
          arrayFormatSeparator: ",",
          arrayFormat: "separator",
        }),
      } as unknown as T),
    [defaultValues, location.search]
  );

  return {
    update,
    values,
  };
}

export default useUrlParams;
