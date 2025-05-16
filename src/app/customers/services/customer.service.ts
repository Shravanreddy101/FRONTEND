import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../services/storage/user-storage.service';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  private createAuthorizationHeader(): HttpHeaders {
    const token = UserStorageService.getToken(); // Direct static call
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + token
    );
  }

  getAllProducts(): Observable<any>{
    return this.http.get(BASIC_URL + "api/customer/products", {
      headers: this.createAuthorizationHeader(),
    })
  }

  getAllProductsByName(name:any): Observable<any>{
    return this.http.get(BASIC_URL + `api/customer/search/${name}`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  addToCart(productId: any): Observable<any> {
    const userId = UserStorageService.getUserId();
    console.log("Sending to cart:", { productId, userId });
  
    const cartDTO = {
      productId: productId,
      userId: userId,
    };
  
    return this.http.post(BASIC_URL + "api/customer/cart", cartDTO, {
      headers: this.createAuthorizationHeader(),
    });
  }


  getCartByUserId(): Observable<any>{
    const userId = UserStorageService.getUserId();
    return this.http.get(BASIC_URL + `api/customer/cart/${userId}`, {headers : this.createAuthorizationHeader()})
  }
  
  
  applyCoupon(code: any): Observable<any> {
    const headers = this.createAuthorizationHeader();
    const id = UserStorageService.getUserId();
    return this.http.get(BASIC_URL + `api/customer/coupon/${id}/${code}`, { headers });
  }

  increaseProductQuantity(productId: any): Observable<any> {
    const body = {
      productId: productId,
      userId: UserStorageService.getUserId()
    }
    return this.http.post(BASIC_URL + "api/customer/addition", body, {headers: this.createAuthorizationHeader()});
  }

  decreaseProductQuantity(productId: any): Observable<any> {
    const body = {
      productId: productId,
      userId: UserStorageService.getUserId()
    }
    return this.http.post(BASIC_URL + "api/customer/subtraction", body, {headers: this.createAuthorizationHeader()});
  }


  placeOrder(orderDTO:any): Observable<any> {
    orderDTO.userId = UserStorageService.getUserId();
    return this.http.post(BASIC_URL + "api/customer/placeOrder", orderDTO, {headers: this.createAuthorizationHeader()});
  }


  getAllOrders(): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.get(BASIC_URL + `api/customer/orders/${userId}`, {headers: this.createAuthorizationHeader()});
  }


  getFAQ(productId: any): Observable<any> {
    return this.http.get(BASIC_URL + `api/customer/FAQ/${productId}`, {headers: this.createAuthorizationHeader()});
  }

  viewOrderedProducts(orderId: number): Observable<any> {
    return this.http.get(BASIC_URL + `api/customer/ordered-products/${orderId}`, {headers: this.createAuthorizationHeader()});
  }

}