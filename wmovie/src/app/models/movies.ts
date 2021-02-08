export interface Movies {
  results?: (ResultsEntity)[] | null;
  page: number;
  total_results: number;
  dates: Dates;
  total_pages: number;
}
export interface ResultsEntity {
  popularity: number;
  voteCount: number;
  video: boolean;
  posterPath: string;
  id: number;
  adult: boolean;
  backdropPath: string;
  originalLanguage: string;
  originalTitle: string;
  genre_ids?: (number)[] | null;
  title: string;
  voteAverage: number;
  overview: string;
  releaseDate: string;
  mediaType?: string;
}
export interface Dates {
  maximum: string;
  minimum: string;
}
