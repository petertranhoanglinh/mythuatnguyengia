import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ProductResponseModel } from './../../model/product-response.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, observable } from 'rxjs';
import { productAction } from 'src/app/actions/product.action';
import { AuthDetail } from 'src/app/common/util/auth-detail';
import { ValidationUtil } from 'src/app/common/util/validation.util';
import { ProductModel } from 'src/app/model/product.model';
import { getProducts, ProductState } from 'src/app/selectors/product.selector';
import { CartService } from 'src/app/service/cart-service.service';
import { ProductService } from 'src/app/service/product.service';
import { environment } from 'src/environments/environment';
import { OverlayLoadingState } from 'src/app/selectors/overlay-loading.selector';
import { setShowOverlayLoading } from 'src/app/actions/overlay-loading.action';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  isPopupOpen = true;
  product$ = new Observable<ProductResponseModel>();

  title = 'Dịch Vụ Vẽ Tranh Cảnh Biển';
  description = `Chúng tôi cung cấp dịch vụ vẽ tranh tường cảnh biển mang lại không gian thư giãn...`;
  serviceImage = 'https://mythuattranvuong.com/public/ckeditor/imagesimages/ve-tranh-tuong-phong-canh-bien-anh-6.jpg'; // Thay đổi thành URL hình ảnh bạn muốn
  projects = [
    'https://scontent.fsgn5-13.fna.fbcdn.net/v/t39.30808-6/479178575_1129346045601423_3647820936825958618_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEn48g3fmIIo-SohU03KWQ8zWivbz7gCcPNaK9vPuAJw0ob4Lw9Foo6A6OpGhQDQNnlGb401uGo1rS0ED8S4KNf&_nc_ohc=N8wpfdU9Wv8Q7kNvgHUDajJ&_nc_oc=AdjU6sqLqvtLn0tlrTwNpypDwUZuRKO5QGJYOobbV8hnAU_oRU4dECjt0aWrvh_eQt0&_nc_zt=23&_nc_ht=scontent.fsgn5-13.fna&_nc_gid=A1L-kQrWTNYg56mwC8PUc3S&oh=00_AYAsJzgQBmLOkuTvgdYsCjGabtQ8ADUTX0F-57rprrmBBA&oe=67C0985A',
    'https://mythuatnguyentam.com/img/20230101211024-4722-6707.jpg',
    'https://mythuatnguyentam.com/img/20230101211024-4722-6707.jpg',
    'https://mythuatnguyentam.com/img/20230101211024-4722-6707.jpg',
    'https://mythuatnguyentam.com/img/20230101211024-4722-6707.jpg',
    'https://mythuatnguyentam.com/img/20230101211024-4722-6707.jpg',
    'https://thegioigiaydantuong.vn/wp-content/uploads/2016/10/tranh-d%C3%A1n-t%C6%B0%E1%BB%9Dng-bi%E1%BB%83n-160.jpg',
  ];
  
  // Thông tin liên hệ
  contactInfo = {
    phone: '0949 315 809',
    email: 'contact@tranhve.com',
    address: '123 Đường Nghệ Thuật, Hà Nội, Việt Nam',
  };

  product : ProductModel = {} as ProductModel;
  constructor(private route: ActivatedRoute , private productStore: Store<ProductState>,  private overlayLoadingStore: Store<OverlayLoadingState>
    ,private cartService : CartService,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer
  ) {
    this.product$ = this.productStore.select(getProducts);
  }
  productId:string = "";
  apiUrl:string = environment.apiUrl;

    descriptionTest = '<p><strong>This is a product description</strong></p><p>This is another paragraph that should appear on a new line.</p>'
    // các thuộc tính khác



  ngOnInit(): void {
    this.overlayLoadingStore.dispatch(setShowOverlayLoading({loading:true}));
    this.route.paramMap.subscribe(params => {
      this.productId = String(params.get('product'));
      this.productStore.dispatch(productAction({params:{
        id:this.productId
      }}))
    });

    this.product$.subscribe(res=>{
      if(ValidationUtil.isNotNullAndNotEmpty(res)){
        this.product = res.products[0];
      }
    })

    setTimeout(() => {
      this.overlayLoadingStore.dispatch(setShowOverlayLoading({loading:false}));
    }, 1000);
  }

  closePopup():void{
    this.isPopupOpen = false;
  }

  clickBuy(item:ProductModel):void{
    const id =  AuthDetail.getLoginedInfo()?.id;

    this.cartService.addToCart(String(id), item, 1 );

    this.toastr.success("Add Cart suscess")


  }

  getSanitizedDescription(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.product.description);
  }

}
