// upload-multi-image.component.ts
import { Component, EventEmitter, Input, OnInit, OnChanges, SimpleChanges, Output, ViewChild } from '@angular/core';

export interface ImageUploadResult {
  newFiles: File[];
  existingUrls: string[];
  removedUrls: string[];
}

interface FileWithPreview {
  file: File;
  preview: string | ArrayBuffer;
}

@Component({
  selector: 'app-upload-multi-image',
  templateUrl: './upload-muti-image.component.html',
  styleUrls: ['./upload-muti-image.component.css']
})
export class UploadMutiImageComponent implements OnInit, OnChanges {
  @Input() isShowPreview: boolean = true;
  @Input() existingImages: string[] = [];
  @Input() maxFileSize: number = 5; // In MB
  @Input() maxFiles: number = 10;
  @Input() acceptedFileTypes: string[] = ['image/jpeg', 'image/png', 'image/gif'];

  @Output() filesChange = new EventEmitter<ImageUploadResult>();
  @Output() error = new EventEmitter<string>();

  @ViewChild('multiFileInput') multiFileInput: any;

  files: FileWithPreview[] = [];
  removedImages: string[] = [];
  isDragging: boolean = false;
  errors: string[] = [];
  private currentExistingImages: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.currentExistingImages = [...this.existingImages];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['existingImages'] &&
        !changes['existingImages'].firstChange &&
        JSON.stringify(changes['existingImages'].currentValue) !==
        JSON.stringify(changes['existingImages'].previousValue)) {
      this.resetComponent();
      this.currentExistingImages = [...this.existingImages];
    }
  }

  private resetComponent(): void {
    this.files = [];
    this.removedImages = [];
    this.errors = [];
    if (this.multiFileInput) {
      this.multiFileInput.nativeElement.value = null;
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    const files = event.dataTransfer?.files;
    if (files) {
      this.processFiles(files);
    }
  }

  onFilesChange(event: any): void {
    const files = event.target.files;
    if (files) {
      this.processFiles(files);
    }
  }

  private async processFiles(fileList: FileList): Promise<void> {
    const additionalFiles: File[] = Array.from(fileList);
    const totalFiles = this.files.length + this.currentExistingImages.length + additionalFiles.length;

    if (totalFiles > this.maxFiles) {
      this.showError(`Chỉ được phép tải lên tối đa ${this.maxFiles} hình ảnh`);
      return;
    }

    for (const file of additionalFiles) {
      // Kiểm tra kích thước
      if (file.size > this.maxFileSize * 1024 * 1024) {
        this.showError(`File ${file.name} vượt quá ${this.maxFileSize}MB`);
        continue;
      }

      // Kiểm tra định dạng
      if (!this.acceptedFileTypes.includes(file.type)) {
        this.showError(`File ${file.name} không đúng định dạng. Chấp nhận: ${this.acceptedFileTypes.join(', ')}`);
        continue;
      }

      try {
        const preview = await this.readFileAsDataURL(file);
        this.files.push({ file, preview });
      } catch (error) {
        this.showError(`Không thể đọc file ${file.name}`);
      }
    }

    this.emitChanges();
  }

  private readFileAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          resolve(reader.result as string);
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  }

  removeImage(index: number, isExisting: boolean): void {
    if (isExisting) {
      // Ensure you're removing from existing images
      const removedUrl = this.currentExistingImages[index];
      this.removedImages.push(removedUrl);
      this.currentExistingImages.splice(index, 1);
    } else {
      // Ensure you're removing from new files
      this.files.splice(index, 1);
    }
    this.emitChanges();
  }

  clearAllImages(): void {
    this.removedImages = [...this.removedImages, ...this.currentExistingImages];
    this.currentExistingImages = [];
    this.files = [];
    if (this.multiFileInput) {
      this.multiFileInput.nativeElement.value = null;
    }
    this.emitChanges();
  }

  private emitChanges(): void {
    this.filesChange.emit({
      newFiles: this.files.map(f => f.file),
      existingUrls: this.currentExistingImages,
      removedUrls: this.removedImages
    });
  }

  private showError(message: string): void {
    this.errors = [...this.errors, message];
    this.error.emit(message);
    setTimeout(() => {
      this.errors = this.errors.filter(e => e !== message);
    }, 3000);
  }
}