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
  private comment: string;
  private listCmtUserLike: Array<boolean>;

  constructor(private fb: FormBuilder, private cmtService: CommentService, private userService: UserService, private ptService: PhongtroService) {
    this.complexForm = this.fb.group({
      'comment': ''
    });
    this.comment = '';
    // this.fakeInit();
    this.init();
  }

  ngOnInit() {
    this.ptService.phongtroDetailChange.subscribe(result => {
      if(result) {
        this.init();
      }
    });
    this.userService.checkLoggedIn.subscribe(result => {
      if (result) {
        this.cmtService.layCommentUserThich(this.userService.user.id)
          .then(result => {
            let tmpListCmtUserLike = result;
            tmpListCmtUserLike.forEach((idCmt) => {
              this.listCmtUserLike[idCmt] = true;
            })
          }).catch(err => {
            console.error(err);
            this.listCmtUserLike = [];
          });
      }
    })
  }

  init() {
    this.cmtService.layCommentPhongtro(this.ptService.currentPT.id).then((resp: Array<Comment>) => {
      this.listCmt = resp;
      if (this.userService.user) {
        this.cmtService.layCommentUserThich(this.userService.user.id)
          .then(result => {
            let tmpListCmtUserLike = result;
            tmpListCmtUserLike.forEach((idCmt) => {
              this.listCmtUserLike[idCmt] = true;
            })
          }).catch(err => {
            console.error(err);
            this.listCmtUserLike = [];
          });
      } else {
        this.listCmtUserLike = [];
      }
      this.listCmt.forEach(cmt => {
        this.cmtService.layLuotThichComment(cmt.id)
          .then(result => {
            cmt.thich = +result;
          }).catch(err => {
            console.error(cmt.id + ': ' + err);
            cmt.thich = 0;
          });
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

  likeCmt(item) {
    if (this.userService.user && this.userService.user.id !== item.userID) {
      if (!this.listCmtUserLike[item.id]) {
        this.cmtService.thichComment(item.id, this.userService.user.id)
          .then(result => {
            if (result === 'success') {
              item.thich++;
              this.listCmtUserLike[item.id] = true;
            }
          }).catch(err => {
            console.error(item.id + ': ' + err);
          });
      } else {
        this.cmtService.boThichComment(item.id, this.userService.user.id)
          .then(result => {
            if (result === 'success') {
              if (item.thich > 0) {
                item.thich--;
              }
              this.listCmtUserLike[item.id] = false;
            }
          }).catch(err => {
            console.error(err);
          });
      }
    }
  }

  submitForm(value: any) {
    let currentDate = Constants.getCurrentDate();
    if (this.userService.user) {
      let model = {
        ngay: currentDate,
        noidung: value.comment,
        phongtroID: this.ptService.currentPT.id,
        userID: this.userService.user.id
      };
      this.cmtService.themComment(model).then((result: Array<Comment>) => {
        this.listCmt = result;
        this.listCmt.forEach(cmt => {
          this.userService.layThongtinUserID(cmt.userID).then(user => {
            if (!this.listUser[cmt.userID]) {
              this.listUser[cmt.userID] = user;
            }
          });
        });
        this.comment = '';
      });
    }
  }

  fakeInit() {
    this.listCmtUserLike = [true, false, false, true, true, false];
    this.listCmt = Constants.fakeListCmt;
    this.listUser = Constants.fakeListUser;
  }

}
