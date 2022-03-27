
# Proceso para compilar una aplicacion en Android



<!-- <div align="center">
  <img src="https://drive.google.com/thumbnail?id=1MG5dqzFxEE6ZnChajpARbuuCJHzkY_0R">
</div>-->

##  Prerrequisitos

* Capacitor CLI
```sh
  npm install @capacitor/core
  npm install @capacitor/cli --save-dev
  ```
* Ionic  CLI
```sh
   npm install -g @ionic/cli
  ```
* Angular CLI
```sh
  npm install -g @angular/cli
  ```
##  Iniciar proyecto

* Instalar dependencias (Esto se realiza en la carpeta raiz)
```sh
  npm install
  ```

## 2. Compilación de la aplicación

* Compilación del proyecto
```sh
  ionic build
  ```

* Crear plataforma Android o IOS
```sh
  ionic cap add android
  ionic cap add ios
  ```

* Para actualizar las dependencias de los plugins de IONIC ejecutar los siguientes comandos (Solo se usa una vez):

```sh
  npm i -g jetifier
  ```
##### Nota: Ejecutar solo una vez por cada que se crea la plataforma

```sh
  npx jetify
  ```
* Actualizar carpeta IOS o Android con cada nuevo cambio

```sh
  npx cap sync [plataforma]
  ```
* Abrir carpeta en Android Studio

```sh
  ionic cap run android --open
  ```
