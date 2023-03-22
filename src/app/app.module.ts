import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AlbumListComponent } from './album-list/album-list.component';
import { AlbumComponent } from './album/album.component';
import { PostMinimalComponent } from './post-minimal/post-minimal.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PostEditComponent } from './post-edit/post-edit.component'

@NgModule({
  declarations: [
    AppComponent,
    AlbumListComponent,
    AlbumComponent,
    PostMinimalComponent,
    PostDetailsComponent,
    AlbumDetailsComponent,
    PostEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'albums', component: AlbumListComponent},
      {path: 'albums/:id', component: AlbumDetailsComponent},
      {path: 'albums/:id/edit/:postId', component: PostEditComponent},
      {path: '', redirectTo: 'albums', pathMatch: 'full'},
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
