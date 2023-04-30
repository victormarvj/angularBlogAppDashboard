import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriesService } from '../services/categories.service';
import { ICategory } from '../models/category';
import { ICategoryData } from '../models/category-data';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements OnInit {


  formStatus: string = 'Add';
  categoryId: string = '';
  formCategory: string = '';
  categoryArr: ICategoryData<any>[] =  [];

  constructor( private categoryService: CategoriesService ) {}

  ngOnInit(): void {
      this.categoryService.loadData().subscribe( val => {
        console.log(val);
        this.categoryArr = val;
      });
  }

  onSubmit(formData: NgForm) {

    let categoryData: ICategory = {
      category: formData.value.category
    }

    if(this.formStatus == 'Add') {
      this.categoryService.saveData(categoryData);
    }else if (this.formStatus == 'Edit') {
      this.categoryService.updateData(this.categoryId, categoryData)
    }


    formData.resetForm();
    this.formStatus = 'Add';
  }

  onEdit(category: any, id: string) {
    console.log(category);
    this.formCategory = category;
    this.formStatus = 'Edit';
    this.categoryId = id;
  }

  onDelete(id: string) {
    this.categoryService.deleteData(id);
  }
}
