import { useQuery } from "@tanstack/react-query";
import { Card, Col, Row, Spin, Table } from "antd";
import moviesAPI, { IMovieFilter } from "api/Movies";
import useTranslate from "hooks/useTranslate";
import useUrlParams from "hooks/useUrlParams";
import { lazy, Suspense } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Paths } from "utils/constants";

const MovieDetailsPage = lazy(() => import("./details"));
const MoviesPage = () => {
  const { id } = useParams();
  const { locale } = useTranslate();
  const navigate = useNavigate();
  const location = useLocation();
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
    <Card className="movie-card">
      <Row gutter={[24, 8]}>
        <Col className="col" xs={0} sm={0} md={id ? 12 : 24}>
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
            rowSelection={{
              selectedRowKeys: [id || ""],
              renderCell: () => null,
              columnTitle: <></>,
            }}
            onRow={(record) => {
              return {
                onClick: () =>
                  navigate({
                    pathname: Paths.MoviesDetail.replace(":id", record?.imdbID),
                    search: location.search,
                  }),
              };
            }}
          />
        </Col>
        {id && (
          <Col className="col" sm={24} md={12}>
            <Suspense fallback={<Spin />}>
              <MovieDetailsPage />
            </Suspense>
          </Col>
        )}
      </Row>
    </Card>
  );
};

export default MoviesPage;
