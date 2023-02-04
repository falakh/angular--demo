import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  editForm = this.formBuilder.group({
    quantity: 0,
    premiumPrice: 0,
    pertamaxPrice: 0,
  });
  produtcId = 0;
  constructor(
    private formBuilder: FormBuilder,
    private product: ProductService,
    private location: Location
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
        this.location.replace('/');
      });
  }
}
