import { Component, OnInit, Input } from '@angular/core';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
})
export class TicketComponent implements OnInit {
  _fullTime = new Date();
  _dateTime: any;
  _hourTime: any;

  // @Input() childMessage: string;
  constructor() {
    // this._dateTime =
    //   this._fullTime.getDay() +
    //   ' de ' +
    //   this.MESES[this._fullTime.getMonth()] +
    //   ' del ' +
    //   this._fullTime.getFullYear();
    // this._hourTime = this._fullTime;

    this.setHourAndDate();
  }

  setHourAndDate() {
    this._dateTime =
      this._fullTime.getDay() +
      '/' +
      this._fullTime.getMonth() +
      '/' +
      this._fullTime.getFullYear();

    this._hourTime =
      this._fullTime.getHours() +
      ':' +
      this._fullTime.getMinutes() +
      ':' +
      this._fullTime.getSeconds();
  }

  ngOnInit(): void {}

  imprimir() {
    let _ticket: any;
    _ticket = document.getElementById('_ticket');
    const _widthTicket1 = _ticket.offsetWidth;
    const _heightTicket1 = _ticket.offsetHeight;

    console.log('width element', _widthTicket1, _heightTicket1);

    html2canvas(_ticket, {
      width: _widthTicket1,
      height: _heightTicket1,
      scale: 1,
    }).then((canvas: any) => {
      var imgData = canvas.toDataURL('image/png');
      var imgWidth = 220;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;
      var doc = new jsPDF('p', 'mm');
      var position = 10;

      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.autoPrint();

      doc.output('dataurlnewwindow', { filename: 'comprobante.pdf' });
    });

    // var doc = new jsPDF({
    //   orientation: 'p',
    //   unit: 'mm',
    //   format: [70, 300],
    // });
    // doc.setFontSize(10);

    // doc.text('Recibo de venta de orquídeas', 10, 30);
    // doc.text('Comprobante No.: 7854214587', 10, 35);
    // doc.text('PDV: Pedro Pérez', 10, 40);
    // doc.text('Operador: 123654', 10, 45);
    // doc.text('Especie vendida: Sophronitis coccinea', 10, 55);
    // doc.text('Valor: 35.00', 10, 60);
    // doc.text('TBX: 242985290', 10, 65);
    // doc.text('Fecha/Hora: 2019-11-05 12:28:21', 10, 70);

    // doc.save();
  
  }
}
