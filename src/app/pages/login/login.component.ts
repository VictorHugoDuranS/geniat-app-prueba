import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';
import { ViewsService } from 'src/app/services/views.service';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { Response } from 'src/app/interfaces/response.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public usuarios: Usuario[] = [];
  public form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  constructor(
    private route: Router,
    private dataSrvc: DataService,
    private authSrvc: AuthService,
    private viewSrvc: ViewsService
  ) {

  }

  ngOnInit() {}

  isFormValid(): boolean {
    return this.form.valid;
  }

  async save() {
    this.authSrvc.login(this.form.value).then(
      (resultSet: Response) => {
        localStorage.setItem('token',resultSet.data.jwt);
        this.route.navigate(['home']);
        this.form.reset();
      }
    ).catch(
      async (err) => {
        const toast = await this.viewSrvc._createToastSimple(err);
        toast.present();
      }
    )
  }
  goToRegister() {
    this.route.navigate(['registro']);
  }
}
