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
  private datasetsInput: Array<any> = [];
  private labelsDiachi: Array<any> = [];
  private labelsTvDT: Array<any> = [];
  private labelsInput: Array<any> = [];
  private nameRadioTvDT: Array<string> = [];
  private nameRadioKhac: Array<string> = [];
  private loaiTvDT: any;
  private loaiKhac: any;
  private options;
  private chartColors;

  constructor(private userService: UserService, private ptService: PhongtroService) {
    this.initChart();
    this.loaiTvDT = 0;
    this.loaiKhac = 0;
    this.nameRadioTvDT = ['Giá thuê nguyên phòng', 'Giá thuê từng người', 'Tiền cọc nguyên phòng', 'Tiền cọc từng người', 'Diện tích'];
    this.nameRadioKhac = ['Loại phòng', 'Giới tính', 'Chung trường', 'Chung ngành', 'Chung niên khóa', 'Wifi', 'Ở với chủ'];
  }

  ngOnInit() {
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
    let tmpDC = 'đường,phường,quận,tp';
    let tmpTvDT = 'giatien,giatienTheoNguoi,tiencoc,tiencocTheoNguoi,dientich';
    let tmpInput = 'loaiPhong,gioitinh,truong,nganh,khoa,wifi,chu';
    for (let i = 0; i < 7; i++) {
      if(i < 4) {
        this.ptService.thongkePTTheoDiachi(tmpDC.split(',')[i], 5)
        .then(result => {
          this.labelsDiachi[i] = [];
          this.datasetsDiachi[i] = [];
          for (let prop in result) {
            this.labelsDiachi[i].push(prop);
            this.datasetsDiachi[i].push(result[prop]);
          }
        })
        .catch(err => {
          console.log('error at i: ' + i);
          console.error(err);
        });
      }

      if(i < 5) {
        this.ptService.thongkePTTheoTienVaDientich(tmpTvDT.split(',')[i], 5)
          .then(result => {
            this.labelsTvDT[i] = [];
            this.datasetsTvDT[i] = [];
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

      this.ptService.thongkePTTheoInput(tmpInput.split(',')[i], 5)
        .then(result => {
          this.labelsInput[i] = [];
          this.datasetsInput[i] = [];
          for (let prop in result) {
            if(i === 0) {
              if(prop === '0') {
                this.labelsInput[i].push('Cả hai');
              }
              if (prop === '1') {
                this.labelsInput[i].push('Thuê từng người');
              }
              if (prop === '2') {
                this.labelsInput[i].push('Thuê nguyên phòng');
              }
            } else if(i === 1) {
              if(prop === '') {
                this.labelsInput[i].push('Bất kỳ');
              }
            } else if(i === 5 || i === 6) {
              if(prop === '1') {
                this.labelsInput[i].push('Có');
              } else {
                this.labelsInput[i].push('Không');
              }
            } else {
              this.labelsInput[i].push(prop);
            }
            this.datasetsInput[i].push(result[prop]);
          }
        })
        .catch(err => {
          console.log('err at i: ' + i);
          console.error(err);
        });
    }
  }

  thongkeTvDT() {
    console.log(this.loaiTvDT);
  }

  thongkeKhac() {
    console.log(this.loaiKhac);
  }

  fakeInit() {

  }
}
