import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  editForm = this.formBuilder.group({
    quantity: 0,
    premiumPrice: 0,
    pertamaxPrice: 0,
  });
  produtcId = 0;
  constructor(
    private formBuilder: FormBuilder,
    private product: ProductService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((paramValue) => {
      this.product.getItem(paramValue['id']).subscribe((value) => {
        const id = value.find(
          (product) => product.id.toString() === paramValue['id']
        );
        this.produtcId = paramValue['id'];
        this.editForm.patchValue({
          pertamaxPrice: id?.competitorPrice,
          premiumPrice: id?.price,
          quantity: id?.quantity,
        });
      });
    });
  }

  onSubmit(): void {
    // Process checkout data here
    this.product
      .editData(this.produtcId, {
        competitorPrice: this.editForm.value.pertamaxPrice ?? 0,
        price: this.editForm.value.premiumPrice ?? 0,
        quantity: this.editForm.value.quantity ?? 0,
      })
      .subscribe(() => alert('Yee'));
    console.log(this.editForm.value);
  }
}
