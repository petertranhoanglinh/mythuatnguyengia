import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paging-custom',
  templateUrl: './paging-custom.component.html',
  styleUrls: ['./paging-custom.component.css']
})
export class PagingCustomComponent implements OnInit {

  @Input() length = 50; // Tổng số phần tử
  @Input() pageSize = 8; // Số phần tử trên mỗi trang
  @Input() pageIndex = 0; // Trang hiện tại
  @Input() maxVisiblePages = 5; // Số trang hiển thị tối đa

  @Output() pageChange = new EventEmitter<number>();

  totalPages: number = 0;
  pages: number[] = [];

  ngOnInit(): void {
    this.calculatePages();
  }

  ngOnChanges(): void {
    this.calculatePages();
  }

  calculatePages() {
    this.totalPages = Math.ceil(this.length / this.pageSize);
    this.updatePagination();
  }

  updatePagination() {
    let startPage = Math.max(0, this.pageIndex - Math.floor(this.maxVisiblePages / 2));
    let endPage = Math.min(this.totalPages - 1, startPage + this.maxVisiblePages - 1);

    if (endPage - startPage + 1 < this.maxVisiblePages) {
      startPage = Math.max(0, endPage - this.maxVisiblePages + 1);
    }

    this.pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }

  goToPage(index: number) {
    if (index < 0 || index >= this.totalPages) return;
    this.pageIndex = index;
    this.updatePagination();
    this.pageChange.emit(this.pageIndex);
  }
}
