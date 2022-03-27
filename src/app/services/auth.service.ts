import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../interfaces/usuario.interface';
import { ApiService } from './api.service';
import { DataService } from './data.service';
import { Response } from '../interfaces/response.interface';
import { ViewsService } from './views.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private endPointLoggin = '/login';
  private endPointRegistro = '/registro ';



  public usuarios : Usuario [] = [];

  constructor(private dataSrvc: DataService, private route: Router,private apiSrvc: ApiService,private viewService: ViewsService) { }


  login(data: any) {
    return this.apiSrvc.post(this.endPointLoggin,data);
  }

  register(usuario: any) {
    this.apiSrvc.post(this.endPointRegistro, usuario).then(
      async(resultSet) => {
        const toast = await this.viewService._showAlertSimple('Atención','Se ha registrado un nuevo usuario, regrese al inicio de sesión para poder ingresar a la aplicación');
        toast.present();
      }
    ).catch(
      async   (err) => {
        const toast = await this.viewService._createToastSimple(err);
        toast.present();
    })
  }


}


