import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Movies, ResultsEntity } from '../models/movies';

const enum endpoint {
  latest = '/movie/latest',
  now_playing = '/movie/now_playing',
  popular = '/movie/popular',
  top_rated = '/movie/top_rated',
  upcoming = '/movie/upcoming',
  trending = '/trending/all/week',
  originals = '/discover/tv',
  search_movies = '/search/movie',
  images_endpoint = 'https://image.tmdb.org/t/p/w1280',
  featured_movies = '/discover',
}

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private URL = 'https://api.themoviedb.org/3';
  private API_URL = 'https://pacific-cove-06057.herokuapp.com';

  $movieSubject = new Subject();

  // tslint:disable-next-line:variable-name
  private api_key = environment.api;

  constructor(private http: HttpClient) {}

  // TMDB API: v1

  // getLatestMovie(): Observable<Movies> {
  //   return this.http.get<Movies>(`${this.URL}${endpoint.latest}`, {
  //     params: {
  //       api_key: this.api_key,
  //     },
  //   });
  // }

  // getNowPlaying(): Observable<Movies> {
  //   return this.http.get<Movies>(`${this.URL}${endpoint.now_playing}`, {
  //     params: {
  //       api_key: this.api_key,
  //     },
  //   });
  // }

  // getOriginals(): Observable<Movies> {
  //   return this.http.get<Movies>(`${this.URL}${endpoint.originals}`, {
  //     params: {
  //       api_key: this.api_key,
  //     },
  //   });
  // }

  // getPopularMovies(): Observable<Movies> {
  //   return this.http.get<Movies>(`${this.URL}${endpoint.popular}`, {
  //     params: {
  //       api_key: this.api_key,
  //     },
  //   });
  // }

  // getTopRated(): Observable<Movies> {
  //   return this.http.get<Movies>(`${this.URL}${endpoint.top_rated}`, {
  //     params: {
  //       api_key: this.api_key,
  //     },
  //   });
  // }

  // getTrending(): Observable<Movies> {
  //   return this.http.get<Movies>(`${this.URL}${endpoint.trending}`, {
  //     params: {
  //       api_key: this.api_key,
  //     },
  //   });
  // }

  // searchMovie(searchText): Observable<Movies> {
  //   return this.http.get<Movies>(`${this.URL}${endpoint.search_movies}`, {
  //     params: {
  //       api_key: this.api_key,
  //       query: searchText,
  //     },
  //   });
  // }

  // getFeaturedMovies(): Observable<Movies> {
  //   return this.http.get<Movies>(`${this.URL}${endpoint.featured_movies}`, {
  //     params: {
  //       api_key: this.api_key,
  //       query: 'movie?sort_by=popularity.desc',
  //     },
  //   });
  // }

  // // returns a list of recommended movies for a specific movie
  // getRecommendedMovies(movieId): Observable<Movies> {
  //   return this.http.get<Movies>(
  //     `${this.URL}/movie/${movieId}/recommendations`,
  //     {
  //       params: {
  //         api_key: this.api_key,
  //       },
  //     }
  //   );
  // }

  // getTranslationsForMovie(movieId): any {
  //   return this.http.get(`${this.URL}/movie/${movieId}/translations`, {
  //     params: {
  //       api_key: this.api_key,
  //     },
  //   });
  // }

  // tslint:disable-next-line:max-line-length
  // ********************************************************************* MILOSEV API v2 ************************************************************************

  // search subject
  public setSearchedMovie(value: ResultsEntity[]) {
    this.$movieSubject.next(value);
  }

  public getSearchedMovie(): any {
    return this.$movieSubject;
  }


  playMovie(movie, movieId): any {
    return this.http.get(
      this.API_URL + '/getMovieById/' + movieId + '/' + movie,
      {
        responseType: 'text',
      }
    );
  }

  getMovies(): any {
    return this.http.get(this.API_URL);
  }

  getTopRated(): Observable<Movies> {
    return this.http.get<Movies>(`${this.API_URL}/tmdb/getTopRated`);
  }

  getTrending(): Observable<Movies> {
    return this.http.get<Movies>(`${this.API_URL}/tmdb/getTrending`);
  }

  getPopularMovies(): Observable<Movies> {
    return this.http.get<Movies>(`${this.API_URL}/tmdb/getPopular`);
  }

  searchMovie(searchText): Observable<Movies> {
    return this.http.get<Movies>(`${this.API_URL}/tmdb/search/${searchText}`);
  }

  // 878/11 ???
  getByGenre(genre, pageNum): Observable<Movies> {
    return this.http.get<Movies>(`${this.API_URL}/tmdb/getGenre/${genre.id}/${pageNum}`);
  }
}
