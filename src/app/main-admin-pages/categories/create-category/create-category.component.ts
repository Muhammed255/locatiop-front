import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Category } from 'src/app/classes/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {

  isLoading = false;

  mode = 'create';
  private catId: string;
  category: Category;
  sideBarOpen = true;
  

  constructor(private catService: CategoryService, private router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('catId')) {
        this.mode = 'edit';
        this.catId = paramMap.get('catId');
        this.catService.getCategory(this.catId).subscribe(data => {
          this.category = data.category;
        })
      } else {
        this.mode = 'create';
        this.catId = null;
      }
    })
  }

  onSaveCategory(form: NgForm) {
    if (this.mode === 'create') {
      this.catService.createCategory(form.value.name, form.value.description).subscribe(catData => {
      this.router.navigate(['/account/categories']);
    });
    } else {
      this.catService.updateCategory(this.catId, form.value.name, form.value.description);
    }
    
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
