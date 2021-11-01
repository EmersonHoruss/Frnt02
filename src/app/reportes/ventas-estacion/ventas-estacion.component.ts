import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ventas-estacion',
  templateUrl: './ventas-estacion.component.html',
  styleUrls: ['./ventas-estacion.component.css']
})
export class VentasEstacionComponent implements OnInit {


  public selectedEstacion: any;
  // public selectedAnio: any;
  public selectedSede: any;
  public nuevoVector: any[] = []
  mostrarTabla = false;

  estaciones = [
    { id: 1, name: 'Primavera' },
    { id: 2, name: 'Verano' },
    { id: 3, name: 'Otoño' },
    { id: 4, name: 'Invierno' },
  ];

  sedes = [
    { id: 1, name: 'Sede 1' },
    { id: 2, name: 'Sede 2' },
    { id: 3, name: 'Sede 3' },
    { id: 4, name: 'Sede 4' },
  ];

  // anios = [
  //   { id: 1, name: 2021 },
  //   { id: 2, name: 2020 },
  //   { id: 3, name: 2019 },
  //   { id: 4, name: 2018 },
  // ]

  elementos = [
    {
      producto: 'Producto 1',
      cantidad: 2,
      fecha: new Date("2021-07-16"),
      sede: 'Sede 1',
    },
    {
      producto: 'Producto 2',
      cantidad: 3,
      fecha: new Date("2021-03-16"),
      sede: 'Sede 2',
    },
    {
      producto: 'Producto 3',
      cantidad: 4,
      fecha: new Date("2021-07-16"),
      sede: 'Sede 3',
    },
    {
      producto: 'Producto 4',
      cantidad: 1,
      fecha: new Date("2021-10-16"),
      sede: 'Sede 1',
    },
    {
      producto: 'Producto 5',
      cantidad: 2,
      fecha: new Date("2021-12-16"),
      sede: 'Sede 2',
    },
    {
      producto: 'Producto 6',
      cantidad: 5,
      fecha: new Date("2021-03-16"),
      sede: 'Sede 3',
    },
    {
      producto: 'Producto 7',
      cantidad: 7,
      fecha: new Date("2021-04-10"),
      sede: 'Sede 1',
    },
    {
      producto: 'Producto 8',
      cantidad: 8,
      fecha: new Date("2021-01-15"),
      sede: 'Sede 2',
    },
    {
      producto: 'Producto 9',
      cantidad: 10,
      fecha: new Date("2021-12-01"),
      sede: 'Sede 3',
    },
    {
      producto: 'Producto 10',
      cantidad: 20,
      fecha: new Date("2021-03-22"),
      sede: 'Sede 2',
    },
  ]

  constructor() { }



  ngOnInit(): void {

  }

  changeEstaciones() {
    this.nuevoVector = []
    this.selectedSede = null
    this.mostrarTabla = false;
  }
  changeSedes() {

    this.nuevoVector = []
    this.mostrarTabla = false;
  }

  elegir(){

    this.nuevoVector = []

    console.log(this.selectedEstacion)

    //  this.selectedAnio = null;
    //Primavera  23 Set - 5 oct
    //Verano     5 oct - 5 junio
    //Otoño      5 junio - 5 julio
    //Invierno   5 julio - 23 Set

    let fechaInicioPrimavera = new Date("2021-09-23")
    let fechaFinPrimavera = new Date("2021-10-05")

    let fechaInicioVerano = new Date("2021-10-05")
    let fechaFinVerano = new Date("2022-06-05")

    let fechaInicioOtonio = new Date("2021-06-05")
    let fechaFinOtonio = new Date("2021-07-05")

    let fechaInicioInvierno = new Date("2021-07-05")
    let fechaFinInvierno = new Date("2021-09-23")

    let fechaFinEstacionElegida: any;
    let fechaInicioEstacionElegida: any;


    // console.log(fechaInicioInvierno.toString().split(" ")[1])
    // console.log(fechaInicioInvierno.toString().split(" ")[2])
    // console.log(fechaInicioInvierno.toString().split(" ")[3])


    //Mes - Dia - Anio

    switch (this.estaciones[this.selectedEstacion - 1].name) {
      case 'Primavera': fechaInicioEstacionElegida = fechaInicioPrimavera; fechaFinEstacionElegida = fechaFinPrimavera; break;
      case 'Verano': fechaInicioEstacionElegida = fechaInicioVerano; fechaFinEstacionElegida = fechaFinVerano; break;
      case 'Otoño': fechaInicioEstacionElegida = fechaInicioOtonio; fechaFinEstacionElegida = fechaFinOtonio; break;
      case 'Invierno': fechaInicioEstacionElegida = fechaInicioInvierno; fechaFinEstacionElegida = fechaFinInvierno; break;

    }

    this.elementos.forEach(elemento => {


      if (
        elemento.sede === this.sedes[this.selectedSede - 1].name

        && elemento.fecha > fechaInicioEstacionElegida
        && elemento.fecha < fechaFinEstacionElegida) {
        this.nuevoVector.push(elemento)
      } else {
        console.log('NO CUMNPLE')
      }
    })

    this.mostrarTabla = true;

  }

  convertirMesNumero(mes: any) {
    let returnMes = 0;
    switch (mes) {
      case 'Jan': returnMes = 1; break;
      case 'Feb': returnMes = 2; break;
      case 'Mar': returnMes = 3; break;
      case 'Apr': returnMes = 4; break;
      case 'May': returnMes = 5; break;
      case 'Jun': returnMes = 6; break;
      case 'Jul': returnMes = 7; break;
      case 'Aug': returnMes = 8; break;
      case 'Sep': returnMes = 9; break;
      case 'Oct': returnMes = 10; break;
      case 'Nov': returnMes = 11; break;
      case 'Dec': returnMes = 12; break;
    }

    return returnMes
  }


}
