import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getUser() : Usuario{
    try {
      const usuario: Usuario = JSON.parse(localStorage.getItem('usuario'));
      return usuario;
    }catch(err) {
      throw 'No se pudo cargar su usuario';
    }
  }

  setUser(dataUser) {
    try {
      localStorage.setItem('usuario', JSON.stringify(dataUser));
    }catch(err) {
      throw 'No se pudo guardar el usuario';
    }
  }

  setData(key: string,data: any) {
    try {
      if(typeof data != 'string') {
        localStorage.setItem(key, JSON.stringify(data));
      }else {
        localStorage.setItem(key,data );
      }
    }catch(err) {
      throw 'No se pudo guardar';
    }
  }

  getData<M>(key: string) : M{
    try {
       const resultSet =  JSON.parse( localStorage.getItem(key)) as M;
       return resultSet;
    }catch(err) {
      throw 'No se pudo cargar';
    }
  }
  deleteData (key: string) {
    localStorage.removeItem(key);
  }
}
