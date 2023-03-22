import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Post } from '../model/post';

@Component({
  selector: 'app-post-minimal',
  templateUrl: './post-minimal.component.html',
  styleUrls: ['./post-minimal.component.css']
})
export class PostMinimalComponent implements OnInit{
  ngOnInit(): void {
    console.log(this.post);
  }
  @Input() post: Post = {id: 0, albumId: 0, title: '', thumbnailUrl: '', url: ''};
  @Output() detailsClicked = new EventEmitter<void>()

  detailsHandler() {
    this.detailsClicked.emit();
  }
}

