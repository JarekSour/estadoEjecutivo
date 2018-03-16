import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-cliente',
    templateUrl: './cliente.component.html',
    styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

    tab: number = 1;
    idCliente: string;
    isLoading: boolean = false;
    dialogEvaluacion: boolean = false;
    jsonEmpresa = { nombre: '', constitucion: '', regimen: '', formalidad: true, actividad: '', giro: '', nivel: '', iva: '', pais: '', email: '', direccion: '', numero: '', oficina: '', comuna: '', ciudad: '', region: '', fono: '', celular: '', codigoactividad: [], paisimpuesto: '', notaria: '' }
    jsonRepresentante = { rut: '', nacimiento: '', nacionalidad: '', nombre: '', paterno: '', materno: '' };
    jsonDocumentDefault = [];
    jsonEvaluacion = [];
    v: any;
    producto: any;
    ofertaFinalizada: boolean = false;
    jsonOferta = { garantia: '', comision: '', cuota: 0, motivo: '', objetivo: '', rango: 0, valorcuota: 0, valorgarantia: 0 }
    today: any;
    vence: any;
    ultimo: any;

    constructor(
        public router: Router,
        public snackBar: MatSnackBar,
        private route: ActivatedRoute,
        public clienteService: ClienteService
    ) { }

    ngOnInit() {
        this.idCliente = this.route.snapshot.paramMap.get('id');
        this.clienteService.getDataCliente({ cuenta: localStorage.getItem('_e'), cliente: this.idCliente }).then((response) => {
            if (response['data'] != false) {
                this.jsonEmpresa.nombre = response['data']['Nombre'];
                this.jsonEmpresa.constitucion = response['data']['Constitucion'];
                this.jsonEmpresa.regimen = response['data']['Regimen'];
                this.jsonEmpresa.formalidad = response['data']['Formalidad'];
                this.jsonEmpresa.actividad = 'ASESORES Y CONSULTORES EN INFORMÁTICA (SOFTWARE)';
                this.jsonEmpresa.giro = response['data']['Giro'];
                this.jsonEmpresa.nivel = response['data']['NivelVenta'];
                this.jsonEmpresa.iva = response['data']['IvaVntsAutomaticos'];
                this.jsonEmpresa.pais = response['data']['Pais'];
                this.jsonEmpresa.email = response['data']['Email'];
                this.jsonEmpresa.direccion = response['data']['Direccion'];
                this.jsonEmpresa.numero = response['data']['Numero'];
                this.jsonEmpresa.oficina = response['data']['Oficina'];
                this.jsonEmpresa.comuna = response['data']['Comuna'];
                this.jsonEmpresa.ciudad = response['data']['Ciudad'];
                this.jsonEmpresa.region = response['data']['Region'];
                this.jsonEmpresa.fono = response['data']['Telefono'];
                this.jsonEmpresa.celular = response['data']['Celular'];
            }
        })
        this.clienteService.getRepresentate({ cuenta: localStorage.getItem('_e'), cliente: this.idCliente }).then((response) => {
            if (response['data'] != null) {
                this.jsonRepresentante.rut = response['data']['Rut']
                this.jsonRepresentante.nacimiento = response['data']['Nacimiento']
                this.jsonRepresentante.nacionalidad = response['data']['Nacionalidad']
                this.jsonRepresentante.nombre = response['data']['Nombre']
                this.jsonRepresentante.paterno = response['data']['Paterno']
                this.jsonRepresentante.materno = response['data']['Materno']
            }
        })

        this.clienteService.getListDocumentos({ cuenta: localStorage.getItem('_e'), cliente: this.idCliente }).then((response) => {
            if (response['data'] != null) {
                for (let item of response['data']) {
                    this.jsonDocumentDefault.push({ Archivo: item['Documento'], Filename: item['Filename'] })
                }
            }
        })

        this.clienteService.getGarantiaEvaluacion({ cuenta: localStorage.getItem('_e'), cliente: this.idCliente }).then((response) => {
            if (response['data'] != false) {
                this.jsonEvaluacion = response['data']
                this.v = response['data'][0];
            }
        })

        this.clienteService.getOferta({ cuenta: localStorage.getItem('_e'), cliente: this.idCliente }).then((response) => {
            if (response['data'] != false) {
                this.producto = response['data']['_id'];

                if (response['data']['Proceso'] == 'Oferta Aceptada por cliente') {
                    this.ofertaFinalizada = true;

                    //jsonOferta = { garantia: '', comision: '', cuota: '', motivo: '', objetivo: '', rango: '', valorcuota: '', valorgarantia: '' }

                    this.jsonOferta.garantia = response['data']['Garantia']
                    this.jsonOferta.comision = response['data']['Comision']

                    this.jsonOferta.motivo = response['data']['Solicitud']['Motivo']
                    let aux = [];
                    for (let x of Object.keys(response['data']['Solicitud']['Objetivo'])) {
                        if (response['data']['Solicitud']['Objetivo'][x] == true) {
                            aux.push(x)
                        }
                    }
                    this.jsonOferta.objetivo = aux.join(', ')
                    this.jsonOferta.rango = response['data']['Eleccion'][0]['Monto']
                    this.jsonOferta.cuota = response['data']['Eleccion'][0]['Cuotas']
                    this.jsonOferta.valorgarantia = response['data']['Eleccion'][0]['Garantia']
                    this.jsonOferta.valorcuota = response['data']['Eleccion'][0]['ValorCuota']

                    this.today = new Date().setMonth(new Date().getMonth() + 1);
                    this.vence = new Date().setMonth(new Date().getMonth() + 1);
                    this.ultimo = new Date().setMonth(new Date().getMonth() + this.jsonOferta.cuota);

                }
            }
        })
    }

    sendEvaluacion() {
        this.clienteService.sendEvaluacion({
            cuenta: localStorage.getItem('_e'), cliente: this.idCliente, producto: this.producto, Proceso: "Oferta generada", Estado: true, Cobertura: this.v.Cobertura,
            PlazoCuotas: this.v.PlazoCuotas, Nombre: this.v.Nombre, Comision: this.v.Comision, Score: this.v.Score, Condicion: this.v.Documentacion, Sucursal: "Alvarez de toledo 873"
        }).then((response) => {
            let snackBarRef = this.snackBar.open('La garantía fue asignada exitosamente', '', {
                duration: 3500
            });
            this.router.navigate(['/home']);
        })
    }

    downloadFile(item) {
        this.isLoading = true;
        this.clienteService.downloadDocument({ cuenta: localStorage.getItem('_e'), documento: item['Archivo'] }).then((response) => {
            if (response['data'] != false) {
                var hiddenElement = document.createElement('a');
                hiddenElement.href = response['data'][0]['Content'];
                hiddenElement.target = '_blank';
                hiddenElement.download = item['Filename'];
                hiddenElement.click();
            }
            this.isLoading = false;
        })
    }

    formatNumber(num) {
        num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
        num = num.split('').reverse().join('').replace(/^[\.]/, '');
        return num;
    }

    generatePdf() {
        this.clienteService.createPdf();
    }

    showEvaluacion(item) {
        this.v = item;
    }

    downloadTabla() {
        this.clienteService.getTable({ monto: this.jsonOferta.rango, cuotas: this.jsonOferta.cuota }).then((response) => {
            this.clienteService.createTable(response['items']);
        })
    }

}
