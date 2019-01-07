import { Component } from '@angular/core';
import { AuthService } from '../usuarios/auth.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html'
})
export class MenuComponent{

    title: string = "App Angular - Spring"

    constructor(private authService: AuthService, private router: Router){}

    logout():void{
        let nombreUsuario = this.authService.usuario.nombre;
        this.authService.logout();
        swal('Logout', `Adios ${nombreUsuario}!`, 'success');
        this.router.navigate(['/']);
    }
}