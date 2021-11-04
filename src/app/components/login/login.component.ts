import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth/auth.service';
import { MsgService } from '../../../services/support/msg.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  _user = {
    _nickname: '',
    _password: '',
  };

  _msg: any;
  _msgContent = { type: '', _detail: '' };

  constructor(
    private _authS: AuthService,
    private _msgS: MsgService,
    private _modalS: NgbModal,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  _login(_content: any, _contentSpiner: any) {
    this._authS._login(this._user).subscribe(
      (e: any) => {
        console.log('sub')
        this._router.navigate(['/home']);
      },
      (e) => {
        console.log('sub no')
        const _detail = e.error.message;
        const _type = 'error';

        this._triggerModal(_content, { _detail, _type });
      }
    );
    // console.log(this._user);
  }

  _openModal(_content: any) {
    this._modalS.open(_content, {
      ariaLabelledBy: 'modal-basic-title',
      centered: true,
      size: 'sm',
    });
  }

  _triggerModal(_content: any, _specificMsg: any) {
    this._msgS._setMsg(_specificMsg);
    this._msg = this._msgS._getMsg();
    this._openModal(_content);
  }
}
