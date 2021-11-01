import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ventas-diarias',
  templateUrl: './ventas-diarias.component.html',
  styleUrls: ['./ventas-diarias.component.css']
})
export class VentasDiariasComponent implements OnInit {

  reporteSedes:any[] = [
    {
      sede: 'Sede 1',
      cantidad: 3,
    },
    {
      sede: 'Sede 2',
      cantidad: 6,
    },
    {
      sede: 'Sede 3',
      cantidad: 7,
    },
    {
      sede: 'Sede 4',
      cantidad: 4,
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
