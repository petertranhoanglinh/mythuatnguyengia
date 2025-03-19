import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs/internal/Observable';
import { setProductName } from 'src/app/actions/header.action';
import { setShowOverlayLoading } from 'src/app/actions/overlay-loading.action';
import { getCategoryAction, productAction } from 'src/app/actions/product.action';
import { CommonUtils } from 'src/app/common/util/common-utils';
import { ValidationUtil } from 'src/app/common/util/validation.util';
import { CategoryModel } from 'src/app/model/cate.model';
import { ProductResponseModel } from 'src/app/model/product-response.model';
import { ProductModel } from 'src/app/model/product.model';
import { HeaderState } from 'src/app/selectors/header.selector';
import { OverlayLoadingState } from 'src/app/selectors/overlay-loading.selector';
import { getCategory, getProducts, ProductState } from 'src/app/selectors/product.selector';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  items$ = new Observable<ProductResponseModel>();
   items : ProductModel [] = [] ;
   cates : CategoryModel []  = [];
   cates$ = new Observable<CategoryModel[]>();
   cateActive: CategoryModel = {} as CategoryModel;
   cateId = '';
   cateName = ''
   customOptions: OwlOptions ={
     nav: false,
     dots: true,
     margin: 30,
     loop: false,
     responsive: {
       0: {
         items: 2
       },
       420: {
         items: 3
       },
       600: {
         items: 4
       },
       900: {
         items: 5
       },
       1024: {
         items: 6,
         nav: true,
         dots: false
       }
     }
   };
   key = '';
   page = 0;
   len  = 8;
   total = 0;
   countRewiew = 0;
   isShowKey =  false;
   apiUrl = environment.apiUrl;

   constructor(private productStore : Store<ProductState> ,
     private overlayLoadingStore: Store<OverlayLoadingState>,
     private headerStore: Store<HeaderState>,
     private cdr: ChangeDetectorRef,
     private route: ActivatedRoute,
    private titleService: Title // Thêm Title service
   ) {

     this.items$ = this.productStore.select(getProducts);
     this.cates$ = this.productStore.select(getCategory);
   }

   ngOnInit( ): void {

     this.productStore.dispatch(getCategoryAction());

     this.route.paramMap.subscribe(params => {
      this.cateName = params.get('cate') || '';
      console.log('Category:', this.cateName);
    });

     this.items$.subscribe(res => {
       if (ValidationUtil.isNotNullAndNotEmpty(res)){
         this.items = res.products;
         this.total = res.totalCount;
         this.countRewiew = res.countRewiew;
       }
       setTimeout(() => {
         this.overlayLoadingStore.dispatch(setShowOverlayLoading({loading:false}));
       }, 1000);
     })
     this.cates$.subscribe(res =>{
       if(ValidationUtil.isNotNullAndNotEmpty(res)){
         this.cates = res;
         this.cates.forEach(cate => {
           if(this.cateName  == CommonUtils.toSlug(cate.categoryName)){
             this.overlayLoadingStore.dispatch(setShowOverlayLoading({loading:true}));
             this.cateId = cate.id;
             this.cateActive = cate;
             this.loadProduct();
             this.headerStore.dispatch(setProductName({ productname: cate.categoryName }));
             this.titleService.setTitle(cate.categoryName || 'Chi tiết bài viết');
           }
        });
       }
     })
   }

   loadProduct():void{
     this.productStore.dispatch(productAction({
       params : {
          page:this.page,
          len : this.len ,
          category : this.cateId ,
          name : this.key
       }
     }))
   }
   handlePageEvent(page:PageEvent){
     this.page = page.pageIndex;
     this.len = page.pageSize;
     this.loadProduct();
   }
   ngOnDestroy(): void {
    this.cateName = '';
    this.titleService.setTitle( 'Nguyễn Gia - Tranh vẽ tường chuyên nghiệp');
    this.headerStore.dispatch(setProductName({ productname: '' }));
     const carousel = document.querySelector('owl-carousel-o');
     if (carousel) {
       carousel.dispatchEvent(new CustomEvent('destroy'));
     }

   }

   ngAfterViewInit(): void {
     setTimeout(() => {
       const carousel = document.querySelector('owl-carousel-o');
       if (carousel) {
         carousel.dispatchEvent(new CustomEvent('reinitialize'));
       }
     }, 0);
   }
   onPageChange(newPage: number) {
     this.page = newPage;
     this.loadProduct();
   }



}
