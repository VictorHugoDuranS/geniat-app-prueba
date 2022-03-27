import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { HomePage } from "./home/home.page";
import { LoginComponent } from "./login/login.component";
import { PagesRoutingModule } from "./pages-routing.module";
import { RegistroComponent } from "./registro/registro.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagesRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    HomePage,
    LoginComponent,
    RegistroComponent
  ],
  providers: []
})
export class PagesModule {

}
