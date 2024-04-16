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
import { useGetMovieDetailsQuery } from "api/services/movies";
import useTranslate from "hooks/useTranslate";
import { ArrowLeft, Star, UsersRound } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Paths } from "utils/constants";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const { locale } = useTranslate();
  const location = useLocation();
  const navigate = useNavigate();
  const { data, isLoading, isFetching, isError } = useGetMovieDetailsQuery(
    id as string,
    {
      skip: !id,
    }
  );

  const handleBack = () =>
    navigate({
      pathname: Paths.Movies,
      search: location.search,
    });

  if (isError) {
    navigate(Paths.Error);
  }

  return isLoading || isFetching ? (
    <Skeleton active />
  ) : (
    <Row gutter={[8, 8]}>
      {data?.Poster && (
        <Col className="poster" md={24} lg={8} xxl={4}>
          <Image
            preview={false}
            src={data?.Poster}
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
              {data?.Title}
            </Space>
          }
          column={1}
          bordered
          items={[
            {
              label: locale("Plot"),
              children: data?.Plot,
            },
            {
              label: locale("Director"),
              children: data?.Director,
            },
            {
              label: locale("Cast"),
              children: data?.Actors,
            },
            {
              label: locale("Duration"),
              children: data?.Runtime,
            },
            {
              label: locale("Genre"),
              children: data?.Genre,
            },
            {
              label: locale("Year"),
              children: data?.Year,
            },
            {
              label: locale("Rating"),
              children: data?.imdbVotes && data?.imdbRating && (
                <Space>
                  <Tag>
                    <UsersRound size={10} />
                    {data?.imdbVotes}
                  </Tag>
                  <Tag>
                    <Star size={10} />
                    {data?.imdbRating}
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
