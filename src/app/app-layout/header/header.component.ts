import { PageHeading } from './../../model/page-heading';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { GuardsCheckEnd, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable, of } from 'rxjs';
import { getTestConnectAction } from 'src/app/actions/coin.action';
import { setPageHeading } from 'src/app/actions/header.action';
import { AuthDetail } from 'src/app/common/util/auth-detail';
import { DateUtils } from 'src/app/common/util/date.util';
import { ValidationUtil } from 'src/app/common/util/validation.util';
import { Menu } from 'src/app/model/menu.model';
import { ResultModel } from 'src/app/model/result.model';
import { AuthState, getCartNumber } from 'src/app/selectors/auth.selector';
import { CoinState, getTestConnect } from 'src/app/selectors/coin.selector';
import { HeaderState, getIsHeader } from 'src/app/selectors/header.selector';
import { CartService } from 'src/app/service/cart-service.service';

declare var initHeader: any;  // Khai báo jQuery
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  subMenu: any = [];
  isHeader$ = new Observable<Boolean>();
  isHeader: boolean = true;
  isLogin: boolean = AuthDetail.isLogin();
  wellcome: string = ''
  isConnect:boolean = false;
  resultConnect$ =  new Observable<ResultModel>();
  quantityCart$ = new Observable<number>();
  quantityCart :number = 0;
  isPopupOpen = false;
  isMobileMenuOpen = false;
  menus: Menu[] = [
    {
      label:'Giới thiệu', route : '/gioi_thieu'
    },
    {
      label:'Dịch vụ vẽ tranh',
      route:'/san_pham/danh_sach_san_pham',
    },
    {
      label:'Bài viết',
      route:'/bai_viet/danh_sach_bai_viet',
    },
    {
      label:'Báo Giá',
      route:'/gioi_thieu/bao-gia',
    },
    // {
    //   label:'Liên Hệ',
    //   route:'/about/contact',
    // },
  ];
  currentPath: string = '';
  activeParent:string = '';



  constructor(private headerStore: Store<HeaderState>,private authStore: Store<AuthState>,
    private router: Router, private cartService: CartService,private renderer: Renderer2,
    private el: ElementRef ,
    private coinStore: Store<CoinState>) {
    this.isHeader$ = this.headerStore.select(getIsHeader);
    this.resultConnect$ = this.coinStore.select(getTestConnect);
    this.quantityCart$ = this.authStore.select(getCartNumber)
  }
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.initMenu(event.url);
      }
    });

    const overlay = this.el.nativeElement.querySelector('.mobile-menu-overlay');
    if (overlay) {
      this.renderer.listen(overlay, 'click', () => {
        this.closeMobileMenu();
      });
    }
    setTimeout(() => {
      initHeader()
    }, 500);
    let role  = String(AuthDetail.getLoginedInfo()?.role);
    if(role == 'admin'){
      this.menus.push({
        label: 'Administrator',
        items: [
          {label : "Quản Lý Dịch Vụ Vẽ Tranh" , route: '/san_pham/newProduct' , isShowPageHeading:true },
          {label : "Đăng Ký Danh Mục Vẽ Tranh" , route: '/product/regcate'  , isShowPageHeading:true},
          {label: 'Thêm Mới Bài Viết', route: '/bai_viet/sua_bai_viet'  , isShowPageHeading:true},
          {label: 'Quản Lý Bài Viết', route: '/bai_viet/quan_ly_bai_viet'  , isShowPageHeading:true},
        ]
      })
    }
    this.initMenu(window.location.pathname );
    if(Number(AuthDetail.getLoginedInfo()?.logoutDate) <= Number(DateUtils.getCurrFullDateTimeStrBlank(new Date()))){
      AuthDetail.actionLogOut();
      window.location.href = '/';
    }
    if (this.isLogin) {
      this.wellcome = "Wellcome to " + String(AuthDetail.getLoginedInfo()?.email)
    }
    this.isHeader$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.isHeader = Boolean(res)
      } else {
        this.isHeader = true;
      }
    })
    this.quantityCart = this.cartService.getCart(String(AuthDetail.getLoginedInfo()?.id)).length;
    this.quantityCart$.subscribe(res => {
        this.quantityCart = res;
    })
  }
  findChildrenByName(menuData: any, categoryName: any) {
    for (const category of menuData) {
      if (category.name === categoryName) {
        return category.children;
      } else {
        for (const subCategory of category.children) {
          if (subCategory.name === categoryName) {
            return subCategory.children;
          }
        }
      }
    }
    return null;
  }
  logOut() {
    AuthDetail.actionLogOut();
    window.location.href = "/"
  }
  findMenuPath(route: string): string {
    let path: string[] = [];
    const searchMenu = (menuArray: Menu[], parentLabel?: string) => {
      for (const menu of menuArray) {
        if (menu.route === route) {
          if (parentLabel) {
            path.push(parentLabel);
          }
          path.push(menu.label);
          return true;
        }
        if (menu.items && menu.items.length > 0) {
          for (const subItem of menu.items) {
            if (subItem.route === route) {
              if (parentLabel) {
                path.push(parentLabel);
              }
              path.push(menu.label);
              path.push(subItem.label);
              return true;
            }
            if (subItem.items && subItem.items.length > 0) {
              if (searchMenu(subItem.items, subItem.label)) {
                path.unshift(menu.label);
                return true;
              }
            }
          }
        }
      }
      return false;
    };
    searchMenu(this.menus);
    return path.length ? path.join(' > ') : 'Not Found';
  }
  onMenuClick(menu: Menu): void {

    this.activeParent = String(menu.route);
    if(ValidationUtil.isNotNullAndNotEmpty(menu.route)){
      this.closeMobileMenu();
      this.currentPath = this.findMenuPath(String(menu.route));
    }
    let isShow  = menu.isShowPageHeading;
    if(isShow == undefined){
      isShow = true;
    }
    const pageHeading : PageHeading = {
      chilren:this.currentPath,
      isShow: isShow ,
      menu: menu
    }
    this.headerStore.dispatch(setPageHeading({pageHeading:pageHeading}))
  }

  initMenu(url:string){
    const menus = this.menus;
    let result: Menu | undefined;
    const search = (menuArray: Menu[]): Menu | undefined => {
      for (const menu of menuArray) {
        if (menu.route && url && menu.route.toLowerCase() === url.toLowerCase()) {
          return menu;
        }
        if (menu.items && menu.items.length > 0) {
          result = search(menu.items);
          if (result) {
            return result;
          }
        }
      }
      return undefined;
    };
    if(url.includes("chi_tiet_san_pham") || url.includes("danh_muc")){

      const pageHeading : PageHeading = {
        chilren:this.currentPath,
        isShow: true ,
        menu:     {
          label:'Dịch vụ vẽ tranh',
          route:'/san_pham/danh_sach_san_pham',
        },
      }
      this.headerStore.dispatch(setPageHeading({pageHeading:pageHeading}))
      return;
    }
    const menu = search(menus);

    this.onMenuClick(menu as Menu)


  }
  closePopup(): void {
    this.isPopupOpen = false;
  }
 openMobileMenu() {
  const overlay = this.el.nativeElement.querySelector('.mobile-menu-overlay');
  const menuContainer = this.el.nativeElement.querySelector('.mobile-menu-container');

  if (overlay && menuContainer) {
    this.renderer.setStyle(overlay, 'display', 'block');
    this.renderer.addClass(menuContainer, 'open');
    this.isMobileMenuOpen = true;
  } else {
    console.error('Không tìm thấy phần tử .mobile-menu-overlay hoặc .mobile-menu-container');
  }
}
closeMobileMenu() {
  const overlay = this.el.nativeElement.querySelector('.mobile-menu-overlay');
  const menuContainer = this.el.nativeElement.querySelector('.mobile-menu-container');
  if (overlay && menuContainer) {
    this.renderer.setStyle(overlay, 'display', 'none');
    this.renderer.removeClass(menuContainer, 'open');
    this.isMobileMenuOpen = false;
  } else {
    console.error('Không tìm thấy phần tử .mobile-menu-overlay hoặc .mobile-menu-container');
  }
}

toggleMenu(menuItem: HTMLLIElement , menu: Menu): void {

  this.onMenuClick(menu);
  // if (menuItem.classList.contains('open')) {
  //   this.renderer.removeClass(menuItem, 'open');
  // } else {
  //   this.renderer.addClass(menuItem, 'open');
  // }
  const navMenu = document.getElementById('navmenu');
  navMenu?.classList.toggle('show');
}


clickHome() {
  this.activeParent = '';
  this.router.navigateByUrl("/")
}







preventDefault(event: Event): void {
  event.preventDefault(); // Ngăn chuyển hướng
}
}


