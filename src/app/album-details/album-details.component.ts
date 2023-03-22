import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumService } from '../album.service';
import { Album } from '../model/album';
import { Post } from '../model/post';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css']
})
export class AlbumDetailsComponent implements OnInit {
  album: Album = {title: '', id: 0};
  posts: Post[] = [{id: 0, albumId: 0, thumbnailUrl: '', url: '', title: ''}];
  currentIdx = 0;

  constructor(private route: ActivatedRoute, private albumService: AlbumService, private router: Router) {}

  ngOnInit(): void {
    this.currentIdx = +(this.route.snapshot.queryParamMap.get('currentPost') || 0);
    const albumId = +this.route.snapshot.paramMap.get('id')!;
    this.albumService.getAlbumById(albumId).subscribe(
      data => this.album = data
    );
    this.albumService.getPhotosForAlbum(albumId).subscribe(
      data => this.posts = data
    );
    console.log('INITIALISED ALBUM DETAILS')
  }

  decreaseIndex() {
    if (this.currentIdx == 0) {
      return;
    }
    this.currentIdx -= 1;
  }

  increaseIndex() {
    if (this.currentIdx == this.posts.length - 1) {
      return;
    }
    this.currentIdx += 1;
  }

  editPostHandler() {
    this.router.navigate(['/albums', this.album.id, 'edit', this.posts[this.currentIdx].id], {
      queryParams: {currentPost: this.currentIdx}
    })
  }
}
