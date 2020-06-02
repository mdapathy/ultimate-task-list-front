import { Component, Output, EventEmitter, Input, Injectable } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../_services/data/data.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})

export class ModalComponent {
  @Output()
  passEntry: EventEmitter<any> = new EventEmitter();
  name: string;
  nameMessage: string;

  @Input()
  text: string;

  @Input()
  style: string;

  constructor(
    public activeModal: NgbActiveModal,
    private dataService: DataService) {

  }

  trueResult() {
    this.nameMessage = '';
    this.addProject();
  }

  addProject() {
    if (this.name === null || this.name === undefined || this.name.trim() === '') {
      this.nameMessage = 'Project name cannot be empty';
    } else {
      this.passEntry.emit(true);
      this.dataService.changeMessage(this.name);
      this.activeModal.close('Close click');

    }
  }
}
