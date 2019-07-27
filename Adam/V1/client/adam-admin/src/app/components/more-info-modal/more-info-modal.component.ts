import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-more-info-modal',
  templateUrl: './more-info-modal.component.html',
  styleUrls: ['./more-info-modal.component.css']
})
export class MoreInfoModalComponent {
  @Input() moreData;

  constructor(public activeModal: NgbActiveModal) { }

}
