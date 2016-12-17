import { Component, OnInit, ViewChild } from '@angular/core';
import { DetailPopupComponent } from '../detail-popup/detail-popup.component';
import { NganhangService } from '../../../services/nganhang.service';

let Constants = require('../../../resources/constants');

@Component({
  selector: 'app-list-gd',
  templateUrl: './list-gd.component.html',
  styleUrls: ['./list-gd.component.css']
})
export class ListGdComponent implements OnInit {

  @ViewChild('detailPopup') detailPopup: DetailPopupComponent;
  private listGDNhan: Array<any> = [];
  private listGDGui: Array<any> = [];
  private listGDTheoPT: Array<any> = [];
  private listMonth: Array<number> = [];
  private selectedMonth: Array<number> = [];
  private selectedPT: any;
  private currentMonth: number;
  private datasetsGDTheoLoaiGD: Array<any> = [];
  private datasetsGDTheoLoaiGDMoiThang: Array<any> = [];
  private labelsGDTheoLoaiGD: Array<any> = [];
  private labelsGDTheoLoaiGDMoiThang: Array<any> = [];
  private options;

  constructor(private nghService: NganhangService) {
    this.init();
  }

  ngOnInit() {
  }

  init() {
    this.listGDNhan = [];
    this.listGDGui = [];
    this.listGDTheoPT = [];
    this.listMonth = [];
    this.selectedMonth = [];
    this.datasetsGDTheoLoaiGD = [];
    this.datasetsGDTheoLoaiGDMoiThang = [];
    this.labelsGDTheoLoaiGD = [];
    this.labelsGDTheoLoaiGDMoiThang = [];

    this.currentMonth = Constants.getCurrentDate().split('/')[1];
    for (let i = 0; i < 5; i++) {
      if(i < 4) {
        this.selectedMonth[i] = this.currentMonth;
      }
      this.listMonth.push(this.selectedMonth[0] - i);
    }
    this.thongkeGDGui(this.selectedMonth[0]);
    this.thongkeGDNhan(this.selectedMonth[1]);
    this.thongkeGDTheoPT(this.selectedMonth[2]);
    this.thongkeGDTheoLoaiGD();
    this.thongkeGDTheoLoaiGDMoiThang(this.selectedMonth[3]);
  }

  thongkeGDGui(e: any) {
    this.selectedMonth[0] = e;
    this.nghService.thongkeGDGui(this.selectedMonth[0], 5)
      .then(result => {
        this.listGDGui = result;
      })
      .catch(err => {
        console.error(err);
        this.listGDGui = [];
      });
  }

  thongkeGDNhan(e: any) {
      this.selectedMonth[1] = e;
      this.nghService.thongkeGDNhan(this.selectedMonth[1], 5)
        .then(result => {
          this.listGDNhan = result;
        })
        .catch(err => {
          console.error(err);
          this.listGDNhan = [];
        });
  }

  thongkeGDTheoPT(e: any) {
    this.selectedMonth[2] = e;
    this.nghService.thongkeGDTheoPT(this.selectedMonth[2], 5)
      .then(result => {
        this.listGDTheoPT = result;
      })
      .catch(err => {
        console.error(err);
        this.listGDTheoPT = [];
      });
  }

  thongkeGDTheoLoaiGD() {
    this.options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
      layout: {
        padding: 20
      }
    };
    this.labelsGDTheoLoaiGD = [];
    this.datasetsGDTheoLoaiGD = [{ label: 'Số giao dịch', data: [] }];
    this.nghService.thongkeGDTheoLoaiGD(this.currentMonth - 4, this.currentMonth)
      .then(result => {
        for (let prop in result) {
          this.labelsGDTheoLoaiGD.push(`tháng ${prop}`);
          this.datasetsGDTheoLoaiGD[0].data.push(result[prop]);
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  thongkeGDTheoLoaiGDMoiThang(e: any) {
    this.selectedMonth[3] = e;
    this.labelsGDTheoLoaiGDMoiThang = [];
    this.datasetsGDTheoLoaiGDMoiThang = [];
    this.nghService.thongkeGDTheoLoaiGDMoiThang(this.selectedMonth[3])
    .then(result => {
      for (let prop in result) {
        this.labelsGDTheoLoaiGDMoiThang.push(prop);
        this.datasetsGDTheoLoaiGDMoiThang.push(result[prop]);
      }
    })
    .catch(err => {
      console.error(err);
      this.labelsGDTheoLoaiGDMoiThang = [];
      this.datasetsGDTheoLoaiGDMoiThang = [];
    })
  }

  showDetailItem(item) {
    this.selectedPT = item;
    this.detailPopup.showPopup();
  }
}
