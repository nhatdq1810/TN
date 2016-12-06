import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { PhongtroService } from '../../../services/phongtro.service';

let Constants = require('../../../resources/constants');

@Component({
  selector: 'app-statistic-pt',
  templateUrl: './statistic-pt.component.html',
  styleUrls: ['./statistic-pt.component.css']
})
export class StatisticPtComponent implements OnInit {

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
  private chartColors;

  constructor(private userService: UserService, private ptService: PhongtroService) {
    // this.init();
    this.fakeInit();
  }

  ngOnInit() {
  }

  init() {
    this.loaiDiachi = 0;
    this.loaiTvDT = 0;
    this.loaiKhac = 0;
    this.nameRadioDiachi = ['Quận', 'Thành phố'];
    this.nameRadioTvDT = ['Giá thuê nguyên phòng', 'Giá thuê từng người', 'Tiền cọc nguyên phòng', 'Tiền cọc từng người', 'Diện tích'];
    this.nameRadioKhac = ['Loại phòng', 'Giới tính', 'Chung trường', 'Chung ngành', 'Chung niên khóa', 'Wifi', 'Ở với chủ'];
    this.tmpDC = 'quận,tp';
    this.tmpTvDT = 'giatien,giatienTheoNguoi,tiencoc,tiencocTheoNguoi,dientich';
    this.tmpInput = 'loaiPhong,gioitinh,truong,nganh,khoa,wifi,chu';

    for (let i = 0; i < this.nameRadioKhac.length; i++) {
      if(i < 4) {
        this.datasetsDiachi[i] = [{ label: 'Số phòng trọ', data: [] }];
        this.labelsDiachi[i] = [];
      }
      if(i < 5) {
        this.datasetsTvDT[i] = [{ label: 'Số phòng trọ', data: [] }];
        this.labelsTvDT[i] = [];
      }
      this.datasetsKhac[i] = [{ label: 'Số phòng trọ', data: [] }];
      this.labelsKhac[i] = [];
    }
    this.initChart();
  }

  getDiachi() {
    this.labelsDiachi[this.loaiDiachi] = [];
    this.datasetsDiachi[this.loaiDiachi] = [
      {
        label: 'Số phòng trọ',
        data: []
      }
    ];
    this.ptService.thongkePTTheoDiachi(this.tmpDC.split(',')[this.loaiDiachi], 5)
      .then(result => {
        let tmpData = [];
        for (let prop in result) {
          this.labelsDiachi[this.loaiDiachi].push(prop);
          tmpData.push(result[prop]);
        }
        this.datasetsDiachi[this.loaiDiachi][0].data = tmpData;
      })
      .catch(err => {
        console.log('error at i: ' + this.loaiDiachi);
        console.error(err);
      });
  }

  getTvDT() {
    this.labelsTvDT[this.loaiTvDT] = [];
    this.datasetsTvDT[this.loaiTvDT] = [
      {
        label: 'Số phòng trọ',
        data: []
      }
    ];
    this.ptService.thongkePTTheoTienVaDientich(this.tmpTvDT.split(',')[this.loaiTvDT], 5)
      .then(result => {
        let tmpData = [];
        for (let prop in result) {
          let label = new DecimalPipe('en').transform(prop);
          this.labelsTvDT[this.loaiTvDT].push(label);
          tmpData.push(result[prop]);
        }
        this.datasetsTvDT[this.loaiTvDT][0].data = tmpData;
      })
      .catch(err => {
        console.log('err at i: ' + this.loaiTvDT);
        console.error(err);
      });
  }

  getKhac() {
    this.labelsKhac[this.loaiKhac] = [];
    this.datasetsKhac[this.loaiKhac] = [
      {
        label: 'Số phòng trọ',
        data: []
      }
    ];
    this.ptService.thongkePTTheoInput(this.tmpInput.split(',')[this.loaiKhac], 5)
      .then(result => {
        let tmpData = [];
        for (let prop in result) {
          if (this.loaiKhac === 0) {
            if (prop === '0') {
              this.labelsKhac[this.loaiKhac].push('Cả hai');
            }
            if (prop === '1') {
              this.labelsKhac[this.loaiKhac].push('Thuê từng người');
            }
            if (prop === '2') {
              this.labelsKhac[this.loaiKhac].push('Thuê nguyên phòng');
            }
          } else if (this.loaiKhac === 1) {
            if (prop === '') {
              this.labelsKhac[this.loaiKhac].push('Bất kỳ');
            }
          } else if (this.loaiKhac === 5 || this.loaiKhac === 6) {
            if (prop === '1') {
              this.labelsKhac[this.loaiKhac].push('Có');
            } else {
              this.labelsKhac[this.loaiKhac].push('Không');
            }
          } else {
            this.labelsKhac[this.loaiKhac].push(prop);
          }
          tmpData.push(result[prop]);
        }
        this.datasetsKhac[this.loaiKhac][0].data = tmpData;
      })
      .catch(err => {
        console.log('err at i: ' + this.loaiKhac);
        console.error(err);
      });
  }

  initChart() {
    this.options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };
    this.chartColors = [{
      borderWidth: '0.5',
      borderColor: '#c72',
      pointBackgroundColor: '#c7254e',
      pointHoverBackgroundColor: 'transparent',
      pointBorderColor: '#c7254e',
      pointHoverRadius: 10
    }];

    let currentMonth = Constants.getCurrentDate().split('/')[1];
    this.getDiachi();
    this.getTvDT();
    this.getKhac();
  }

  thongkeDiachi() {
    this.getDiachi();
  }

  thongkeTvDT() {
    this.getTvDT();
  }

  thongkeKhac() {
    this.getKhac();
  }

  fakeInit() {
    this.loaiDiachi = 0;
    this.loaiTvDT = 0;
    this.loaiKhac = 0;
    this.nameRadioDiachi = ['Quận', 'Thành phố'];
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
    this.datasetsDiachi[0] = [{
      label: 'Số phòng trọ',
      data: [10, 3, 1, 15]
    }];
    this.datasetsDiachi[1] = [{
      label: 'Số phòng trọ',
      data: [0, 3, 1, 15]
    }];
    this.labelsDiachi[0] = ['Quận Gò Vấp, TP.Hồ Chí Minh', 'Quận 1, TP.Hồ Chí Minh', 'Quận 2, TP.Hồ Chí Minh', 'Quận 9, TP.Hồ Chí Minh'];
    this.labelsDiachi[1] = ['TP Hồ Chí Minh', 'Thành phố Hà Nội', 'TP. Hà Nội', 'Tp. Đà Nẵng'];
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
