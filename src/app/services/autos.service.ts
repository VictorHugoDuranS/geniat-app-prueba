import { Injectable } from '@angular/core';
import { ResponseAutos } from '../interfaces/response-autos.interface';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AutosService {

  private endPoint = '/lista';

  constructor(private apiSrvc: ApiService) { }

  getAutos(parmas?: any){
    return this.apiSrvc.get<ResponseAutos>(this.endPoint, parmas);
  }
}
