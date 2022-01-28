import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatTableDataSource, MatSort } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { StoresService } from 'src/app/services/stores.service';


const ELEMENT_DATA: any[] = [];



@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class StoresComponent implements OnInit {

  stores: Array<any>;
  displayedColumns: string[] = ['name', 'location', 'logo', 'catId'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  expandedElement: any | null;

  sideBarOpen = true;

  @ViewChild(MatSort, {static: true}) sort: MatSort

  constructor(private router: Router, private storeService: StoresService,private sanitizer:DomSanitizer) { }

  ngOnInit() {
    this.fetchStores();
    this.dataSource.sort = this.sort;
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  sanitize(url) {
    this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  fetchStores() {
    this.storeService.getStores().subscribe(response => {
      this.dataSource.data = response.stores
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  onAddBtnClick() {
    this.router.navigate(['/main-admin/stores/create']);
  }

  onBtnDeleteClick(id: string) {
    this.storeService.deleteStore(id).subscribe(deleted => {
      this.fetchStores();
    })
  }



  
}
