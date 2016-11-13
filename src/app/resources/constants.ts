import { Headers } from '@angular/http';
import { User } from '../models/user';
import { Phongtro } from '../models/phongtro';
import { Nganhang } from '../models/nganhang';



export let patternPassword = /^(?=.*\d)(?=.*[a-zA-Z])(?!.*\s)([\w@!#$%^&/\\]){8,32}$/g;
export let apiUrl = 'http://localhost:8080/trosv/api/';
export let headers = new Headers({ 'Content-Type': 'application/json' });
export let googleApiKey = 'AIzaSyA9jeLAznvDLTykLxHlDZkxe-Ewo9OSB0Y';
export let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${googleApiKey}&address=`;
export let placeUrl = `http://maps.googleapis.com/maps/api/geocode/json?latlng=`;
export let fakeUser: User = {
  diachi: '123 Lê Đức Thọ, Phường 15, Quận Gò Vấp, TP.Hồ Chí Minh',
  dotincay: 1,
  email: 'abc@gmail.com',
  facebook: 'https://www.facebook.com/abcabcabcabcabcabcabcabcabcabc',
  skype: 'sutrix.nhat.dangsutrix.nhat.dangsutrix.nhat.dangsutrix.nhat.dang',
  hoten: 'abc',
  id: 3,
  password: '123456',
  sodt: '0123456789',
  username: 'abcd'
};
export let fakeListUser: Array<User> = [{
  id: 0,
  hoten: 'abc',
  diachi: '',
  dotincay: 0,
  email: 'a@a.com',
  facebook: '',
  password: '123456',
  skype: '',
  sodt: '',
  username: 'abc'
},
{
  id: 1,
  hoten: 'abc1',
  diachi: '',
  dotincay: 0,
  email: 'a@a.com',
  facebook: '',
  password: '123456',
  skype: '',
  sodt: '',
  username: 'abc'
},
{
  id: 2,
  hoten: 'abc2',
  diachi: '',
  dotincay: 0,
  email: 'a@a.com',
  facebook: '',
  password: '123456',
  skype: '',
  sodt: '',
  username: 'abc'
},
{
  id: 3,
  hoten: 'abc3',
  diachi: '',
  dotincay: 0,
  email: 'a@a.com',
  facebook: '',
  password: '123456',
  skype: '',
  sodt: '',
  username: 'abc'
},
{
  id: 4,
  hoten: 'abc4',
  diachi: '',
  dotincay: 0,
  email: 'a@a.com',
  facebook: '',
  password: '123456',
  skype: '',
  sodt: '',
  username: 'abc'
},
{
  id: 5,
  hoten: 'abc5',
  diachi: '',
  dotincay: 0,
  email: 'a@a.com',
  facebook: '',
  password: '123456',
  skype: '',
  sodt: '',
  username: 'abc'
}];
export let fakePT: Phongtro = {
  id: 3,
  loaiPhong: 2,
  giatienTheoNguoi: 500000,
  hinhanh: 'assets/img/index-03.jpg',
  diachi: '123 Lê Đức Thọ, Phường 15, Quận Gò Vấp, TP.Hồ Chí Minh',
  songuoi: 2,
  dientich: 20,
  gioitinh: 'nữ',
  nganh: 'Công nghệ thông tin',
  khoa: '2012-2017',
  wifi: 1,
  chu: 0,
  ghichu: 'Tiền thuê đã bao gồm tiền rác, chưa bao gồm tiền điện nước và wifi',
  userID: 4,
  tiencoc: 2000000,
  truong: 'học viện công nghệ bưu chính viễn thông',
  ngaydang: '01/10/2016',
  giatien: 2000000,
  nganhangID: '12345678',
  thich: 5,
  userThich: false,
  tiencocTheoNguoi: 500000
};
export let fakeListPT: Array<Phongtro> = [
  {
    id: 12,
    loaiPhong: 2,
    giatienTheoNguoi: 500000,
    hinhanh: 'assets/img/index-08.jpg',
    diachi: '1236 abc P.15 Quận Gò Vấp',
    songuoi: 2,
    dientich: 25,
    gioitinh: 'nữ',
    nganh: 'Công nghệ thông tin',
    khoa: '2012-2017',
    wifi: 1,
    chu: 0,
    ghichu: 'Tiền thuê đã bao gồm tiền rác, chưa bao gồm tiền điện nước và wifi',
    userID: 4,
    tiencoc: 2500000,
    truong: 'học viện công nghệ bưu chính viễn thông',
    ngaydang: '01/10/2016',
    giatien: 2000000,
    nganhangID: '12345678',
    thich: 3,
    userThich: false,
    tiencocTheoNguoi: 500000
  },
  {
    id: 13,
    loaiPhong: 2,
    giatienTheoNguoi: 500000,
    hinhanh: 'assets/img/index-09.jpg',
    diachi: '1234 abc P.15 Quận Gò Vấp',
    songuoi: 2,
    dientich: 25,
    gioitinh: 'nam',
    nganh: 'Công nghệ thông tin',
    khoa: '2012-2017',
    wifi: 1,
    chu: 0,
    ghichu: 'Tiền thuê đã bao gồm tiền rác, chưa bao gồm tiền điện nước và wifi',
    userID: 4,
    tiencoc: 2500000,
    truong: 'học viện công nghệ bưu chính viễn thông',
    ngaydang: '01/10/2016',
    giatien: 2000000,
    nganhangID: '12345678',
    thich: 3,
    userThich: false,
    tiencocTheoNguoi: 500000
  },
  {
    id: 14,
    loaiPhong: 2,
    giatienTheoNguoi: 500000,
    hinhanh: 'assets/img/index-10.jpg',
    diachi: '1235 abc P.15 Quận Gò Vấp',
    songuoi: 2,
    dientich: 25,
    gioitinh: 'nữ',
    nganh: 'cntt',
    khoa: '2012-2017',
    wifi: 1,
    chu: 0,
    ghichu: 'Tiền thuê đã bao gồm tiền rác, chưa bao gồm tiền điện nước và wifi',
    userID: 4,
    tiencoc: 3000000,
    truong: 'học viện công nghệ bưu chính viễn thông',
    ngaydang: '01/10/2016',
    giatien: 2000000,
    nganhangID: '12345678',
    thich: 3,
    userThich: false,
    tiencocTheoNguoi: 500000
  },
  {
    id: 15,
    loaiPhong: 2,
    giatienTheoNguoi: 500000,
    hinhanh: 'assets/img/index-07.jpg',
    diachi: '123 abc P.15 Quận Gò Vấp',
    songuoi: 2,
    dientich: 25,
    gioitinh: 'nữ',
    nganh: 'Công nghệ thông tin',
    khoa: '2012-2017',
    wifi: 1,
    chu: 0,
    ghichu: 'Tiền thuê đã bao gồm tiền rác, chưa bao gồm tiền điện nước và wifi',
    userID: 4,
    tiencoc: 2000000,
    truong: 'học viện công nghệ bưu chính viễn thông',
    ngaydang: '01/10/2016',
    giatien: 2000000,
    nganhangID: '12345678',
    thich: 3,
    userThich: false,
    tiencocTheoNguoi: 500000
  },
  {
    id: 16,
    loaiPhong: 2,
    giatienTheoNguoi: 500000,
    hinhanh: 'assets/img/index-08.jpg',
    diachi: '1236 abc P.15 Quận Gò Vấp',
    songuoi: 2,
    dientich: 25,
    gioitinh: 'nam',
    nganh: 'Công nghệ thông tin',
    khoa: '2012-2017',
    wifi: 1,
    chu: 0,
    ghichu: 'Tiền thuê đã bao gồm tiền rác, chưa bao gồm tiền điện nước và wifi',
    userID: 4,
    tiencoc: 3500000,
    truong: 'học viện công nghệ bưu chính viễn thông',
    ngaydang: '01/10/2016',
    giatien: 2000000,
    nganhangID: '12345678',
    thich: 3,
    userThich: false,
    tiencocTheoNguoi: 500000
  },
  {
    id: 17,
    loaiPhong: 2,
    giatienTheoNguoi: 500000,
    hinhanh: 'assets/img/index-09.jpg',
    diachi: '1234 abc P.15 Quận Gò Vấp',
    songuoi: 2,
    dientich: 25,
    gioitinh: 'nam',
    nganh: 'Công nghệ thông tin',
    khoa: '2012-2017',
    wifi: 1,
    chu: 0,
    ghichu: 'Tiền thuê đã bao gồm tiền rác, chưa bao gồm tiền điện nước và wifi',
    userID: 4,
    tiencoc: 2000000,
    truong: 'học viện công nghệ bưu chính viễn thông',
    ngaydang: '01/10/2016',
    giatien: 2000000,
    nganhangID: '12345678',
    thich: 3,
    userThich: false,
    tiencocTheoNguoi: 500000
  },
  {
    id: 18,
    loaiPhong: 2,
    giatienTheoNguoi: 500000,
    hinhanh: 'assets/img/index-10.jpg',
    diachi: '1235 abc P.15 Quận Gò Vấp',
    songuoi: 2,
    dientich: 25,
    gioitinh: 'nữ',
    nganh: 'Công nghệ thông tin',
    khoa: '2012-2017',
    wifi: 1,
    chu: 0,
    ghichu: 'Tiền thuê đã bao gồm tiền rác, chưa bao gồm tiền điện nước và wifi',
    userID: 4,
    tiencoc: 2000000,
    truong: 'học viện công nghệ bưu chính viễn thông',
    ngaydang: '01/10/2016',
    giatien: 2000000,
    nganhangID: '12345678',
    thich: 3,
    userThich: false,
    tiencocTheoNguoi: 500000
  }
];
export let fakeNgh: Nganhang = {
  cmnd: '123456789',
  diachi: '123 abc',
  hoten: 'abc',
  id: '1',
  password: '123454',
  sodt: '0123456789',
  tien: 0,
  username: 'abc'
};

export let fakeListCmt = [{
  id: 1,
  ngay: '2016/10/10 10:00:00',
  noidung: `comment 1
      comment 1
      comment 1
      comment 1`,
  phongtroID: 1,
  userID: 2,
  thich: 1,
  userThich: false
},
{
  id: 2,
  ngay: '2016/10/12 10:00:00',
  noidung: 'comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2',
  phongtroID: 1,
  userID: 1,
  thich: 1,
  userThich: true
},
{
  id: 3,
  ngay: '2016/10/11 10:00:00',
  noidung: 'comment 3',
  phongtroID: 1,
  userID: 4,
  thich: 1,
  userThich: false
},
{
  id: 4,
  ngay: '2016/10/14 10:00:00',
  noidung: 'comment 4',
  phongtroID: 1,
  userID: 2,
  thich: 1,
  userThich: false
},
{
  id: 5,
  ngay: '2016/10/08 10:00:00',
  noidung: 'comment 5',
  phongtroID: 1,
  userID: 3,
  thich: 1,
  userThich: false
}];

let formatDate = (value) => {
  let tmp = value;
  if(tmp < 10) {
    value = '0' + tmp;
  } else {
    value = '' + tmp;
  }
  return value;
}

export let getCurrentDate = function () {
  let date = new Date();
  let month = formatDate(date.getMonth() + 1);
  let day = formatDate(date.getDate());
  let hours = formatDate(date.getHours());
  let minutes = formatDate(date.getMinutes());
  let seconds = formatDate(date.getSeconds());

  let currentDate = date.getFullYear() + "/"
    + month + "/"
    + day + " "
    + hours + ":"
    + minutes + ":"
    + seconds;

  return currentDate;
}

export let authConfig = {
  clientID: 'W86crS2GtE2H6uTKOSsiEemJpLuutnVB',
  domain: 'nhatdq1810.auth0.com',
  callbackURL: 'http://localhost:4200/'
}
