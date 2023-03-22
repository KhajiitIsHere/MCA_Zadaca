import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../album.service';
import { Album } from '../model/album';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit{

  albums: Album[] = [];

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    this.albumService.getAllAlbums().subscribe(data => {
      console.log(data);
      this.albums = data;
    })
  }


}
