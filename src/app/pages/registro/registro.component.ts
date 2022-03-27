import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonDatetime } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { ViewsService } from 'src/app/services/views.service';
import { format, parseISO } from 'date-fns';
import { Usuario } from 'src/app/interfaces/usuario.interface';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {

  @ViewChild('fecha', { static: true }) datetime: ElementRef<IonDatetime>;

  namePattern = '[a-zA-ZñÑáéíóúÁÉÍÓÚ\s ]+';//'[a-zA-Z ]*';
  patternEmail = /^([a-zA-Z0-9]+[._-]*)*[a-zA-Z0-9]+[@]{1}([a-zA-Z0-9]+[.-]*)+[.]{1}[a-zA-Z0-9]+$/;
  maxDate =  new Date().toISOString();
  public form: FormGroup = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.pattern(this.namePattern)]),
    lastname: new FormControl('', [Validators.required, Validators.pattern(this.namePattern)]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.patternEmail)]),
    birthdate: new FormControl(null, [Validators.required]),
    password: new FormControl('', [Validators.required]),
    password_confirmation: new FormControl('', [Validators.required]),
  });



  constructor(private authService: AuthService, private viewSrvc: ViewsService) { }

  ngOnInit() {}

  isFormValid(): boolean{
    return this.form.valid && this.form.controls['password'].value == this.form.controls['password_confirmation'].value;
  }

  async save() {
    try {
      const usuario: Usuario = this.form.value;
      delete usuario['password_confirmation'];
      usuario.birthdate = this.formatDate(usuario.birthdate);
      this.authService.register(usuario);
      this.form.reset();
    }catch(err) {
       const toast = await this.viewSrvc._createToastSimple(err);
        toast.present();
    }
  }
  confirm() {
    this.datetime.nativeElement.confirm();
  }

  reset() {
    this.datetime.nativeElement.reset();
  }

  formatDate(value: string) {
    return format(parseISO(value), 'yyyy-MM-dd');
  }
}
