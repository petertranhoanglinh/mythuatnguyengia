import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getCategory, getProducts, ProductState } from '../selectors/product.selector';
import { getCategoryAction, productAction } from '../actions/product.action';
import { ProductResponseModel } from '../model/product-response.model';
import { ProductModel } from '../model/product.model';
import { environment } from 'src/environments/environment';
import { SwiperService } from '../service/swiper.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { CategoryModel } from '../model/cate.model';
import { ValidationUtil } from '../common/util/validation.util';
import { CommonUtils } from '../common/util/common-utils';

declare var initSlider: any;  // Khai báo jQuery

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit ,  AfterViewInit {
  @ViewChild('anchor', { static: false }) anchor!: ElementRef;

  items$: Observable<ProductResponseModel>;
  items: ProductModel[] = [];
  page = 0;
  len = 8;
  loading = false; // Trạng thái đang tải
  apiUrl = environment.apiUrl;
  total = 0;
    cates : CategoryModel []  = [];
    cates$ = new Observable<CategoryModel[]>();
    cateActive: CategoryModel = {} as CategoryModel;

    feedbacks = [
      { name: 'Nguyễn Văn A', comment: 'Dịch vụ rất tuyệt vời!', avatar: 'https://i.pravatar.cc/150?img=1' },
      { name: 'Trần Thị B', comment: 'Sản phẩm chất lượng, sẽ mua lại.', avatar: 'https://i.pravatar.cc/150?img=2' },
      { name: 'Lê Văn C', comment: 'Giao hàng nhanh chóng, đóng gói cẩn thận.', avatar: 'https://i.pravatar.cc/150?img=3' },
      { name: 'Hoàng Minh D', comment: 'Tôi rất hài lòng với dịch vụ chăm sóc khách hàng.', avatar: 'https://i.pravatar.cc/150?img=4' }
    ];

  public swiperConfig = {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,

    breakpoints: {
        640: {
            slidesPerView: 2,
        },
        968: {
            slidesPerView: 3,
        }
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
};
  observer!: IntersectionObserver;
  constructor(private productStore: Store<ProductState>
    , private _swiperService: SwiperService ,
     private router: Router) {
    this.items$ = this.productStore.select(getProducts);
        this.cates$ = this.productStore.select(getCategory);
  }
  ngOnInit(): void {
    setTimeout(() => {
      initSlider() ,

      this._swiperService.createSwiper('feedback-swiper', {
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        grabCursor: true,
        allowTouchMove: true,
        centeredSlides: false, // Không căn giữa để tránh bị lệch
        breakpoints: {
          320: { slidesPerView: 1, spaceBetween: 5 }, // Mobile nhỏ
          480: { slidesPerView: 1, spaceBetween: 10 }, // Điện thoại vừa
          768: { slidesPerView: 2, spaceBetween: 15 }, // Tablet
          1024: { slidesPerView: 3, spaceBetween: 20 }, // Laptop
        },
      });


      this._swiperService.createSwiper('reviewSwiperAB', this.swiperConfig);
    }, 500);
    this.loadProduct();
     this.productStore.dispatch(getCategoryAction());
    this.items$.subscribe((res) => {
      if (res && res.products.length) {
        this.items = res.products
        this.loading = false;
        this.total = res.totalCount;
      }
    });

    this.cates$.subscribe(res =>{
      if(ValidationUtil.isNotNullAndNotEmpty(res)){
        this.cates = res;
      }
    })
  }

  ngAfterViewInit(): void {
    this.setupObserver();

    this._swiperService.createSwiper('reviewSwiperAB', this.swiperConfig);
  }

  toSug (categoryName : string) :string{
    return CommonUtils.toSlug(categoryName);
  }

  loadProduct(): void {
    this.loading = true;
    this.productStore.dispatch(
      productAction({
        params: {
          page: this.page,
          len: this.len,
        },
      })
    );
  }

  setupObserver(): void {
    const options = {
      root: null,
      threshold: 0.1,
    };
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !this.loading) {
        this.page++;
        this.loadProduct();
      }
    }, options);
    this.observer.observe(this.anchor.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  async handleLink(item: ProductModel) {
    try {
      if (!item?.id) {
        return;
      }
      await this.router.navigate(["/du-an/chi-tiet/", item.id]);
    } catch (error) {
    } finally {
    }
  }

  handlePageEvent(page:PageEvent){
      this.page = page.pageIndex;
      this.len = page.pageSize;
    this.loadProduct()
  }

  onPageChange(newPage: number) {
    this.page = newPage;
    this.loadProduct()
  }
}
