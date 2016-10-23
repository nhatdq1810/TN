import { Component, OnInit } from '@angular/core';
import { Phongtro } from '../../models/phongtro';
import { PhongtroService } from '../../services/phongtro.service';


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  private listPT: Phongtro[];

  constructor(private ptService: PhongtroService) {
    this.listPT = this.ptService.listPT;
  }

  ngOnInit() {

  }

}
