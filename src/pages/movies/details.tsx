import { useQuery } from "@tanstack/react-query";
import {
  Image,
  Descriptions,
  Skeleton,
  Space,
  Tag,
  Button,
  Col,
  Row,
} from "antd";
import moviesAPI from "api/Movies";
import useTranslate from "hooks/useTranslate";
import { ArrowLeft, Star, UsersRound } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Paths } from "utils/constants";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const { locale } = useTranslate();
  const location = useLocation();
  const navigate = useNavigate();

  const { data: record, isLoading: loadingRecord } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => moviesAPI.findMovie(id as string),
    enabled: !!id,
  });

  const handleBack = () =>
    navigate({
      pathname: Paths.Movies,
      search: location.search,
    });

  return loadingRecord ? (
    <Skeleton active />
  ) : (
    <Row gutter={[8, 8]}>
      {record?.Poster && (
        <Col className="poster" md={24} lg={8} xxl={4}>
          <Image
            preview={false}
            src={record?.Poster}
            fallback="https://placehold.co/300x400?text=No+Image"
          />
        </Col>
      )}
      <Col md={24} lg={16} xxl={20}>
        <Descriptions
          title={
            <Space>
              <Button
                type="primary"
                icon={<ArrowLeft />}
                onClick={handleBack}
              />
              {record?.Title}
            </Space>
          }
          column={1}
          bordered
          items={[
            {
              label: locale("Plot"),
              children: record?.Plot,
            },
            {
              label: locale("Director"),
              children: record?.Director,
            },
            {
              label: locale("Cast"),
              children: record?.Actors,
            },
            {
              label: locale("Duration"),
              children: record?.Runtime,
            },
            {
              label: locale("Genre"),
              children: record?.Genre,
            },
            {
              label: locale("Year"),
              children: record?.Year,
            },
            {
              label: locale("Rating"),
              children: record?.imdbVotes && record?.imdbRating && (
                <Space>
                  <Tag>
                    <UsersRound size={10} />
                    {record?.imdbVotes}
                  </Tag>
                  <Tag>
                    <Star size={10} />
                    {record?.imdbRating}
                  </Tag>
                </Space>
              ),
            },
          ]}
        />
      </Col>
    </Row>
  );
};

export default MovieDetailsPage;
