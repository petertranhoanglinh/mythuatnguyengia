import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthDetail } from 'src/app/common/util/auth-detail';

@Component({
  selector: 'app-message-button',
  templateUrl: './message-button.component.html',
  styleUrls: ['./message-button.component.css']
})
export class MessageButtonComponent {
  constructor(private router: Router , private toastr: ToastrService ) {}
  openChat() {
    // if(AuthDetail.isLogin()){
    //   this.router.navigate(['/chat']);
    // }else{
    //   this.toastr.info("Hãy đăng nhập để sử dụng dịch vụ này của chúng tôi")
    // }

    window.open("https://www.tiktok.com/@wall_decor?lang=vi-VN", "_blank");

  }
  openZalo() {
    window.open("https://id.zalo.me/account?continue=http://zalo.me/0949315809", "_blank");
    window.location.href = "zalo://send?phone=0949315809";
}
  openFacebook(){
    window.open("https://www.facebook.com/MyThuatNguyenGia0949315809", "_blank");
  }
}
