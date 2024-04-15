import { useQuery } from "@tanstack/react-query";
import { Image, Descriptions, Skeleton, Space, Tag, Button } from "antd";
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

  return loadingRecord ? (
    <Skeleton active />
  ) : (
    <Descriptions
      title={
        <Space>
          <Button
            type="primary"
            icon={<ArrowLeft />}
            onClick={() =>
              navigate({
                pathname: Paths.Movies,
                search: location.search,
              })
            }
          />
          {record?.Title}
        </Space>
      }
      column={1}
      bordered
      items={[
        {
          children: (
            <div className="poster">
              <Image width={200} src={record?.Poster} />
            </div>
          ),
        },
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
  );
};

export default MovieDetailsPage;
