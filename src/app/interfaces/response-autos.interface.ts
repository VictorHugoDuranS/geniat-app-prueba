import { Marca } from "./marcas.interface";
import { ModeloAuto } from "./modelo-auto.interfaces";

export interface ResponseAutos {
  resultados: ModeloAuto [],
  marcas: Marca []
}
