import { Button, DatePicker, Drawer, Grid, Input, Select } from "antd";
import { IMovieFilter } from "api/Movies";
import dayjs from "dayjs";
import useTranslate from "hooks/useTranslate";
import useUrlParams from "hooks/useUrlParams";
import { SquareMenu } from "lucide-react";
import { useState } from "react";
import { DEFAULT_SEARCH_KEY, MovieTypes } from "utils/constants";

const Filters = () => {
  const { useBreakpoint } = Grid;
  const { md } = useBreakpoint();
  const { locale } = useTranslate();
  const [open, setOpen] = useState<boolean>(false);
  const { values, update } = useUrlParams<IMovieFilter>({
    s: DEFAULT_SEARCH_KEY,
  });

  const Filter = () => (
    <>
      <Input.Search
        defaultValue={values.s}
        placeholder={locale("Name")}
        onSearch={(e) => update({ ...values, s: e })}
      />
      <DatePicker
        value={values.y && dayjs().set("year", parseInt(values.y))}
        placeholder={locale("Year")}
        onChange={(e) =>
          update({ ...values, y: e ? e.year().toString() : undefined })
        }
        picker="year"
      />
      <Select
        allowClear
        placeholder={locale("Type")}
        value={values.type}
        onChange={(e) => update({ ...values, type: e })}
        options={MovieTypes}
      />
    </>
  );

  return (
    <div className="filters">
      {md ? (
        <Filter />
      ) : (
        <>
          <Button
            type="primary"
            icon={<SquareMenu />}
            onClick={() => setOpen(true)}
          />
          <Drawer
            className="filter-drawer"
            title={locale("Filters")}
            onClose={() => setOpen(false)}
            open={open}
          >
            <Filter />
          </Drawer>
        </>
      )}
    </div>
  );
};

export default Filters;
