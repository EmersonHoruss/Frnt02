import { Component, OnInit } from '@angular/core';
import { SaleOrderService } from '../../../services/customer-support/sale-order/sale-order/sale-order.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MsgService } from '../../../services/support/msg.service';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-pay-sale-order',
  templateUrl: './pay-sale-order.component.html',
  styleUrls: ['./pay-sale-order.component.css'],
})
export class PaySaleOrderComponent implements OnInit {
  _sales = [];
  _salesColumn = ['_name', '_DNI', '_totalAmount', '_collect'];
  _salesTable = [];

  _search = '';
  _saleOrder: any;
  _msg: any;

  constructor(
    private _saleOrderS: SaleOrderService,
    private _modalS: NgbModal,
    private _msgS: MsgService
  ) {
    this._getSalesInit();
  }

  ngOnInit(): void {}

  _getSalesInit() {
    this._saleOrderS.nonPaid().subscribe((e: any) => {
      this._sales = e;
      this._salesTable = e;
    });
  }

  _matching(_string: string, _object: any) {
    const _stringLC = _string.toLowerCase();
    const _regExp = new RegExp(_stringLC);

    const _nameString = _object._client._name.toString().toLowerCase();
    const _DNIString = _object._client._DNI.toString().toLowerCase();
    const _totalString = _object._total.toString().toLowerCase();

    return _regExp.test(_nameString)
      ? true
      : _regExp.test(_DNIString)
      ? true
      : _regExp.test(_totalString)
      ? true
      : false;
  }

  _searchSales(_event: any) {
    const _string = _event.target.value;
    this._salesTable = this._sales.filter((e) => this._matching(_string, e));
  }

  _collect(e: any, _content: any, _contentSpiner: any, _contentTicket: any) {
    // console.log(_idDebtCollector);
    this._saleOrder = e;
    const _dataUser: any = localStorage.getItem('_dataUser');
    const _dataUserObject = JSON.parse(_dataUser);
    const _idDebtCollector = _dataUserObject._userHeadquarter._id;

    const _spinerReference = this._modalS.open(_contentSpiner, {
      ariaLabelledBy: 'modal-basic-title',
      centered: true,
      size: 'sm',
      keyboard: false,
      backdrop: 'static',
    });

    // ._userHeadquarter._id

    this._saleOrderS
      .collectWithOutTS({
        _id: this._saleOrder._id,
        _idDebtCollector,
        _dateCollect: new Date(),
      })
      .subscribe((_resultCollect: any) => {
        console.log(_resultCollect);
        this._saleOrderS.nonPaid().subscribe((e: any) => {
          _spinerReference.close();
          this._sales = e;
          this._salesTable = e;
          if (!_resultCollect._error) {
            this._modalS
              .open(_contentTicket, {
                ariaLabelledBy: 'modal-basic-title',
                centered: true,
                size: 'sm',
              })
              .shown.toPromise()
              .then((e: any) => {
                this._print();
                this._modalS.dismissAll();
                console.log('has open modals', this._modalS.hasOpenModals());
                this._modalS
                  .open(_contentTicket, {
                    ariaLabelledBy: 'modal-basic-title',
                    centered: true,
                    size: 'sm',
                  })
                  .result.then(
                    () => {
                      this._triggerModal(
                        _content,
                        {
                          _type: 'success',
                          _detail:
                            'Se ha cobrado correctamente. No se olvide de imprimir el ticket!',
                        },
                        false
                      );
                    },
                    () => {
                      this._triggerModal(
                        _content,
                        {
                          _type: 'success',
                          _detail:
                            'Se ha cobrado correctamente. No se olvide de imprimir el ticket!',
                        },
                        false
                      );
                    }
                  );
              });
          } else {
            this._triggerModal(_content, {
              _type: 'error',
              _detail:
                'Pedido ya ha sido cobrado, se actualizarán los pedidos.',
            });
          }
        });
      });

    console.log(e);
    // this._print();
  }

  _print() {
    let _ticket: any;
    _ticket = document.getElementById('_ticket');
    console.log(_ticket);
    const _widthTicket1 = _ticket.offsetWidth;
    const _heightTicket1 = _ticket.offsetHeight;

    console.log('width element', _widthTicket1, _heightTicket1);

    html2canvas(_ticket, {
      width: _widthTicket1,
      height: _heightTicket1,
      scale: 1,
    }).then((canvas: any) => {
      var imgData = canvas.toDataURL('image/png');
      var imgWidth = 190;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;
      var doc = new jsPDF('p', 'mm');
      var position = 10;

      doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.autoPrint();
      // doc.save();
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

  // PART: MODAL
  _openModal(_content: any, _lock: boolean) {
    _lock
      ? this._modalS.open(_content, {
          ariaLabelledBy: 'modal-basic-title',
          centered: true,
          size: 'sm',
          keyboard: false,
          backdrop: 'static',
        })
      : this._modalS.open(_content, {
          ariaLabelledBy: 'modal-basic-title',
          centered: true,
          size: 'sm',
        });
  }

  _triggerModal(_content: any, _specificMsg: any, _lock = true) {
    this._msgS._setMsg(_specificMsg);
    this._msg = this._msgS._getMsg();
    this._openModal(_content, _lock);
  }

  _returnFloatForm(_number: number) {
    const _regExp = /\./;
    const _string = _number.toString();
    return _regExp.test(_string) ? _string : _string + '.00';
  }
}
