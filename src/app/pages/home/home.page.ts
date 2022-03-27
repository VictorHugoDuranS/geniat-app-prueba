import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Marca } from 'src/app/interfaces/marcas.interface';
import { ModeloAuto } from 'src/app/interfaces/modelo-auto.interfaces';
import { AutosService } from 'src/app/services/autos.service';
import { ViewsService } from 'src/app/services/views.service';
import { data } from './mocks';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public autosMoc = data;
  public numbersPages = [
    1,2,3,4,5
  ];
  public marca: FormControl = new FormControl();
  public page: FormControl = new FormControl();

  public autos: BehaviorSubject<ModeloAuto []> = new BehaviorSubject<ModeloAuto []>([]);
  public marcas: BehaviorSubject<Marca []> = new BehaviorSubject<Marca []>([]);

  constructor(private autoSrvc: AutosService, private viewSrvc: ViewsService, private route: Router) {
    this.marca.valueChanges.subscribe(
      value =>{
        if(value) {
          this.autoSrvc.getAutos({idMarca: value}).then(
            (result) => {
              this.autos.next(result.resultados);
              this.marcas.next(result.marcas);
            }
          ).catch(
            async (err)=> {
              const toast =  await this.viewSrvc._createToastSimple(err);
              this.autos.next(this.autosMoc.resultados);
              this.marcas.next(this.autosMoc.marcas);
              const marcas = this.marcas.getValue();
              if(marcas.length> 0) {
                const marca =marcas.find(m => m.idMarca == value);
                const autos = this.autos.getValue();
                this.autos.next(autos.filter( a => a.nombreMarca == marca.nombre ))
              }
              toast.present();
            }
          )
        }else {
          this.cargarData();
        }
      }
    )
    this.page.valueChanges.subscribe(
      value =>{
        if(value) {
          this.autoSrvc.getAutos({page: value}).then(
            (result) => {
              this.autos.next(result.resultados);
              this.marcas.next(result.marcas);
            }
            ).catch(
              async (err)=> {
              const toast =  await this.viewSrvc._createToastSimple(err);
              this.autos.next(this.autosMoc.resultados);
              this.marcas.next(this.autosMoc.marcas);
              toast.present();
            }
          )
        }
      }
    )
  }
  ngOnInit(): void {
    this.cargarData();
  }

  cargarData(event = null) {
    this.autoSrvc.getAutos().then(
      (result) => {
        this.autos.next(result.resultados);
        this.marcas.next(result.marcas);
        if(event) {
          event.target.complete();
        }
      }
    ).catch(
      async (err)=> {
        const toast =  await this.viewSrvc._createToastSimple(err);
        this.autos.next(this.autosMoc.resultados);
        this.marcas.next(this.autosMoc.marcas);
        toast.present();
        if(event) {
          event.target.complete();
        }
      }
    )
  }
  segmentChanged($event) {
    if($event.detail) {
      this.page.patchValue($event.detail.value)
    }
  }
  addPage() {
    const lastPage = this.numbersPages[this.numbersPages.length - 1];
    this.numbersPages.push(lastPage + 1);
  }
  salir() {
    this.route.navigate(['login'])
  }
}
