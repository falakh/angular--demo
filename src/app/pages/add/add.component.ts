import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  editForm = this.formBuilder.group({
    quantity: new FormControl(0, {
      nonNullable: true,
    }),
    premiumPrice: new FormControl(0, {
      nonNullable: true,
    }),
    pertamaxPrice: new FormControl(0, {
      nonNullable: true,
    }),
  });
  constructor(
    private formBuilder: FormBuilder,
    private product: ProductService
  ) {}

  onSubmit(): void {
    // Process checkout data here
    this.product
      .addData({
        competitorPrice: this.editForm.value.pertamaxPrice ?? 0,
        price: this.editForm.value.premiumPrice ?? 0,
        quantity: this.editForm.value.quantity ?? 0,
      })
      .subscribe(() => {
        window.location.replace('/');
        alert('Success');
      });
  }
}
