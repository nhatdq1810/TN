import { Component, OnInit } from '@angular/core';
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
    this.init();
  }

  ngOnInit() {
  }

  init() {
    this.loaiDiachi = 0;
    this.loaiTvDT = 0;
    this.loaiKhac = 0;
    this.nameRadioDiachi = ['Tên đường', 'Tên phường', 'Tên quận', 'Tên thành phố'];
    this.nameRadioTvDT = ['Giá thuê nguyên phòng', 'Giá thuê từng người', 'Tiền cọc nguyên phòng', 'Tiền cọc từng người', 'Diện tích'];
    this.nameRadioKhac = ['Loại phòng', 'Giới tính', 'Chung trường', 'Chung ngành', 'Chung niên khóa', 'Wifi', 'Ở với chủ'];
    this.tmpDC = 'đường,phường,quận,tp';
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

  getDiachi(i: number) {
    this.labelsDiachi[i] = [];
    this.datasetsDiachi[i].data = [];
    this.ptService.thongkePTTheoDiachi(this.tmpDC.split(',')[i], 5)
      .then(result => {
        let tmpData = [];
        for (let prop in result) {
          this.labelsDiachi[i].push(prop);
          tmpData.push(result[prop]);
        }
        console.log(tmpData);
        this.datasetsDiachi[i].data = tmpData;
      })
      .catch(err => {
        console.log('error at i: ' + i);
        console.error(err);
      });
  }

  getTvDT(i: number) {
    this.loaiTvDT = i;
    this.labelsTvDT[i] = [];
    this.datasetsTvDT[i] = [];
    this.ptService.thongkePTTheoTienVaDientich(this.tmpTvDT.split(',')[i], 5)
      .then(result => {
        for (let prop in result) {
          this.labelsTvDT[i].push(prop);
          this.datasetsTvDT[i].push(result[prop]);
        }
      })
      .catch(err => {
        console.log('err at i: ' + i);
        console.error(err);
      });
  }

  getKhac(i: number) {
    this.loaiKhac = i;
    this.labelsKhac[i] = [];
    this.datasetsKhac[i] = [];
    this.ptService.thongkePTTheoInput(this.tmpInput.split(',')[i], 5)
      .then(result => {
        for (let prop in result) {
          if (i === 0) {
            if (prop === '0') {
              this.labelsKhac[i].push('Cả hai');
            }
            if (prop === '1') {
              this.labelsKhac[i].push('Thuê từng người');
            }
            if (prop === '2') {
              this.labelsKhac[i].push('Thuê nguyên phòng');
            }
          } else if (i === 1) {
            if (prop === '') {
              this.labelsKhac[i].push('Bất kỳ');
            }
          } else if (i === 5 || i === 6) {
            if (prop === '1') {
              this.labelsKhac[i].push('Có');
            } else {
              this.labelsKhac[i].push('Không');
            }
          } else {
            this.labelsKhac[i].push(prop);
          }
          this.datasetsKhac[i].push(result[prop]);
        }
      })
      .catch(err => {
        console.log('err at i: ' + i);
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
    this.getDiachi(0);
    this.getTvDT(0);
    this.getKhac(0);
  }

  thongkeDiachi() {
    this.getDiachi(this.loaiDiachi);
  }

  thongkeTvDT() {
    this.getTvDT(this.loaiTvDT);
  }

  thongkeKhac() {
    this.getKhac(this.loaiKhac);
  }

  fakeInit() {

  }
}
