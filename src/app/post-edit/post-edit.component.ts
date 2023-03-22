import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { AlbumService } from '../album.service';
import { Album } from '../model/album';
import { Post } from '../model/post';

const dummyPost = { id: 0, title: '', albumId: 0, url: '', thumbnailUrl: '' };
const dummyAlbum = { id: 0, title: '' };

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  post: Post = {...dummyPost};
  album: Album = {...dummyAlbum};
  saveButtonTitle = ''

  constructor(private route: ActivatedRoute, private albumService: AlbumService, private router: Router) { }

  ngOnInit(): void {
    this.post = {...dummyPost};
    this.album = {...dummyAlbum};

    const albumId = +this.route.snapshot.paramMap.get('id')!;
    const postId = this.route.snapshot.paramMap.get('postId')!;

    this.saveButtonTitle = 'Add';

    if (postId !== 'new') {
      this.saveButtonTitle = 'Save'
      this.albumService.getPhotosForAlbum(albumId).pipe(
        map(posts => posts.find(p => p.id == +postId))
      ).subscribe(
        data => {
          this.post = data!
          console.log(this.post);
        }
      );
    }

    this.albumService.getAlbumById(albumId).subscribe(
      data => {
        this.album = data
        if (postId === 'new') {
          this.post.albumId = data.id;
        }
      }
    );
  }

  save() {
    if (this.saveButtonTitle === 'Save') {
      this.albumService.updatePost(this.post).subscribe(
        newPost => this.albumService.updateAlbum(this.album).subscribe(
          newAlbum => {
            this.router.navigate(['/albums', this.album.id], {queryParamsHandling: 'preserve'})
            console.log('New Post', newPost);
            console.log('New Album', newAlbum);
          }
        )
      );
    } else {
      this.albumService.addPost(this.post).subscribe(
        newPost => {
          this.router.navigate(['/albums', this.album.id])
          console.log('New Post', newPost);
        }
      )
    }
  }

  delete() {
    this.albumService.deletePost(this.post.id).subscribe(
      _ => this.router.navigate(['albums', this.album.id], {queryParamsHandling: 'preserve'})
    )
  }

}
