import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    json = { usuario: '', passw: '' }
    error: string;

    constructor(
        public router: Router,
        public authService: AuthService
    ) { }

    ngOnInit() {

    }

    doLogin() {
        this.authService.login(this.json).then((response) => {
            if (response['data'] != false) {
                localStorage.setItem('_e', response['data'])
                localStorage.setItem('_user', this.json.usuario.charAt(0).toUpperCase() + this.json.usuario.slice(1))
                this.router.navigate(['/home']);
            } else {
                this.error = 'Usuario o contraseña incorrecta';
            }
        })
    }



}
