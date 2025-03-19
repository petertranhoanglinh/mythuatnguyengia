import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostFormComponent } from './post-form/post-form.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostAdminComponent } from './post-admin/post-admin.component';

const routes: Routes = [
  {path:'sua_bai_viet' , component:PostFormComponent} ,
  {path:'chi_tiet_bai_viet/:id' , component:PostDetailComponent},
  {path:'danh_sach_bai_viet' , component:PostListComponent},
  {path:'quan_ly_bai_viet' , component:PostAdminComponent},
  {path:'sua_bai_viet/:id' , component:PostFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
