import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommentService } from '../../services/comment.service';
import { UserService } from '../../services/user.service';
import { Comment } from '../../models/comment';
import { User } from '../../models/user';

let Constants = require('../../resources/constants');

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() phongtroID: number;
  private listCmt: Array<Comment>;
  private listUser: Array<any>;
  private complexForm: FormGroup;

  constructor(private fb: FormBuilder, private cmtService: CommentService, private userService: UserService) {
    this.complexForm = this.fb.group({
      'comment': ''
    });
    this.fakeInit();
    // this.init();
  }

  ngOnInit() {
  }

  init() {
    this.cmtService.layCommentPhongtro(this.phongtroID).then((resp: Array<Comment>) => {
      this.listCmt = resp;
      for (let cmt of this.listCmt) {
        this.userService.layThongtinUserID(cmt.userID).then(user => {
          this.listUser[cmt.userID] = user;
        })
      }
    });
  }

  submitForm(value: any) {
    let currentDate = Constants.getCurrentDate();
    let model = {
      id: 6,
      ngay: currentDate,
      noidung: value.comment,
      phongtroID: this.phongtroID,
      userID: 1
    };
    // let model = {
    //   ngay: currentDate,
    //   noidung: value.comment,
    //   phongtroID: this.phongtroID,
    //   userID: this.userService.user.id
    // };
    // this.cmtService.themComment(model).then(result => {
    //   console.log(result);
    //   this.listCmt = result;
    // });
    this.listCmt.push(model);
  }

  fakeInit() {
    this.listCmt = [{
      id: 1,
      ngay: '2016/10/10 10:00:00',
      noidung: `comment 1
      comment 1
      comment 1
      comment 1`,
      phongtroID: this.phongtroID,
      userID: 2
    },
    {
      id: 2,
      ngay: '2016/10/12 10:00:00',
      noidung: 'comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2comment 2',
      phongtroID: this.phongtroID,
      userID: 1
    },
    {
      id: 3,
      ngay: '2016/10/11 10:00:00',
      noidung: 'comment 3',
      phongtroID: this.phongtroID,
      userID: 4
    },
    {
      id: 4,
      ngay: '2016/10/14 10:00:00',
      noidung: 'comment 4',
      phongtroID: this.phongtroID,
      userID: 2
    },
    {
      id: 5,
      ngay: '2016/10/08 10:00:00',
      noidung: 'comment 5',
      phongtroID: this.phongtroID,
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
