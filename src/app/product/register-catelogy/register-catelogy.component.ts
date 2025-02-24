import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { param } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { getCategoryAction, saveCategoryAction } from 'src/app/actions/product.action';
import { ValidationUtil } from 'src/app/common/util/validation.util';
import { CategoryModel } from 'src/app/model/cate.model';
import { OverlayLoadingState } from 'src/app/selectors/overlay-loading.selector';
import { getCategory, ProductState } from 'src/app/selectors/product.selector';

@Component({
  selector: 'app-category-register',
  templateUrl: './register-catelogy.component.html',
  styleUrls: ['./register-catelogy.component.css']
})
export class RegisterCategoryComponent implements OnInit {
  categoryForm: FormGroup = {} as FormGroup;
  submitted = false;
  cates =  [] as CategoryModel [];
  cates$ = new Observable<CategoryModel[]>();
  img : any ;
  
  constructor(private formBuilder: FormBuilder ,
         private toastr: ToastrService ,
        private productStore: Store<ProductState>,
        private overlayLoadingStore: Store<OverlayLoadingState>,
  ) {
    this.cates$ = this.productStore.select(getCategory);
  }

  ngOnInit() {
    this.categoryForm = this.formBuilder.group({
      categoryName: ['', Validators.required],
      description: ['', Validators.required],
      parentCategory: [''],
      status: ['active'],
      sortNo: ['', [Validators.required, Validators.min(0)]]
    });
    this.productStore.dispatch(getCategoryAction());
    this.cates$.subscribe(res =>{
      if(ValidationUtil.isNotNullAndNotEmpty(res)){
        this.cates = res;
      }
    })
  }
  get f() {
    return this.categoryForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.categoryForm.valid) {
      this.productStore.dispatch(saveCategoryAction({
        params: this.categoryForm.value, 
        img: this.img 
      }));  
    }
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.img = file
    }
  }
}
