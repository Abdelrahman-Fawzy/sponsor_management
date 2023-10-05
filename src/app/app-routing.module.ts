import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SponsorsListComponent } from './sponsors/sponsors-list/sponsors-list.component';
import { CreateSponsorComponent } from './sponsors/create-sponsor/create-sponsor.component';

const routes: Routes = [
  {path: '', component: SponsorsListComponent},
  {path: 'create', component: CreateSponsorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
