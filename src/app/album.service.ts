import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from './model/album';
import {Post} from './model/post';

const URL = 'https://jsonplaceholder.typicode.com';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private http: HttpClient) { }

  getAllAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(URL + '/albums');
  }

  getAlbumById(albumId: number): Observable<Album> {
    return this.http.get<Album>(`${URL}/albums/${albumId}`);
  }

  getPhotosForAlbum(albumId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${URL}/albums/${albumId}/photos`);
  }

  updateAlbum(album: Album): Observable<Album> {
    return this.http.patch<Album>(`${URL}/albums/${album.id}`, JSON.stringify({
      title: album.title
    }));
  }

  updatePost(post: Post): Observable<Post> {
    return this.http.patch<Post>(`${URL}/photos/${post.id}`, JSON.stringify({
      title: post.title,
      urL: post.url,
      thumbnailUrl: post.thumbnailUrl
    }));
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${URL}/photos`, JSON.stringify(post));
  }

  deletePost(postId: number): Observable<any> {
    return this.http.delete(`${URL}/photos/${postId}`);
  }
}
