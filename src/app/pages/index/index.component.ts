import { Component } from '@angular/core';
import { ProductService, IProduct } from 'src/app/services/product.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent {
  constructor(private cartService: ProductService) {}
  dataSource: IProduct[] = [];

  columns = [
    {
      columnDef: 'id',
      header: 'ID.',
      cell: (element: IProduct) => `${element.id}`,
      withDeleteButton: true,
    },
    {
      columnDef: 'quantity',
      header: 'Quantity',
      cell: (element: IProduct) => `${element.quantity}`,
    },
    {
      columnDef: 'Premium',
      header: 'Premium',
      cell: (element: IProduct) => `${element.price}`,
    },
    {
      columnDef: 'Pertamax',
      header: 'Pertamax',
      cell: (element: IProduct) => `${element.competitorPrice}`,
    },
  ];
  displayedColumns = this.columns.map((c) => c.columnDef);

  deleteProduct(id: number) {
    this.cartService.delete(id).subscribe(() => window.location.reload());
  }

  ngOnInit(): void {
    this.cartService
      .getItem()
      ?.subscribe((subsValue) => (this.dataSource = subsValue));
  }
}
