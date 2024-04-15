import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import moviesAPI, { IMovie, IMovieFilter } from "api/Movies";
import useTranslate from "hooks/useTranslate";
import useUrlParams from "hooks/useUrlParams";
import { useLocation, useNavigate } from "react-router-dom";
import { DEFAULT_SEARCH_KEY, PaginationDefaults, Paths } from "utils/constants";

const MoviesPage = () => {
  const { locale } = useTranslate();
  const navigate = useNavigate();
  const location = useLocation();
  const { values, update } = useUrlParams<IMovieFilter>({
    s: DEFAULT_SEARCH_KEY,
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

  const handlePaginationChange = (p: any) =>
    update({
      ...values,
      page: p.current,
    });

  const handleRowClick = (record: IMovie) => {
    return {
      onClick: () =>
        navigate({
          pathname: Paths.MoviesDetail.replace(":id", record?.imdbID),
          search: location.search,
        }),
    };
  };

  return (
    <Table
      rowKey="imdbID"
      className="movie-list"
      loading={isLoading}
      columns={columns}
      dataSource={data?.Search}
      pagination={{
        pageSize: PaginationDefaults.pageSize,
        showSizeChanger: false,
        current: values.page,
        hideOnSinglePage: true,
        total: parseInt(data?.totalResults || "0"),
      }}
      onChange={handlePaginationChange}
      rowSelection={{
        renderCell: () => null,
        columnTitle: <></>,
      }}
      onRow={handleRowClick}
    />
  );
};

export default MoviesPage;
