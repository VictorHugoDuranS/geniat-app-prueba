import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { data } from './mocks';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public marca: FormControl = new FormControl();
  constructor() {}

}
