import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'ck-content',
  templateUrl: './ck-content.component.html',
  styleUrls: ['./ck-content.component.css']
})
export class CkContentComponent implements OnInit {
  @Output() changeContent = new EventEmitter<string>();

  @Input()
  content:string = ''
  public Editor = DecoupledEditor as any;
  public editorConfig = {
      toolbar: {
        items: [
          'heading',
          '|',
          'fontFamily',
          'fontSize',
          '|',
          'fontColor',
          'fontBackgroundColor',
          '|',
          'bold',
          'italic',
          'underline',
          'strikethrough',
          '|',
          'alignment', // Đảm bảo rằng tùy chọn căn chỉnh có ở đây
          'indent',
          'outdent',
          '|',
          'bulletedList',
          'numberedList',
          '|',
          'link',
          'imageUpload',
          'blockQuote',
          'insertTable',
          '|',
          'undo',
          'redo'
        ]
      },
      image: {
        upload: {
          types: ['jpeg', 'png', 'gif', 'jpg']
        },
        resizeUnit: 'px',  // Đơn vị thay đổi kích thước là pixel
        resizeOptions: [
          { name: 'resizeImage:original', value: null, icon: 'original' },
          { name: 'resizeImage:50', value: '50', icon: 'small' },
          { name: 'resizeImage:75', value: '75', icon: 'medium' },
          { name: 'resizeImage:100', value: '100', icon: 'large' }]
      },
      ckfinder: {
        uploadUrl: environment.apiUrl + '/api/products/upload-editor',
      },
      fontFamily: {
        options: [
          'Arial',
          'Times New Roman',
          'Helvetica',
          'Courier New',
          'Roboto'
        ],
        default: 'Times New Roman'
      },
      fontSize: {
        options: [
          9,
          11,
          13,
          17,
          19,
          21
        ],
        default: 13
      },
      alignment: {
        options: ['left', 'right', 'center', 'justify'] // Đảm bảo bạn có các tùy chọn căn chỉnh
      },
      table: {
        contentToolbar: [
          'tableColumn',
          'tableRow',
          'mergeTableCells',
          'tableCellProperties',
          'tableProperties'
        ]
      }
    };
  constructor(private sanitizer: DomSanitizer ) { }
  ngOnInit(): void {
  }
  onReady(editor: any): void {
    const toolbarElement = editor.ui.view.toolbar.element;
    const editableElement = editor.ui.getEditableElement();
    editableElement.parentElement.insertBefore(toolbarElement, editableElement);
  }
  onContentChange(): void {
    this.changeContent.emit(this.content);
  }
}
