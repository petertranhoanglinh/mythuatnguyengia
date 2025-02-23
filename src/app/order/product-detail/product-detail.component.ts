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
  title = 'Tranh cảnh biển nhẹ nhàng';
  descriptionTest = `<div _ngcontent-kub-c157=""><p><span style="font-family:Roboto;font-size:19px;">Tranh Cảnh Biển Nhẹ Nhàng với hình ảnh thuyền buồm gợi nên ý nghĩa may mắn, giúp mọi công việc trong quá trình kinh doanh diễn ra suôn sẻ, thuận lợi. Mọi xui xẻo, tai ương sẽ nhanh chóng qua đi tựa như việc con thuyền vượt qua mọi sóng to gió lớn trên biển ca bao la để đánh bắt được nhiều cá tôm. Ngoài ra khi cảm thấy mệt mỏi hay căng thẳng, hãy ngắm nhìn bức vẽ tranh phong cảnh biển đẹp, sẽ giúp bạn thư giãn một cách vô cùng hiệu quả.</span></p><p><span style="font-family:Roboto;font-size:19px;"><img style="height:auto;" src="https://tranhsondauthaison.com.vn/wp-content/uploads/2021/02/tranh-canh-bien-1.jpg" width="800" height="643" loading="lazy"></span></p><h3><span style="font-family:Roboto;font-size:19px;"><strong>Các ưu điểm của tranh Cảnh Biển Nhẹ Nhàng?</strong></span></h3><p><span style="font-family:Roboto;font-size:19px;">Khi treo tranh về Cảnh Biển Nhẹ Nhàng, bạn sẽ được chiêm ngưỡng phong cảnh biển hàng ngày ngay tại chính căn phòng, tạo cảm giác không gian bao la sóng biển sẽ mang hơi thở tươi mát, mới mẻ cho căn phòng. Tranh phù hợp với tất cả không gian nội thất nào, dù đó là không gian cổ kính hay hiện đại, sẽ tạo điểm nhấn cho căn phòng giúp không gian trở nên nổi bật, hoàn mỹ hơn.</span></p><p><span style="font-family:Roboto;font-size:19px;"><img style="height:auto;" src="https://tranhsondauthaison.com.vn/wp-content/uploads/2020/12/tranh-phong-canh-22-12-5.jpg" width="800" height="561" loading="lazy"></span></p><h3><span style="font-family:Roboto;font-size:19px;"><strong>Kích thước khung tranh sơn dầu Thái Sơn.</strong></span></h3><p><span style="font-family:Roboto;font-size:19px;">Một số kích thước khung tranh phổ biến, mà </span><a href="https://tranhsondauthaison.com.vn/"><span style="font-family:Roboto;font-size:19px;">Công ty tranh sơn dầu Thái Sơn</span></a><span style="font-family:Roboto;font-size:19px;"> cung cấp gồm: 30×30 . 30×40. 40×40. 40×50. 40×60. 50×70. 60×80. 60×90. 60×120. 70×120. 80×160. 90×180. 100×200. 120x240cm. Ngoài ra chúng tôi cung cấp kích thước theo yêu cầu khách hàng.</span></p><p><span style="font-family:Roboto;font-size:19px;"><img style="height:auto;" src="https://tranhsondauthaison.com.vn/wp-content/uploads/2021/02/tranh-thuyen-va-bien-1-1.jpg" width="800" height="473" loading="lazy"></span></p><h3><span style="font-family:Roboto;font-size:19px;"><strong>CAM KẾT CHẤT LƯỢNG TRANH SƠN DẦU TẠI CÔNG TY THÁI SƠN</strong></span></h3><ul><li><span style="font-family:Roboto;font-size:19px;">Sơn dầu được nhập khẩu chính hãng từ Anh, Nhật Bản, Hàn Quốc,… đảm bảo độ bền, thời gian sử dụng lên đến 70 năm.</span></li><li><span style="font-family:Roboto;font-size:19px;">Chúng tôi sử dụng vải bố cao cấp, loại dày dặn, khó rách để vẽ tranh sơn dầu.</span></li><li><span style="font-family:Roboto;font-size:19px;">Dễ dàng vệ sinh, bảo quản trong suốt quá trình sử dụng.</span></li><li><span style="font-family:Roboto;font-size:19px;">Khung xương của tranh được làm từ gỗ thông, qua xử lý, tẩm sấy nghiêm ngặt.</span></li><li><span style="font-family:Roboto;font-size:19px;">Khung tranh làm từ chất liệu composite cao cấp, có độ cứng, độ bền cơ học cao.</span></li><li><span style="font-family:Roboto;font-size:19px;">Kích thước tranh của chúng tôi rất đa dạng, có loại nhỏ, vừa, to.</span></li><li><span style="font-family:Roboto;font-size:19px;">Bảo hành từ 5 đến 20 năm tùy vào từng dòng tranh.</span></li></ul><h3><span style="font-family:Roboto;font-size:19px;"><strong>QUY TRÌNH TIẾP NHẬN KHÁCH HÀNG CỦA TRANH SƠN DẦU THÁI SƠN</strong></span></h3><ol><li><span style="font-family:Roboto;font-size:19px;">Bước 1: Tiếp nhận thông tin khách hàng.</span></li><li><span style="font-family:Roboto;font-size:19px;">Bước 2: Họa sĩ chuyên gia tư vấn khách hàng.</span></li><li><span style="font-family:Roboto;font-size:19px;">Bước 3: Thống nhất hình ảnh với khách hàng.</span></li><li><span style="font-family:Roboto;font-size:19px;">Bước 4: Khách hàng tiến hành cọc 30 – 50% giá trị tranh.</span></li><li><span style="font-family:Roboto;font-size:19px;">Bước 5: Cam kết thời gian hoàn thành sản phẩm.</span></li><li><span style="font-family:Roboto;font-size:19px;">Bước 6: Tiến hành trả hàng cho khách.</span></li><li><span style="font-family:Roboto;font-size:19px;">Bước 7: Cung cấp phiếu bảo hành cho khách hàng.</span></li></ol></div>`;
  description = `Chúng tôi cung cấp dịch vụ vẽ tranh tường cảnh biển mang lại không gian thư giãn...`;
  serviceImage = 'https://mythuattranvuong.com/public/ckeditor/imagesimages/ve-tranh-tuong-phong-canh-bien-anh-6.jpg'; // Thay đổi thành URL hình ảnh bạn muốn
  projects = [
    'https://scontent.fsgn5-13.fna.fbcdn.net/v/t39.30808-6/479178575_1129346045601423_3647820936825958618_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEn48g3fmIIo-SohU03KWQ8zWivbz7gCcPNaK9vPuAJw0ob4Lw9Foo6A6OpGhQDQNnlGb401uGo1rS0ED8S4KNf&_nc_ohc=N8wpfdU9Wv8Q7kNvgHUDajJ&_nc_oc=AdjU6sqLqvtLn0tlrTwNpypDwUZuRKO5QGJYOobbV8hnAU_oRU4dECjt0aWrvh_eQt0&_nc_zt=23&_nc_ht=scontent.fsgn5-13.fna&_nc_gid=A1L-kQrWTNYg56mwC8PUc3S&oh=00_AYAsJzgQBmLOkuTvgdYsCjGabtQ8ADUTX0F-57rprrmBBA&oe=67C0985A',

    'https://thegioigiaydantuong.vn/wp-content/uploads/2016/10/tranh-d%C3%A1n-t%C6%B0%E1%BB%9Dng-bi%E1%BB%83n-160.jpg',
    'https://thegioigiaydantuong.vn/wp-content/uploads/2016/10/tranh-d%C3%A1n-t%C6%B0%E1%BB%9Dng-bi%E1%BB%83n-160.jpg',
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
