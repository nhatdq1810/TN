import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../models/comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() phongtroID: number;
  private listCmt: Array<Comment>;
  private complexForm: FormGroup;

  constructor(private fb: FormBuilder, private cmtService: CommentService) {
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
    });
  }

  submitForm(value: any) {
    console.log(value.trim());
  }

  fakeInit() {
    this.listCmt = [{
      id: 1,
      ngay: '2016/10/10',
      noidung: `comment 1
      comment 1
      comment 1
      comment 1`,
      phongtroID: this.phongtroID,
      userID: 2
    },
    {
      id: 2,
      ngay: '2016/10/12',
      noidung: 'comment 2',
      phongtroID: this.phongtroID,
      userID: 1
    },
    {
      id: 3,
      ngay: '2016/10/11',
      noidung: 'comment 3',
      phongtroID: this.phongtroID,
      userID: 4
    },
    {
      id: 4,
      ngay: '2016/10/14',
      noidung: 'comment 4',
      phongtroID: this.phongtroID,
      userID: 2
    },
    {
      id: 5,
      ngay: '2016/10/8',
      noidung: 'comment 5',
      phongtroID: this.phongtroID,
      userID: 3
    }];
  }

}
