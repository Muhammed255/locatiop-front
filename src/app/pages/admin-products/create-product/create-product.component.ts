import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from './../../../services/product.service';
import { mimeType } from 'src/app/helper/mime-type.validator';

@Component({
    selector: 'app-create-product',
    templateUrl: './create-product.component.html',
    styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
    prodForm: FormGroup;
    imagePreview: string;
    startDate = new Date(2020, 0, 1);
    editableProdId: string;
    headerTitle = "New Product";
    
    product: any;

    constructor(
        public dialogRef: MatDialogRef<CreateProductComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private prodService: ProductService
    ) {}

    ngOnInit() {
        this.editableProdId = this.data.productId;
        this.initForm();
        this.data = {
            title: this.prodForm.controls.title,
            description: this.prodForm.controls.description,
            price: this.prodForm.controls.price,
            image: this.prodForm.controls.image,
            production_date: this.prodForm.controls.production_date,
            expire_date: this.prodForm.controls.expire_date
        };
        
        if(this.editableProdId) {
            this.setProductToForm(this.editableProdId);
            this.headerTitle = "Edit Product"
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    private initForm() {
        this.prodForm = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            price: ['', Validators.required],
            image: ['', Validators.required, mimeType.bind(this)],
            production_date: ['', Validators.required],
            expire_date: ['', Validators.required]
        });
    }

    setProductToForm(id: string) {
        this.prodService.finoneProduct(id).subscribe(response => {
            this.prodForm.patchValue(response.product)
        })
    }

    onImagePicked(event: Event) {
        const file = (event.target as HTMLInputElement).files[0];
        this.prodForm.patchValue({ image: file });
        this.prodForm.get('image').updateValueAndValidity();
        const reader = new FileReader();
        reader.onload = () => {
            this.imagePreview = reader.result as string;
        };
        reader.readAsDataURL(file);
    }
}
