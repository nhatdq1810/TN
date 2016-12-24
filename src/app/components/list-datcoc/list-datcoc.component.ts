import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective, ModalOptions } from 'ng2-bootstrap/ng2-bootstrap';
import { GiaodichService } from '../../services/giaodich.service';

let Constants = require('../../resources/constants');

@Component({
  selector: 'app-list-datcoc',
  templateUrl: './list-datcoc.component.html',
  styleUrls: ['./list-datcoc.component.css']
})
export class ListDatcocComponent implements OnInit {

  @ViewChild('listGDModal') listGDModal: ModalDirective;
  @Input() listGD: Array<any>;
  @Input() phongtroID: number;
  private seachTerm: string;
  private listGDView: Array<any>;
  private selectedMonth: number
  private listMonth: Array<number> = [];;

  constructor(private gdService: GiaodichService) { }

  ngOnInit() {
    this.listGDView = this.listGD;
    let currentMonth = Constants.getCurrentDate().split('/')[1];
    this.selectedMonth = currentMonth;
    for (let i = 0; i < 5; i++) {
      this.listMonth.push(this.selectedMonth - i);
    }
  }

  closeModal() {
    this.listGDModal.hide();
  }

  showModal() {
    this.listGDModal.show();
  }

  search(term, type) {
    this.listGDView = [];
    if(type === 'term') {
        if(term && term != '') {
        for (let i = 0; i < this.listGD.length; i++) {
          for (let prop in this.listGD[i]) {
            if(prop !== 'ngayGD') {
              if(this.listGD[i][prop].toString().indexOf(term) > -1) {
                this.listGDView.push(this.listGD[i]);
                break;
              }
            }
          }
        }
      } else {
        this.listGDView = this.listGD;
      }
    } else {
      this.gdService.layGDTheoPhongtro(this.phongtroID, term)
        .then(result => {
          this.listGDView = result;
        })
        .catch(err => {
          this.listGDView = [];
          console.error(err);
        });
    }
  }

}
