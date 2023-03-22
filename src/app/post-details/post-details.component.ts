import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from '../model/post';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  @Input() post: Post = {id: 0, albumId: 0, thumbnailUrl: '', url: '', title: ''};
  @Output() editPost = new EventEmitter<void>()

  ngOnInit(): void {
    this.post = {id: 0, albumId: 0, thumbnailUrl: '', url: '', title: ''};
  }

  editHandler() {
    this.editPost.emit();
  }
}
