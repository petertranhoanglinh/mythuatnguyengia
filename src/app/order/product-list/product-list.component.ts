import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs/internal/Observable';
import { setShowOverlayLoading } from 'src/app/actions/overlay-loading.action';
import { getCategoryAction, productAction } from 'src/app/actions/product.action';
import { ValidationUtil } from 'src/app/common/util/validation.util';
import { CategoryModel } from 'src/app/model/cate.model';
import { ProductResponseModel } from 'src/app/model/product-response.model';
import { ProductModel } from 'src/app/model/product.model';
import { OverlayLoadingState } from 'src/app/selectors/overlay-loading.selector';
import { getCategory, getProducts, ProductState } from 'src/app/selectors/product.selector';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit , OnDestroy , AfterViewInit   {

  items$ = new Observable<ProductResponseModel>();
  items : ProductModel [] = [] ;
  cates : CategoryModel []  = [];
  cates$ = new Observable<CategoryModel[]>();
  cateActive: CategoryModel = {} as CategoryModel;
  activeCate = '';
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
    private cdr: ChangeDetectorRef
  ) {

    this.items$ = this.productStore.select(getProducts);
    this.cates$ = this.productStore.select(getCategory);
  }

  ngOnInit( ): void {
    this.loadProduct();
    this.productStore.dispatch(getCategoryAction());
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
      }
    })
  }

  loadProduct():void{
    // this.overlayLoadingStore.dispatch(setShowOverlayLoading({loading:true}));
    this.productStore.dispatch(productAction({
      params : {
         page:this.page,
         len : this.len ,
         category : this.activeCate ,
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

  search(id:string){
    this.key = '';
    this.activeCate = id;
    this.loadProduct();
    this.isShowKey = false;

    if(ValidationUtil.isNotNullAndNotEmpty(id)){
      this.cateActive = this.cates.find(cate => cate.id === id)!;
    }
  }

  searchBtn(){
    this.activeCate = '';
    this.loadProduct();
    this.isShowKey = true;
  }
  onPageChange(newPage: number) {
    this.page = newPage;
    this.loadProduct();
    // Gọi API để lấy dữ liệu trang mới
  }


}
