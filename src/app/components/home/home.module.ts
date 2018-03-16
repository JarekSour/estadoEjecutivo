import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { NavModule } from '../nav/nav.module';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        NavModule,
        MaterialModule,
        FormsModule
    ],
    declarations: [HomeComponent]
})
export class HomeModule { }
