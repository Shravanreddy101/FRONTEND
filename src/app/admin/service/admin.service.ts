import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../services/storage/user-storage.service';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
  

  private createAuthorizationHeader(): HttpHeaders {
    const token = UserStorageService.getToken();
    console.log("Authorization Header:", 'Bearer ' + token);
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + token
    );
  }

  getProductById(productId: any): Observable<any> {
    return this.http.get(BASIC_URL + `api/admin/product/${productId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  addCategory(categoryDTO:any): Observable<any>{
    return this.http.post(BASIC_URL + "api/admin/category", categoryDTO, {
      headers: this.createAuthorizationHeader(),

    })
  }

  getAllCategories(): Observable<any>{
    return this.http.get(BASIC_URL + "api/admin/get", {
      headers: this.createAuthorizationHeader(),

    })
  }


  addProduct(productDTO:any): Observable<any>{
    return this.http.post(BASIC_URL + "api/admin/product", productDTO, {
      headers: this.createAuthorizationHeader(),

    })
  }


  getAllProducts(): Observable<any>{
    return this.http.get(BASIC_URL + "api/admin/products", {
      headers: this.createAuthorizationHeader(),
    })
  }

  getAllProductsByName(name:any): Observable<any>{
    return this.http.get(BASIC_URL + `api/admin/search/${name}`, {
      headers: this.createAuthorizationHeader(),
    })
  }


  deleteProduct(productId:any): Observable<any>{
    return this.http.delete(BASIC_URL + `api/admin/product/${productId}`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  updateProduct(productId:any, formData: FormData): Observable<any>{
    return this.http.patch(BASIC_URL + `api/admin/updateProduct/${productId}`, formData, {
      headers: this.createAuthorizationHeader(),
    })
  }

  addCoupon(couponDTO:any): Observable<any>{
    return this.http.post(BASIC_URL + "api/admin/coupons", couponDTO, {headers: this.createAuthorizationHeader()})
  }

  getAllCoupons(): Observable<any>{
    return this.http.get(BASIC_URL + "api/admin/coupons", {headers: this.createAuthorizationHeader()})
  }

  getAllOrders(): Observable<any> {
    return this.http.get(BASIC_URL + "api/admin/placedOrders", {headers: this.createAuthorizationHeader()});
  }


  getOrdersByUsername(name: string): Observable<any> {
    return this.http.get(BASIC_URL + `api/admin/orders/${name}`, {headers: this.createAuthorizationHeader()});
  }

  getOrdersByStatus(status: string): Observable<any> {
    return this.http.get(BASIC_URL + `api/admin/orders/status/${status}`, {headers: this.createAuthorizationHeader()});
  }


  getFilteredOrders(name?: string, status?: string): Observable<any> {
    let params = new HttpParams();
  
    if (name && name.trim() !== '') {
      params = params.set('name', name.trim());
    }
  
    if (status && status.trim() !== '') {
      params = params.set('status', status.trim());
    }
  
    return this.http.get(BASIC_URL + "api/admin/orders/filter", {
      headers: this.createAuthorizationHeader(),
      params: params
    });
  }


  changeOrderStatus(orderId: number, status: string): Observable<any> {
    return this.http.patch(BASIC_URL + `api/admin/orders/${orderId}/${status}`, {}, {headers: this.createAuthorizationHeader()});
  }


  postFAQ(productId:any, faqDTO:any): Observable<any> {
    return this.http.post(BASIC_URL + `api/admin/postFAQ/${productId}`, faqDTO, {headers: this.createAuthorizationHeader()});
  }

}


