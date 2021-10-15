import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-detail-so',
  templateUrl: './update-detail-so.component.html',
  styleUrls: ['./update-detail-so.component.css'],
})
export class UpdateDetailSOComponent implements OnInit {
  constructor(private modal: NgbModal) {}

  ngOnInit(): void {}

  openModal(updateDSO: any) {
    this.modal.open(updateDSO, { centered: true, size: 'lg' });
  }
}
