import { param } from 'jquery';
import { PageEvent } from '@angular/material/paginator';
import { ResultModel } from './../../model/result.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/internal/Observable';
import { getCategoryAction, productAction, productActionSuscess, saveProductAction, saveProductActionSuscess } from 'src/app/actions/product.action';
import { ValidationUtil } from 'src/app/common/util/validation.util';
import { ProductResponseModel } from 'src/app/model/product-response.model';
import { ContentItem, ProductModel } from 'src/app/model/product.model';
import { TableConfig } from 'src/app/model/table-config';
import { OverlayLoadingState } from 'src/app/selectors/overlay-loading.selector';
import { getCategory, getProducts, getResultSaveProduct, ProductState } from 'src/app/selectors/product.selector';
import { ProductService } from 'src/app/service/product.service';
import { environment } from 'src/environments/environment';
import { CategoryModel } from 'src/app/model/cate.model';
import { ImageUploadResult } from 'src/app/components/upload-muti-image/upload-muti-image.component';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  apiUrl: string = environment.apiUrl;
  selectedFiles: File[] = [];

  product = {
    id: null,
    name: '',
    price: 0,
    stock: 0,
    description: '',
    sale: false,
    new: false,
    best: false,
    rate: 0,
    category: '' ,
    contentList : [],
  };
  img: any = '';

  imgName: any = '';
  result$ = new Observable<ResultModel>();
  cates = [] as CategoryModel[];
  cates$ = new Observable<CategoryModel[]>();
  oldSliderName = [] as string  [];

  config: TableConfig = {
    columns: [
      { header: "Product Name", field: "name" },
      { header: "Price", field: "price" },
      { header: "Rate Sale", field: "rateShow" },
      { header: "Price Sale", field: "priceSaleShow" },
      { header: "Stock", field: "stock" },
    ]

  }

  contentList: { title: string; content: string }[] = [];
  newContent = { title: '', content: '' };



  isPopupOpen = false;

  items$ = new Observable<ProductResponseModel>();
  items: ProductModel[] = [];

  page = 0;
  len = 5;
  total = 0;

  @ViewChild('descriptionContent', { static: false }) descriptionContent!: ElementRef;


  constructor(private productStore: Store<ProductState>,
    private toastr: ToastrService,
    private overlayLoadingStore: Store<OverlayLoadingState>,

  ) {

    this.result$ = this.productStore.select(getResultSaveProduct);
    this.items$ = this.productStore.select(getProducts);
    this.cates$ = this.productStore.select(getCategory);
  }


  ngOnInit(): void {
    this.loadProduct();
    this.result$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        if (String(res.code) == "200") {
          this.resetForm();
          this.toastr.success(String(res.msg));
        }
      }
    })

    this.productStore.dispatch(getCategoryAction());
    this.cates$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.cates = res;
      }
    })

    this.items$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.items = res.products;
        this.total = res.totalCount;



        this.items = this.items.map(item => ({
          ...item,
          rateShow: String((item.rate * 100).toFixed(2)) + "%"
          , priceSaleShow: String(((1 - item.rate) * item.price).toFixed(2))  // Thực hiện phép tính và lưu vào đối tượng
        }));

      }
    })
  }

  changeFileName(file: File) {
    this.img = file;
    this.imgName = file.name;
  }

  ngOnDestroy(): void {
    this.productStore.dispatch(saveProductActionSuscess({ result: {} as ResultModel }))
  }

  onSubmit() {

    if (!ValidationUtil.isNotNullAndNotEmpty(this.product.name)) {
      this.toastr.warning("Product Name not empty")
      return;
    }
    if (!ValidationUtil.isNotNullAndNotEmpty(this.product.price)) {
      this.toastr.warning("Product price not empty")
      return;
    }
    if (!ValidationUtil.isNotNullAndNotEmpty(this.product.stock)) {
      this.toastr.warning("Product stock not empty")
      return;
    }

    let sliders: any[] = this.selectedFiles;

    let slidersName = [] as String []
    let params ;

    if (ValidationUtil.isNotNullAndNotEmpty(this.product.id)) {


      let img = '';
      if (ValidationUtil.isNotNullAndNotEmpty(this.imgName)) {
        img = this.imgName.replace(this.apiUrl + '/', '')
      } else {
        img = '';
      }
      params = {
        id: this.product.id,
        name: this.product.name,
        price: this.product.price,
        stock: this.product.stock,
        description: this.product.description,
        sale: this.product.sale,
        new: this.product.new,
        best: this.product.best,
        img: img,
        sliders: this.oldSliderName,
        rate: this.product.rate / 100,
        category: this.product.category,
        contentList : this.contentList


      }
    } else {
      params = {
        id: null,
        name: this.product.name,
        price: this.product.price,
        stock: this.product.stock,
        description: this.product.description,
        sale: this.product.sale,
        new: this.product.new,
        best: this.product.best,
        rate: this.product.rate / 100,
        category: this.product.category ,
        contentList : this.contentList
      }
    }

    this.productStore.dispatch(saveProductAction({
      params: params,
      img: this.img,
      sliders: sliders
    }))

  }

  resetForm() {
    this.product = {
      id: null,
      name: '',
      price: 0,
      stock: 0,
      description: '',
      sale: false,
      new: false,
      best: false,
      rate: 0,
      category: '',
      contentList : [],
    };

    // Reset the image and slider fields
    this.img = '';

  }

  openPopup(): void {
    this.isPopupOpen = true;
  }

  closePopup(): void {
    this.isPopupOpen = false;
  }

  handlePageEvent(page: PageEvent) {
    this.page = page.pageIndex;
    this.len = page.pageSize;
    this.loadProduct();
  }

  loadProduct(): void {
    this.productStore.dispatch(productAction({
      params: {
        page: this.page,
        len: this.len,
      }
    }))
  }

  clickRow(item: any) {
    this.isPopupOpen = false;
    this.product = {
      id: item.id,
      name: item.name,
      price: item.price,
      stock: item.stock,
      description: item.description,
      sale: item.sale,
      new: item.new,
      best: item.best,
      rate: item.rate * 100,
      category: item.category,
      contentList : item.contenlist,
    };

    const contentList = item.contentList as ContentItem[];


    contentList.forEach((item, index) => {
       this.newContent = {title : item.title , content : item.content};
       this.addContent();
    });

    if (ValidationUtil.isNotNullAndNotEmpty(item.img)) {
      this.imgName = item.img
    }
    this.oldSliderName = item.sliders;
  }

  handelContent(content: string) {
    this.product.description = content;
  }

  addContent() {
    if (this.newContent.title.trim() && this.newContent.content.trim()) {
      this.contentList.push({ ...this.newContent });
      this.newContent = { title: '', content: '' };
    }
  }

  removeContent(index: number) {
    this.contentList.splice(index, 1);
  }
  onFilesChange(files: ImageUploadResult) {
    if(ValidationUtil.isNullOrEmpty(files)){
      this.selectedFiles = [];
      this.oldSliderName = [];
    }else{
      this.selectedFiles = files.newFiles;
      this.oldSliderName = files.existingUrls;
    }

  }

}
