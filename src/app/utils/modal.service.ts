import {Injectable} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';

@Injectable({
    providedIn: 'root'
})
export class ModalService {

    constructor(private modalService: NgbModal) {
    }

    openModal(text, style): any {
        const modalRef = this.modalService.open(ModalComponent);
        modalRef.componentInstance.text = text;
        modalRef.componentInstance.style = style;

        return modalRef.componentInstance.passEntry;
    }
}
