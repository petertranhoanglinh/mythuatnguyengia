import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutCompanyComponent } from './about-company/about-company.component';
import { AboutStoryComponent } from './about-story/about-story.component';
import { ContactComponent } from './contact/contact.component';
import { AboutTeamComponent } from './about-team/about-team.component';
import { AboutTestimonialsComponent } from './about-testimonials/about-testimonials.component';

const routes: Routes = [
  {path:"about-company" , component:AboutCompanyComponent},
  {path:"about-story" , component:AboutStoryComponent},
  {path:"team" , component:AboutTeamComponent},
  {path:"testimonials" , component:AboutTestimonialsComponent},
  {path:"contact" , component:ContactComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
