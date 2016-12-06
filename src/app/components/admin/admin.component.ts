import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { PhongtroService } from '../../services/phongtro.service';
import { LoginComponent } from '../login/login.component';

let Constants = require('../../resources/constants');
declare let $: JQueryStatic;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, AfterViewInit {

  @ViewChild('loginModal') loginModal: LoginComponent;
  @ViewChild('navigation') navigation: ElementRef;
  private totalUser: number;
  private totalPT: number;
  private newUser: number;
  private newPT: number;
  private percentTotalUser: number;
  private percentTotalPT: number;
  private percentNewUser: number;
  private percentNewPT: number;
  private isTotalUserIncrease: boolean;
  private isTotalPTIncrease: boolean;
  private isNewUserIncrease: boolean;
  private isNewPTIncrease: boolean;
  private isLiActive: Array<boolean> = [];
  private isChildLiActive: Array<boolean> = [];
  private listLi: Array<any> = [];
  private statusPage: string;
  private datasetsUsers: Array<any> = [];
  private datasetsNewUsers: Array<any> = [];
  private datasetsPT: Array<any> = [];
  private datasetsNewPT: Array<any> = [];
  private labelsNewUsers: Array<any> = [];
  private labelsUsers: Array<any> = [];
  private labelsPT: Array<any> = [];
  private labelsNewPT: Array<any> = [];
  private isLogin: boolean = false;

  constructor(private userService: UserService, private ptService: PhongtroService) {
    this.isLogin = true;
  }

  ngOnInit() {
    this.userService.checkAdminLoggedIn.subscribe((value: boolean) => {
      this.isLogin = value;
      if(!this.isLogin) {
        this.loginModal.showModal('admin', 0);
      } else {
        this.init();
      }
    })
  }

  ngAfterViewInit() {
    if (!this.isLogin) {
      this.loginModal.showModal('admin', 0);
    } else {
      this.init();
    }
  }

  init() {
    this.listLi = [{
      'statusPage': 'home',
      'i': 'fa fa-tachometer',
      'span': 'Trang chủ'
    },
    {
      'statusPage': 'pt-not-checked',
      'i': 'fa fa-bed',
      'span': 'Quản lý phòng trọ',
      'li': [{
        'content': 'Chờ duyệt',
        'statusPage': 'pt-not-checked'
      },
      {
        'content': 'Đã duyệt',
        'statusPage': 'pt-accept'
      },
      {
        'content': 'Không duyệt',
        'statusPage': 'pt-not-accept'
      },
      {
        'content': 'Thống kê',
        'statusPage': 'statistic-pt'
      }]
    },
    {
      'statusPage': 'user',
      'i': 'fa fa-users',
      'span': 'Quản lý user',
      'li': [{
        'content': 'Danh sách user',
        'statusPage': 'user'
      },
      {
        'content': 'Thống kê',
        'statusPage': 'statistic-user'
      }]
    },
    {
      'statusPage': 'gd',
      'i': 'fa fa-bar-chart-o',
      'span': 'Thống kê giao dịch'
    }];
    for (let i = 0; i < this.listLi.length; ++i) {
      if (i === 0) {
        this.isLiActive[i] = true;
      } else {
        this.isLiActive[i] = false;
      }
    }
    this.statusPage = 'home';
    this.initChart();
  }

  private calcPercent(newValue, oldValue, type) {
    let percent: number, checkIncrease: boolean;
    if (oldValue === 0) {
      checkIncrease = true;
      if(newValue === 0) {
        percent = 0;
      } else {
        percent = 100;
      }
    } else {
      if (newValue === 0) {
        checkIncrease = false;
        percent = 100;
      } else {
        percent = newValue / oldValue;
        if (percent >= 1) {
          checkIncrease = true;
          percent -= 1;
        } else {
          checkIncrease = false;
          percent = 1 - percent;
        }
        percent *= 100;
        percent = +(percent.toFixed(2));
      }
    }
    if (type === 'total user') {
      this.isTotalUserIncrease = checkIncrease;
    }
    if (type === 'total pt') {
      this.isTotalPTIncrease = checkIncrease;
    }
    if (type === 'new user') {
      this.isNewUserIncrease = checkIncrease;
    }
    if (type === 'new pt') {
      this.isNewPTIncrease = checkIncrease;
    }
    return percent;
  }

  initChart() {

    let currentMonth = Constants.getCurrentDate().split('/')[1];
    this.userService.thongkeUserTheoThang(currentMonth - 5, currentMonth)
      .then(resp => {
        this.datasetsNewUsers = [{ label: 'User tạo mới trong tháng (người)', data: [] }];
        for (let i = 0; i < 6; ++i) {
          let tmpMonth = currentMonth - 5 + i;
          this.labelsNewUsers.push(`tháng ${tmpMonth}`);
          if(resp[tmpMonth]) {
            this.datasetsNewUsers[0].data[i] = resp[tmpMonth];
          } else {
            this.datasetsNewUsers[0].data[i] = 0;
            resp[tmpMonth] = 0;
          }
        }
        this.newUser = resp[currentMonth];
        this.percentNewUser = this.calcPercent(this.newUser, resp[currentMonth - 1], 'new user');
      })
      .catch(err => {
        console.error(err);
      });
    for (let i = 0; i < 4; i++) {
      this.userService.thongkeUserMoiTrenTongso(currentMonth - i)
        .then(resp => {
          if (i === 0) {
            this.totalUser = resp['new'] + resp['old'];
            this.percentTotalUser = this.calcPercent(this.totalUser, resp['old'], 'total user');
          }
          this.labelsUsers[i] = [`User tạo mới tháng ${currentMonth - i} (%)`, 'User cũ các tháng trước (%)'];
          let newUserPercent = +((resp['new'] / (resp['new'] + resp['old'])) * 100).toFixed(2);
          let oldUserPercent = +((resp['old'] / (resp['new'] + resp['old'])) * 100).toFixed(2);
          this.datasetsUsers[i] = [{ data: [newUserPercent, oldUserPercent] }];
        })
        .catch(err => {
          console.error(err);
        });
    }

    this.ptService.thongkePTTheoThang(currentMonth - 5, currentMonth)
      .then(resp => {
        this.datasetsNewPT = [{ label: 'Phòng trọ tạo mới (người)', data: [] }];
        for (let i = 0; i < 6; ++i) {
          let tmpMonth = currentMonth - 5 + i;
          this.labelsNewPT.push(`tháng ${tmpMonth}`);
          if (resp[tmpMonth]) {
            this.datasetsNewPT[0].data[i] = resp[tmpMonth];
          } else {
            this.datasetsNewPT[0].data[i] = 0;
            resp[tmpMonth] = 0;
          }
        }
        this.newPT = resp[currentMonth];
        this.percentNewPT = this.calcPercent(this.newPT, resp[currentMonth - 1], 'new pt');
      })
      .catch(err => {
        console.error(err);
      });
    for (let i = 0; i < 4; i++) {
      this.ptService.thongkePTMoiTrenTongso(currentMonth - i)
        .then(resp => {
          if (i === 0) {
            this.totalPT = resp['new'] + resp['old'];
            this.percentTotalPT = this.calcPercent(this.totalPT, resp['old'], 'total pt');
          }
          this.labelsPT[i] = [`Phòng trọ tạo mới tháng ${currentMonth - i} (%)`, 'Phòng trọ cũ các tháng trước (%)'];
          let newPTPercent = +((resp['new'] / (resp['new'] + resp['old'])) * 100).toFixed(2);
          let oldPTPercent = +((resp['old'] / (resp['new'] + resp['old'])) * 100).toFixed(2);
          this.datasetsPT[i] = [{ data: [newPTPercent, oldPTPercent] }];
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  initChildLiActive(index) {
    let thisLi = $(this.navigation.nativeElement).children('li').eq(index);
    if (thisLi.has('.nav.child-menu')) {
      for (let i = 0; i < thisLi.children('.nav.child-menu').children('li').length; ++i) {
        if (i === 0) {
          this.isChildLiActive[i] = true;
        } else {
          this.isChildLiActive[i] = false;
        }
      }
    }
  }

  slideDown(index) {
    let thisLi = $(this.navigation.nativeElement).children('li').eq(index);
    if (thisLi.has('.nav.child-menu')) {
      $(this.navigation.nativeElement).children('li').not(`:eq(${index})`).children('.nav.child-menu').slideUp(300);
      thisLi.children('.nav.child-menu').slideToggle(500);
      this.initChildLiActive(index);
    }
  }

  activeLi(e:any, index: number, type: string, indexParent: number) {
    e.stopPropagation();
    if(type === 'parent') {
      for (let i = 0; i < this.listLi.length; ++i) {
        if (i === index) {
          this.isLiActive[i] = true;
        } else {
          this.isLiActive[i] = false;
        }
      }
    } else {
      for (let i = 0; i < this.listLi[indexParent].li.length; ++i) {
        if (i === index) {
          this.isChildLiActive[i] = true;
        } else {
          this.isChildLiActive[i] = false;
        }
      }
    }
  }
}
