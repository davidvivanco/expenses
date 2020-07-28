import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-modal-header',
  templateUrl: './modal-header.component.html',
  styleUrls: ['./modal-header.component.scss'],
})
export class ModalHeaderComponent implements OnInit {

  @Output() onCloseModal: EventEmitter<boolean>;
  @Input() title: string

  constructor() {
    this.onCloseModal = new EventEmitter();
  }

  ngOnInit() { }

  closeModal() {
    this.onCloseModal.emit(true);
  }
}
