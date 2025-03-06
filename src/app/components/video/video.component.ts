// video-list.component.ts
import { Component, Sanitizer } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
    { id: 'kJQP7kiw5Fk' }
  ];
  isVideoLoaded = false;

  trustedUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.trustedUrl = this.getSafeUrl(this.videos[0].id);
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
