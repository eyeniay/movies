import { useQuery } from "@tanstack/react-query";
import { Card, Table } from "antd";
import moviesAPI, { IMovieFilter } from "api/Movies";
import useTranslate from "hooks/useTranslate";
import useUrlParams from "hooks/useUrlParams";

const MoviesPage = () => {
  const { locale } = useTranslate();
  const { values, update } = useUrlParams<IMovieFilter>({
    s: "Pokemon",
  });
  const columns: any = [
    {
      title: locale("ImdbId"),
      dataIndex: "imdbID",
    },
    {
      title: locale("Name"),
      dataIndex: "Title",
    },
    {
      title: locale("ReleaseDate"),
      dataIndex: "Year",
      align: "center",
    },
  ];

  const { data, isLoading } = useQuery({
    queryKey: ["movies", values],
    queryFn: () =>
      moviesAPI.fetchAll(values.page, {
        ...values,
      }),
  });

  return (
    <Card title={locale("Movies")}>
      <Table
        rowKey="imdbID"
        loading={isLoading}
        columns={columns}
        dataSource={data?.Search}
        pagination={{
          pageSize: 10,
          showSizeChanger: false,
          current: values.page,
          total: parseInt(data?.totalResults || "0"),
        }}
        onChange={(p) =>
          update({
            ...values,
            page: p.current,
          })
        }
      />
    </Card>
  );
};

export default MoviesPage;
