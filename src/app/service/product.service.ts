import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs/internal/Observable";
import { Injectable } from "@angular/core";
import { ValidationUtil } from "../common/util/validation.util";
import { ResultModel } from "../model/result.model";
import { AuthDetail } from "../common/util/auth-detail";
import { ProductResponseModel, ProductRewiewResponseModel } from "../model/product-response.model";
import { CategoryModel } from "../model/cate.model";
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  res: string = '';
  constructor(private _http: HttpClient) { }

  allProduct(params: any): Observable<ProductResponseModel> {
    let url = `${environment.apiUrl}/api/products`;
    let queryParams = new HttpParams();

    if (ValidationUtil.isNotNullAndNotEmpty(params.id)) {
      url = `${environment.apiUrl}/api/products/${params.id}`;
    } else {
      Object.keys(params).forEach(key => {
        if (ValidationUtil.isNotNullAndNotEmpty(params[key])) {
          queryParams = queryParams.set(key, params[key]);
        }
      });
    }
    return this._http.get<ProductResponseModel>(`${url}`, { params: queryParams });
  }


  getProductRewiew(params: any): Observable<ProductRewiewResponseModel> {
    let url = `${environment.apiUrl}/api/products/getRewiews`;
    const headers: HttpHeaders = AuthDetail.getHeaderJwt();
    const page = params.page;
    const len = params.len;
    const productid = params.productid;
    const queryParams = `?page=${page}&len=${len}&productid=${productid}`;
    return this._http.get<ProductRewiewResponseModel>(`${url}${queryParams}`, {
      headers: headers
    });
  }

  saveProductRewiew(params: any, file: any): Observable<ResultModel> {
    let url = `${environment.apiUrl}/api/products/saveRewiew`;

    const formData = new FormData();
    if (file) {
      formData.append('fileData', file);
    }
    formData.append('productRewiew', new Blob([JSON.stringify(params)], { type: 'application/json' }));
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${AuthDetail.getLoginedInfo()?.jwt}`
    });
    return this._http.post<ResultModel>(url, formData, {
      headers: headers,
    });
  }

  saveProduct(params: any, img: any, sliders: any[]): Observable<ResultModel> {
    let url = `${environment.apiUrl}/api/products/saveProduct`;
    const formData = new FormData();
    if (img) {
      formData.append('img', img);
    }
    if (sliders && sliders.length > 0) {
      sliders.forEach((slider, index) => {
        formData.append('sliders', slider);
      });
    }
    formData.append('productRequest', new Blob([JSON.stringify(params)], { type: 'application/json' }));
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${AuthDetail.getLoginedInfo()?.jwt}`
    });
    return this._http.post<ResultModel>(url, formData, {
      headers: headers,
    });
  }


  saveCategory(params: any, file: any): Observable<ResultModel> {
    let url = `${environment.apiUrl}/api/products/categories`;
    const formData = new FormData();
    if (file) {
      formData.append('img', file);
    }
    formData.append('category', new Blob([JSON.stringify(params)], { type: 'application/json' }));
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${AuthDetail.getLoginedInfo()?.jwt}`
    });
    return this._http.post<ResultModel>(url, formData, {
      headers: headers,
    });
  }

  getCategory(): Observable<CategoryModel[]> {
    let url = `${environment.apiUrl}/api/products/categories/all`;
    return this._http.get<CategoryModel[]>(url);
  }
}




