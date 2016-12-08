import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { PhongtroService } from '../../../services/phongtro.service';

let Constants = require('../../../resources/constants');

@Component({
  selector: 'app-statistic-user',
  templateUrl: './statistic-user.component.html',
  styleUrls: ['./statistic-user.component.css']
})
export class StatisticUserComponent implements OnInit {

  private datasetsDiachi: Array<any> = [];
  private datasetsTvDT: Array<any> = [];
  private datasetsKhac: Array<any> = [];
  private labelsDiachi: Array<any> = [];
  private labelsTvDT: Array<any> = [];
  private labelsKhac: Array<any> = [];
  private nameRadioDiachi: Array<string> = [];
  private nameRadioTvDT: Array<string> = [];
  private nameRadioKhac: Array<string> = [];
  private loaiDiachi: any;
  private loaiTvDT: any;
  private loaiKhac: any;
  private tmpDC: string;
  private tmpTvDT: string;
  private tmpInput: string;
  private options;
  private optionsPie;
  private chartColors;
  private listMonth: Array<number> = [];
  private selectedMonth: Array<number> = [];

  constructor(private userService: UserService, private ptService: PhongtroService) {
    this.init();
    // this.fakeInit();
  }

  ngOnInit() {
  }

  init() {
    this.loaiDiachi = 0;
    this.loaiTvDT = 0;
    this.loaiKhac = 0;
    this.nameRadioDiachi = ['Đường', 'Phường', 'Quận', 'Thành phố'];
    this.nameRadioTvDT = ['Giá thuê nguyên phòng', 'Giá thuê từng người', 'Tiền cọc nguyên phòng', 'Tiền cọc từng người', 'Diện tích'];
    this.nameRadioKhac = ['Loại phòng', 'Giới tính', 'Chung trường', 'Chung ngành', 'Chung niên khóa', 'Wifi', 'Ở với chủ'];
    this.tmpDC = 'đường,phường,quận,tp';
    this.tmpTvDT = 'giatien,giatienTheoNguoi,tiencoc,tiencocTheoNguoi,dientich';
    this.tmpInput = 'loaiPhong,gioitinh,truong,nganh,khoa,wifi,chu';
    this.selectedMonth[0] = this.selectedMonth[1] = this.selectedMonth[2] = Constants.getCurrentDate().split('/')[1];
    for (let i = 0; i < 5; i++) {
      this.listMonth.push(this.selectedMonth[0] - i);
    }
    this.initChart();
  }

  getDiachi() {
    this.labelsDiachi = [];
    this.datasetsDiachi = [];
    // this.ptService.thongkeUserTheoDiachi(this.tmpDC.split(',')[this.loaiDiachi], this.selectedMonth[0], 5)
    //   .then(result => {
    //     for (let prop in result) {
    //       this.labelsDiachi.push(prop);
    //       this.datasetsDiachi.push(result[prop]);
    //     }
    //   })
    //   .catch(err => {
    //     console.log('error at i: ' + this.loaiDiachi);
    //     console.error(err);
    //   });
  }

  getTvDT() {
    this.labelsTvDT = [];
    this.datasetsTvDT = [
      {
        label: 'Số phòng trọ',
        data: []
      }
    ];
    // this.ptService.thongkeUserTheoTienVaDientich(this.tmpTvDT.split(',')[this.loaiTvDT], this.selectedMonth[1], 5)
    //   .then(result => {
    //     let tmpData = [];
    //     for (let prop in result) {
    //       let label = new DecimalPipe('en').transform(prop);
    //       this.labelsTvDT.push(label);
    //       tmpData.push(result[prop]);
    //     }
    //     this.datasetsTvDT[0].data = tmpData;
    //   })
    //   .catch(err => {
    //     console.log('err at i: ' + this.loaiTvDT);
    //     console.error(err);
    //   });
  }

  getKhac() {
    this.labelsKhac = [];
    this.datasetsKhac = [
      {
        label: 'Số phòng trọ',
        data: []
      }
    ];
    // this.ptService.thongkeUserTheoInput(this.tmpInput.split(',')[this.loaiKhac], this.selectedMonth[2], 5)
    //   .then(result => {
    //     let tmpData = [];
    //     for (let prop in result) {
    //       if (this.loaiKhac === 0) {
    //         if (prop === '0') {
    //           this.labelsKhac.push('Cả hai');
    //         }
    //         if (prop === '1') {
    //           this.labelsKhac.push('Thuê từng người');
    //         }
    //         if (prop === '2') {
    //           this.labelsKhac.push('Thuê nguyên phòng');
    //         }
    //       } else if (this.loaiKhac === 1) {
    //         if (prop === '') {
    //           this.labelsKhac.push('Bất kỳ');
    //         } else {
    //           this.labelsKhac.push(prop);
    //         }
    //       } else if (this.loaiKhac === 5 || this.loaiKhac === 6) {
    //         if (prop === '1') {
    //           this.labelsKhac.push('Có');
    //         } else {
    //           this.labelsKhac.push('Không');
    //         }
    //       } else {
    //         this.labelsKhac.push(prop);
    //       }
    //       tmpData.push(result[prop]);
    //     }
    //     this.datasetsKhac[0].data = tmpData;
    //   })
    //   .catch(err => {
    //     console.log('err at i: ' + this.loaiKhac);
    //     console.error(err);
    //   });
  }

  initChart() {
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
    this.getDiachi();
    this.getTvDT();
    this.getKhac();
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

  fakeInit() {
    this.selectedMonth[0] = this.selectedMonth[1] = this.selectedMonth[2] = Constants.getCurrentDate().split('/')[1];
    for (let i = 0; i < 5; i++) {
      this.listMonth.push(this.selectedMonth[0] - i);
    }
    this.loaiDiachi = 0;
    this.loaiTvDT = 0;
    this.loaiKhac = 0;
    this.nameRadioDiachi = ['Đường', 'Phường', 'Quận', 'Thành phố'];
    this.nameRadioTvDT = ['Giá thuê nguyên phòng', 'Giá thuê từng người', 'Tiền cọc nguyên phòng', 'Tiền cọc từng người', 'Diện tích'];
    this.nameRadioKhac = ['Loại phòng', 'Giới tính', 'Chung trường', 'Chung ngành', 'Chung niên khóa', 'Wifi', 'Ở với chủ'];
    for (let i = 0; i < 7; i++) {
      if(i < 5) {
        this.datasetsTvDT[i] = [{
          label: 'Số phòng trọ',
          data: [1, 2, 3, 5, 6]
        }];
      }
      if(i < 4) {
        let tmpNumber = 2000000 + (i * 100000);
        let label = new DecimalPipe('en').transform(tmpNumber);
        this.labelsTvDT[i] = [label, label, label, label, label];
      }
      if(i === 5 || i === 6) {
        this.datasetsKhac[i] = [{
          label: 'Số phòng trọ',
          data: [4, 0]
        }]
      } else {
        this.datasetsKhac[i] = [{
          label: 'Số phòng trọ',
          data: [1, 2, 6]
        }];
      }
    }
    this.datasetsDiachi = [10, 3, 1, 15, 6];
    this.labelsDiachi = ['Phan Đăng Lưu, Quận Bình Thạnh, TP.Hồ Chí Minh', 'Lê Đức Thọ, Quận Gò Vấp, TP.Hồ Chí Minh', 'Điện Biên Phủ, Quận 1, TP.Hồ Chí Minh', 'Nam Kỳ Khởi Nghĩa, Quận Tân Bình, TP.Hồ Chí Minh', 'Man Thiện, Quận 9, TP.Hồ Chí Minh'];
    this.labelsTvDT[4] = [10, 11, 12, 14, 20];
    this.labelsKhac[0] = ['Cả hai', 'Thuê nguyên phòng', 'Thuê từng người'];
    this.labelsKhac[1] = ['Bất kỳ', 'Nam', 'Nữ'];
    this.labelsKhac[2] = ['bách khoa', 'ptit', 'ueh'];
    this.labelsKhac[3] = ['cntt', 'qtkd', 'ke toan'];
    this.labelsKhac[4] = ['2012', '2013', '2014'];
    this.labelsKhac[5] = ['Có', 'Không'];
    this.labelsKhac[6] = this.labelsKhac[5];
  }

}
