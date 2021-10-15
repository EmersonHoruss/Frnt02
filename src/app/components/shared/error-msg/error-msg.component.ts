import { Component, OnInit } from '@angular/core';
import { MsgService } from '../../../../services/support/msg.service';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.css'],
})
export class ErrorMsgComponent implements OnInit {

  constructor(public _msgS: MsgService) {}

  ngOnInit(): void {}

  hola(){
    console.log(12  )
  }
}
