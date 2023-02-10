import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-policy-modal',
  templateUrl: './policy-modal.component.html',
  styleUrls: ['./policy-modal.component.scss']
})
export class PolicyModalComponent implements OnInit {

  constructor(
    private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(`Closed with: ${result}`);
    });
  }

}
