import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SubdivisionPageComponent} from "./subdivision-page/subdivision-page.component";

const routes: Routes = [
  {
    path: '',
    component: SubdivisionPageComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
