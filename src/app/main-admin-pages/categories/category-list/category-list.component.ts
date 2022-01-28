import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PageEvent } from "@angular/material";
import { CategoryService } from "src/app/services/category.service";
import { Category } from "src/app/classes/category.model";


@Component({
  selector: "app-category-list",
  templateUrl: "./category-list.component.html",
  styleUrls: ["./category-list.component.scss"],
  providers: [CategoryService]
})
export class CategoryListComponent implements OnInit {
  categories: Array<Category>;
  isLoading = false;
  totalCats = 0;
  catsPerPage = 3;
  currentPage = 1;
  pageSizeOptions = [1, 3, 5, 10];
  sideBarOpen = true;

  constructor(private router: Router, private catService: CategoryService) {}

  ngOnInit() {
    this.isLoading = true;
    this.fetchData();
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  fetchData() {
    this.catService.getAllCategories(this.catsPerPage, this.currentPage).subscribe(storedCats => {
      this.categories = storedCats.categories;
      this.totalCats = storedCats.maxCats;
      this.isLoading = false;
    });
  }
  
  onChangePage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.catsPerPage = pageData.pageSize;
    this.fetchData();
  }
  
  
  onDeleteCategory(catId: string) {
    this.isLoading = true;
    this.catService.deleteCategory(catId).subscribe(() => {
      this.fetchData();
    });
  }

  onAddBtnClick() {
    this.router.navigate(['/main-admin/categories/create']);
  }

  
}
