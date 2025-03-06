// video-list.component.ts
import { Component, Sanitizer } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SwiperService } from 'src/app/service/swiper.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent {
  videos = [
    { id: 'dQw4w9WgXcQ' },
    { id: '3JZ_D3ELwOQ' },
    { id: '2Vv-BfVoq4g' },
    { id: 'L_jWHffIx5E' },
    { id: 'kJQP7kiw5Fk' },
    { id: 'kJQP7kiw5Fk' },
    { id: 'kJQP7kiw5Fk' }
  ];
  isVideoLoaded = false;

  trustedUrl: SafeResourceUrl;


  constructor(private sanitizer: DomSanitizer ,private swiperService: SwiperService) {
    this.trustedUrl = this.getSafeUrl(this.videos[0].id);
  }

  ngAfterViewInit() {
    this.swiperService.createSwiper('video-swiper', {
      slidesPerView: 2, // Mặc định hiển thị 2 video
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      grabCursor: true, // Hiệu ứng chuột cầm nắm
      allowTouchMove: true, // Cho phép vuốt trên mobile
      breakpoints: {
        320: { slidesPerView: 1.2, spaceBetween: 5 }, // Điện thoại nhỏ
        480: { slidesPerView: 2, spaceBetween: 10 }, // Điện thoại trung bình
        768: { slidesPerView: 3, spaceBetween: 15 }, // Tablet
        1024: { slidesPerView: 4, spaceBetween: 20 }, // Laptop
      },
    });
  }



  playVideo(videoId: string) {
    this.trustedUrl = this.getSafeUrl(videoId);
    this.isVideoLoaded = false;
  }

  private getSafeUrl(videoId: string): SafeResourceUrl {
    this.isVideoLoaded = true;
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
  }
}
