import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlbumService } from '../album.service';
import { Album } from '../model/album';
import {Post} from '../model/post';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent {
  @Input() album: Album = {id: 0, title: ''};
  posts: Post[] = [];
  currentIdx: number = 0;
  isViewingPosts = false;
  loading = false;

  constructor(private albumService: AlbumService, private router: Router) {}

  increaseIndex() {
    if (this.currentIdx == this.posts.length - 1) {
      return;
    }
    this.currentIdx += 1;
  }

  decreaseIndex() {
    if (this.currentIdx == 0) {
      return;
    }
    this.currentIdx -= 1;
  }

  toggleViewPosts() {
    this.loading = true;
    this.albumService.getPhotosForAlbum(this.album.id).subscribe(data => {
      console.log(data);
      this.posts = data;
      this.isViewingPosts = !this.isViewingPosts;
      this.loading = false;
    }, err => {
      console.log(err);
      this.loading = false;
    })
  }

  detailsHandler() {
    this.router.navigate([`/albums/${this.album.id}`], {
      queryParams: {currentPost: this.currentIdx}
    })
  }

}
