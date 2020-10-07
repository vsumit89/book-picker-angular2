import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { BookInfoComponent } from './book-info/book-info.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LocationComponent } from './location/location.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SelectGenreComponent } from './select-genre/select-genre.component';

import { AuthGaurdGuard } from './services/auth-gaurd.guard'
import { SettingsComponent } from './settings/settings.component';
import { YourBooksComponent } from './your-books/your-books.component';

const routes: Routes = [
  { path: 'select-genre', component: SelectGenreComponent},
  { path: 'location', component: LocationComponent },
  {
    path: 'home',
    children: [
      { path: '', component: HomepageComponent },
      { path: 'book-info', component: BookInfoComponent, canActivate: [AuthGaurdGuard] },
    ]
  },
  { path: 'add-book', component: AddBookComponent, canActivate: [AuthGaurdGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGaurdGuard] },
  { path: 'your-books', component: YourBooksComponent, canActivate: [AuthGaurdGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGaurdGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
