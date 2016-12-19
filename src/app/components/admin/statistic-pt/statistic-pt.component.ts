import { Component, OnInit, ViewChild } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { DetailPopupComponent } from '../detail-popup/detail-popup.component';
import { UserService } from '../../../services/user.service';
import { PhongtroService } from '../../../services/phongtro.service';

let Constants = require('../../../resources/constants');

@Component({
  selector: 'app-statistic-pt',
  templateUrl: './statistic-pt.component.html',
  styleUrls: ['./statistic-pt.component.css']
})
export class StatisticPtComponent implements OnInit {

  @ViewChild('detailPopup') detailPopup: DetailPopupComponent;
  private datasetsDiachi: Array<any> = [];
  private datasetsTvDT: Array<any> = [];
  private datasetsKhac: Array<any> = [];
  private datasetsDvA: Array<any> = [];
  private labelsDiachi: Array<any> = [];
  private labelsTvDT: Array<any> = [];
  private labelsKhac: Array<any> = [];
  private labelsDvA: Array<any> = [];
  private nameRadioDiachi: Array<string> = [];
  private nameRadioTvDT: Array<string> = [];
  private nameRadioKhac: Array<string> = [];
  private nameRadioDvA: Array<string> = [];
  private nameRadioLvCmt: Array<string> = [];
  private loaiDiachi: any;
  private loaiTvDT: any;
  private loaiKhac: any;
  private loaiDvA: any;
  private loaiLvCmt: any;
  private tmpDC: string;
  private tmpTvDT: string;
  private tmpInput: string;
  private tmpDvA: string;
  private options;
  private chartColors;
  private listMonth: Array<number> = [];
  private selectedMonth: Array<number> = [];
  private currentMonth: number;
  private listPTLvCmtView: Array<any> = [];
  private selectedPT: any;

  constructor(private userService: UserService, private ptService: PhongtroService) {
    this.init();
  }

  ngOnInit() {
  }

  init() {
    this.datasetsDiachi = [];
    this.datasetsTvDT = [];
    this.datasetsKhac = [];
    this.datasetsDvA = [];
    this.labelsDiachi = [];
    this.labelsTvDT = [];
    this.labelsKhac = [];
    this.labelsDvA = [];
    this.listMonth = [];
    this.selectedMonth = [];
    this.listPTLvCmtView = [];

    this.loaiLvCmt = 0;
    this.loaiDiachi = 0;
    this.loaiTvDT = 0;
    this.loaiKhac = 0;
    this.loaiDvA = 0;
    this.nameRadioDiachi = ['Đường', 'Phường', 'Quận', 'Thành phố'];
    this.nameRadioTvDT = ['Giá thuê nguyên phòng', 'Giá thuê từng người', 'Tiền cọc nguyên phòng', 'Tiền cọc từng người', 'Diện tích'];
    this.nameRadioKhac = ['Loại phòng', 'Giới tính', 'Chung trường', 'Chung ngành', 'Chung niên khóa', 'Wifi', 'Ở với chủ'];
    this.nameRadioDvA = ['Duyệt', 'Ẩn'];
    this.nameRadioLvCmt = ['Lượt thích', 'Lượt bình luận'];
    this.tmpDC = 'đường,phường,quận,tp';
    this.tmpTvDT = 'giatien,giatienTheoNguoi,tiencoc,tiencocTheoNguoi,dientich';
    this.tmpInput = 'loaiPhong,gioitinh,truong,nganh,khoa,wifi,chu';
    this.tmpDvA = 'duyet,an';
    this.currentMonth = Constants.getCurrentDate().split('/')[1];
    for (let i = 0; i < 5; i++) {
      this.selectedMonth[i] = this.currentMonth;
    }
    for (let i = 0; i < 5; i++) {
      this.listMonth.push(this.selectedMonth[0] - i);
    }
    this.getPTLike();
    this.initChart();
  }

  getPTCmt() {
    this.ptService.thongkePTTheoComment(this.selectedMonth[4], 5)
      .then(result => {
        this.listPTLvCmtView = result;
      })
      .catch(err => {
        console.error(err);
        this.listPTLvCmtView = [];
      });
  }

  getPTLike() {
    this.ptService.thongkePTTheoLike(this.selectedMonth[4], 5)
      .then(result => {
        this.listPTLvCmtView = result;
      })
      .catch(err => {
        console.error(err);
        this.listPTLvCmtView = [];
      });
  }

  getDiachi() {
    this.labelsDiachi = [];
    this.datasetsDiachi = [];
    this.ptService.thongkePTTheoDiachi(this.tmpDC.split(',')[this.loaiDiachi], this.selectedMonth[0], 5)
      .then(result => {
        for (let prop in result) {
          this.labelsDiachi.push(prop);
          this.datasetsDiachi.push(result[prop]);
        }
      })
      .catch(err => {
        console.log('error at i: ' + this.loaiDiachi);
        console.error(err);
      });
  }

  getTvDT() {
    this.labelsTvDT = [];
    this.datasetsTvDT = [
      {
        label: 'Số phòng trọ',
        data: []
      }
    ];
    this.ptService.thongkePTTheoTienVaDientich(this.tmpTvDT.split(',')[this.loaiTvDT], this.selectedMonth[1], 5)
      .then(result => {
        let tmpData = [];
        for (let prop in result) {
          let label = new DecimalPipe('en').transform(prop);
          this.labelsTvDT.push(label);
          tmpData.push(result[prop]);
        }
        this.datasetsTvDT[0].data = tmpData;
      })
      .catch(err => {
        console.log('err at i: ' + this.loaiTvDT);
        console.error(err);
      });
  }

  getKhac() {
    this.labelsKhac = [];
    this.datasetsKhac = [
      {
        label: 'Số phòng trọ',
        data: []
      }
    ];
    this.ptService.thongkePTTheoInput(this.tmpInput.split(',')[this.loaiKhac], this.selectedMonth[2], 5)
      .then(result => {
        let tmpData = [];
        for (let prop in result) {
          if (this.loaiKhac === 0) {
            if (prop === '0') {
              this.labelsKhac.push('Cả hai');
            }
            if (prop === '1') {
              this.labelsKhac.push('Thuê từng người');
            }
            if (prop === '2') {
              this.labelsKhac.push('Thuê nguyên phòng');
            }
          } else if (this.loaiKhac === 1) {
            if (prop === '') {
              this.labelsKhac.push('Bất kỳ');
            } else {
              this.labelsKhac.push(prop);
            }
          } else if (this.loaiKhac === 5 || this.loaiKhac === 6) {
            if (prop === '1') {
              this.labelsKhac.push('Có');
            } else {
              this.labelsKhac.push('Không');
            }
          } else {
            this.labelsKhac.push(prop);
          }
          tmpData.push(result[prop]);
        }
        this.datasetsKhac[0].data = tmpData;
      })
      .catch(err => {
        console.log('err at i: ' + this.loaiKhac);
        console.error(err);
      });
  }

  getDvA() {
    this.labelsDvA = [];
    this.datasetsDvA = [];
    this.ptService.thongkePTTheoInput(this.tmpDvA.split(',')[this.loaiDvA], this.selectedMonth[3], 5)
      .then(result => {
        for (let prop in result) {
          if (this.loaiDvA === 0) {
            if (prop === '0') {
              this.labelsDvA.push('Chờ duyệt');
            }
            if (prop === '1') {
              this.labelsDvA.push('Đã duyệt');
            }
            if (prop === '-1') {
              this.labelsDvA.push('Không duyệt');
            }
          } else if (this.loaiDvA === 1) {
            if (prop === '1') {
              this.labelsDvA.push('Ẩn');
            } else {
              this.labelsDvA.push('Hiện');
            }
          }
          this.datasetsDvA.push(result[prop]);
        }
      })
      .catch(err => {
        console.log('err at i: ' + this.loaiDvA);
        console.error(err);
      });
  }

  initChart() {
    this.options = Constants.chartOptions;
    this.getDiachi();
    this.getTvDT();
    this.getKhac();
    this.getDvA();
  }

  thongkeDiachi(e: any, type: string) {
    if(type && type === 'month') {
      this.selectedMonth[0] = e;
    } else {
      this.loaiDiachi = e;
    }
    this.getDiachi();
  }

  thongkeTvDT(e: any, type: string) {
    if(type && type === 'month') {
      this.selectedMonth[1] = e;
    } else {
      this.loaiTvDT = e;
    }
    this.getTvDT();
  }

  thongkeKhac(e: any, type: string) {
    if(type && type === 'month') {
      this.selectedMonth[2] = e;
    } else {
      this.loaiKhac = e;
    }
    this.getKhac();
  }

  thongkeDvA(e: any, type: string) {
    if (type && type === 'month') {
      this.selectedMonth[3] = e;
    } else {
      this.loaiDvA = e;
    }
    this.getDvA();
  }

  thongkeLvCmt(e: any, type: string) {
    if (type && type === 'month') {
      this.selectedMonth[4] = e;
    } else {
      this.loaiLvCmt = e;
    }
    if(this.loaiLvCmt == 0) {
      this.getPTLike();
    } else {
      this.getPTCmt();
    }
  }

  showDetailItem(item) {
    this.selectedPT = item;
    this.detailPopup.showPopup();
  }

  popupClose(e: any) {
    if(e) {
      if(this.loaiLvCmt == 0) {
        this.getPTLike();
      } else {
        this.getPTCmt();
      }
    }
  }
}
