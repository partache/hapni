import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FooterComponent} from './shared/components/footer/footer.component';
import {SharedModule} from "./shared/shared.module";
import { PostsComponent } from './auth/posts/posts.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    PostsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
