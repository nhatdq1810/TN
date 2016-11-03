import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommentService } from '../../services/comment.service';
import { UserService } from '../../services/user.service';
import { PhongtroService } from '../../services/phongtro.service';
import { Comment } from '../../models/comment';
import { User } from '../../models/user';

let Constants = require('../../resources/constants');

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  private listCmt: Array<Comment> = [];
  private listUser: Array<any> = [];
  private complexForm: FormGroup;

  constructor(private fb: FormBuilder, private cmtService: CommentService, private userService: UserService, private ptService: PhongtroService) {
    this.complexForm = this.fb.group({
      'comment': ''
    });
    // this.fakeInit();
    this.init();
  }

  ngOnInit() {
    this.ptService.phongtroDetailChange.subscribe(currentPT => {
      this.init();
    });
  }

  init() {
    this.cmtService.layCommentPhongtro(this.ptService.currentPT.id).then((resp: Array<Comment>) => {
      this.listCmt = resp;
      this.listCmt.forEach(cmt => {
        this.userService.layThongtinUserID(cmt.userID).then(user => {
          if (!this.listUser[cmt.userID]) {
            this.listUser[cmt.userID] = user;
          }
        });
      });
    })
    .catch(err => {
      console.log(err);
      this.listCmt = [];
      this.listUser = [];
    });
  }

  submitForm(value: any) {
    let currentDate = Constants.getCurrentDate();
    // let model = {
    //   id: 6,
    //   ngay: currentDate,
    //   noidung: value.comment,
    //   phongtroID: this.ptService.currentPT.id,
    //   userID: 1
    // };
    // this.listCmt.push(model);
    let model = {
      ngay: currentDate,
      noidung: value.comment,
      phongtroID: this.ptService.currentPT.id,
      userID: this.userService.user.id
    };
    this.cmtService.themComment(model).then((result: Array<Comment>) => {
      console.log(result);
      this.listCmt = result;
    });
  }

  fakeInit() {
    this.listCmt = [{
      id: 1,
      ngay: '2016/10/10 10:00:00',
      noidung: `comment 1
      comment 1
      comment 1
      comment 1`,
      phongtroID: this.ptService.currentPT.id,
      userID: 2
    },
    {
      id: 2,
      ngay: '2016/10/12 10:00:00',
      noidung: 'comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2',
      phongtroID: this.ptService.currentPT.id,
      userID: 1
    },
    {
      id: 3,
      ngay: '2016/10/11 10:00:00',
      noidung: 'comment 3',
      phongtroID: this.ptService.currentPT.id,
      userID: 4
    },
    {
      id: 4,
      ngay: '2016/10/14 10:00:00',
      noidung: 'comment 4',
      phongtroID: this.ptService.currentPT.id,
      userID: 2
    },
    {
      id: 5,
      ngay: '2016/10/08 10:00:00',
      noidung: 'comment 5',
      phongtroID: this.ptService.currentPT.id,
      userID: 3
    }];

    this.listUser = [{
      id: 0,
      hoten: 'abc'
    },
    {
      id: 1,
      hoten: 'abc1'
    },
    {
      id: 2,
      hoten: 'abc2'
    },
    {
      id: 3,
      hoten: 'abc3'
    },
    {
      id: 4,
      hoten: 'abc4'
    },
    {
      id: 5,
      hoten: 'abc5'
    }];
  }

}
