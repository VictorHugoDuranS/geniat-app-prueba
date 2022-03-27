import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Response } from '../interfaces/response.interface';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseApi = environment.baseApi;

  constructor(private http: HttpClient) { }


  get(endPoint: string): Promise<any> {
    return new Promise(
      (resolve,reject) => {
        this.http.get(this.baseApi.concat(endPoint)).subscribe(
          (resultSet: Response) => {
            if(resultSet.response){
                resolve(resultSet.data);
            }else {
              reject(resultSet.message);
            }
          },err => {
            reject(err);
          }
        )
    })
  }

  post(endPoint: string, data: any){
    return new Promise(
      (resolve,reject) => {
        this.http.post(this.baseApi.concat(endPoint), data).subscribe(
          (resultSet: Response) => {
            if(resultSet.response){
                resolve(resultSet);
            }else {
              reject(resultSet.message);
            }
          },err => {
            reject(err);
          }
        )
    })
  }
}
