import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsgComponent } from './msg/msg.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [MsgComponent],
  imports: [CommonModule],
  providers: [NgbActiveModal],
  exports: [MsgComponent],
})
export class SharedModule {}
