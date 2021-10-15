import { Component, OnInit } from '@angular/core';
import { MsgService } from '../../../services/support/msg.service';
import { AnswerService } from '../../../services/support/answer.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-msg',
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.css'],
})
export class MsgComponent implements OnInit {
  _msg: any;
  _answ: any;

  constructor(
    private _msgS: MsgService,
    private _answS: AnswerService,
    private modalService: NgbModal,public activeModal: NgbActiveModal
  ) {
    this._msg = _msgS._getMsg();
  }

  ngOnInit(): void {}

  // ANSWERS
  _ok() {
    this._answS._setAnswer('ok');
  }

  _yes() {
    this._answS._setAnswer('yes');
  }

  _no() {
    this._answS._setAnswer('no');
  }
}
