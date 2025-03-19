import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonUtils } from 'src/app/common/util/common-utils';
import { ValidationUtil } from 'src/app/common/util/validation.util';
import { CategoryModel } from 'src/app/model/cate.model';
import { getCategory, ProductState } from 'src/app/selectors/product.selector';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
   cates : CategoryModel []  = [];
  cates$ = new Observable<CategoryModel[]>();
  constructor(private productStore: Store<ProductState>) {
      this.cates$ = this.productStore.select(getCategory);
  }

  ngOnInit(): void {
      this.cates$.subscribe(res =>{
          if(ValidationUtil.isNotNullAndNotEmpty(res)){
            this.cates = res;
          }
        })
  }

   toSug (categoryName : string) :string{
      return CommonUtils.toSlug(categoryName);

    }

}
