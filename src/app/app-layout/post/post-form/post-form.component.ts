import { Component, OnInit } from '@angular/core';
import '@ckeditor/ckeditor5-alignment/build/translations/vi';
import { BlogModel } from 'src/app/model/blog.model';
import { Observable } from 'rxjs';
import { State, Store } from '@ngrx/store';
import { BlogState, selectSelectedBlog, selectSelectedSaveBlog } from 'src/app/selectors/blog.selectors';
import { ValidationUtil } from 'src/app/common/util/validation.util';
import { ToastrService } from 'ngx-toastr';
import { createBlog, createBlogSuccess, loadBlogById } from 'src/app/actions/blog.actions';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  blog: BlogModel = {} as BlogModel;
  blog$ = new Observable<BlogModel>();
  blogDetail$ = new Observable<BlogModel>();
  constructor(private blogStore : Store<BlogState> , private toastr: ToastrService   , private route: ActivatedRoute){
    this.blog$ = this.blogStore.select(selectSelectedSaveBlog);
    this.blogDetail$ = this.blogStore.select(selectSelectedBlog);
  }
  ngOnInit(): void {
    const id  = this.route.snapshot.paramMap.get('id');
    if(id != null){
      this.blogStore.dispatch(loadBlogById({id:String(id)}))
    }
    this.blogDetail$.subscribe(res =>{
      if(ValidationUtil.isNotNullAndNotEmpty(res.id)){
        this.blog = res;
      }
    })
    this.blog$.subscribe(res => {
      if(ValidationUtil.isNotNullAndNotEmpty(res.id)){
        this.toastr.info("save post susccess")
      }
    })
  }
  submitForm() {
    this.blogStore.dispatch(createBlog({blog : this.blog}))
    console.log('Dữ liệu bài viết:', this.blog);
  }
  handelContent(content : string){
    this.blog.content = content;
  }
  ngOnDestroy(): void {
    this.blogStore.dispatch(createBlogSuccess({blog: {} as BlogModel}))
  }
}


