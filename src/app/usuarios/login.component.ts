import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  titulo: string = 'Sing In!';
  usuario: Usuario;

  constructor(private authService: AuthService,
              private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
  }

  login(): void {
    console.log(this.usuario);
    if (this.usuario.username == null || this.usuario.password == null) {
      swal('Error login', 'Nombre de usuario o contraseña vacias', 'error');
      return;
    }

    this.authService.login(this.usuario).subscribe(response =>{
      console.log(response);

      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);

      let usuario = this.authService.usuario;

      this.router.navigate(['/']);
      swal('Login', `Bienvenido ${usuario.username} de nuevo!`, 'success');
    });

  }

}
