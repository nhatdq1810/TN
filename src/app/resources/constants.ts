import { Headers } from '@angular/http';
import { User } from '../models/user';
import { Phongtro } from '../models/phongtro';
import { Nganhang } from '../models/nganhang';

'use strict';

export var apiUrl = 'http://localhost:8080/trosv/api/';
export var headers = new Headers({ 'Content-Type': 'application/json' });
export var googleApiKey = 'AIzaSyA9jeLAznvDLTykLxHlDZkxe-Ewo9OSB0Y';
export var geocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
export var fakeUser: User = {
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
export var fakePt: Phongtro = {
  id: 3,
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
  giatien: 2000000
};
export var fakeListPt: Array<Phongtro> = [
  {
    id: 12,
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
    giatien: 2000000
  },
  {
    id: 13,
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
    giatien: 2000000
  },
  {
    id: 14,
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
    giatien: 2000000
  },
  {
    id: 15,
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
    giatien: 2000000
  },
  {
    id: 16,
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
    giatien: 2000000
  },
  {
    id: 17,
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
    giatien: 2000000
  },
  {
    id: 18,
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
    giatien: 2000000
  }
];
export var fakeNgh: Nganhang = {
  cmnd: '123456789',
  diachi: '123 abc',
  hoten: 'abc',
  id: 1,
  password: '123454',
  sodt: '0123456789',
  tien: 0,
  userID: 1,
  username: 'abc'
};
