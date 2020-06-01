import { Component, Output, EventEmitter, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent{
  @Output()
  passEntry: EventEmitter<any> = new EventEmitter();
  name: string;

  @Input()
  text: string;

  @Input()
  style: string;

  constructor(public activeModal: NgbActiveModal) {
  }

  trueResult() {
      this.passEntry.emit(true);
      this.activeModal.close('Close click');
  }
}
