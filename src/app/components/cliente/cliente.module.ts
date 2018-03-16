import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteComponent } from './cliente/cliente.component';
import { NavModule } from '../nav/nav.module';
import { MaterialModule } from '../../material.module';

@NgModule({
    imports: [
        CommonModule,
        ClienteRoutingModule,
        NavModule,
        MaterialModule,
    ],
    declarations: [ClienteComponent]
})
export class ClienteModule { }
