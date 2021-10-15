import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ClientService } from 'src/services/customer-support/sale-order/client/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupportService } from 'src/services/support/support.service';
@Component({
  selector: 'app-register-modify-client',
  templateUrl: './register-modify-client.component.html',
  styleUrls: ['./register-modify-client.component.css'],
})
export class RegisterModifyClientComponent implements OnInit {
  @Input() mode: string = '';
  @Input() index: number = 5;

  _msje: number = -1;

  constructor(
    private modal: NgbModal,
    private router: Router,
    public _clientService: ClientService,
    public _supportService: SupportService
  ) {}

  validateName(_name: any) {
    return _name.invalid && _name.touched;
  }

  ngOnInit(): void {}

  openModal(contenido: any) {
    this.modal.open(contenido, { centered: true, size: 'lg' });
  }
  submited() {}
  noValidSurname() {}
  saveClient(
    _nameForm: any,
    _DNIForm: any,
    _RUCForm: any,
    _celForm: any,
    _addressForm: any
  ) {
    const _name = _nameForm.value;
    const _DNI = _DNIForm.value;
    const _RUC = _RUCForm.value;
    const _cel = _celForm.value;
    const _address = _addressForm.value;

    const _client = { _name, _DNI, _RUC, _cel, _address };
    console.log(_nameForm.valid, _nameForm.touched);
    if (_nameForm.valid) {
      this._msje = 1;
      this._clientService.create(_client).subscribe((_savedClient: any) => {
        console.log(_savedClient);
        console.log(typeof _savedClient._DNI);
        console.log(_savedClient._DNI.length);
        // openSuccessMsjeModal();
        // this.modal.dismissAll();
      });
    } else {
      this._msje = 0;
    }
  }

  openSuccessMsjeModal() {
    this;
  }

  openRegisterModal(contenido: any) {
    this.openModal(contenido);
  }

  openUpdateModal(contenido: any) {
    this.openModal(contenido);
  }

  salesRedirect() {
    this.router.navigate(['/sales']);
  }
}
