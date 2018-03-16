import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    displayedColumns = ['Razon', 'Rut', 'Titular', 'Contacto'];
    dataSource = new MatTableDataSource();
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        public clienteService: ClienteService,
        public router: Router
    ) { }

    ngOnInit() {
        this.clienteService.getListCliente({ cuenta: localStorage.getItem('_e') }).then((response) => {
            if (response['data'] != false) {
                let newJson = [];
                for (let item of response['data']) {
                    newJson.push({ Razon: item['Nombre'], Titular: item['Titular'], Contacto: item['Correo'], Cliente: item['Cliente'], Rut: item['Rut'] })
                }
                this.dataSource.data = newJson;
            }
        })
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.paginator._intl.itemsPerPageLabel = 'Clientes por página';
        this.paginator._intl.nextPageLabel = 'siguiente';
        this.paginator._intl.previousPageLabel = 'anterior';
    }

    goClient(row) {
        this.router.navigate(['/cliente', row.Cliente]);
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }


}
