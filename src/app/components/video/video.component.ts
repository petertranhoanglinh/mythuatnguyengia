// video.component.ts
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  videos: Video[] = [
    {
      id:   '../../../assets/video/6349499914477.mp4',
      title: 'Video Tranh Tường 1',
      description: 'Mô tả ngắn về video 1',
      thumbnail: '../../../assets/hinh/z6348903745611_dbdefa74a73aac356fd4ec112bcc285b.jpg'
    },
    {
      id:   '../../../assets/video/6349500151111.mp4',
      title: 'Video Tranh Tường 2',
      description: 'Mô tả ngắn về video 2',
      thumbnail: '../../../assets/hinh/z6348903759292_0bb558a2e90c6e890c386205f7eb94c8.jpg'
    },
    {
      id:   '../../../assets/video/6349497873634.mp4',
      title: 'Video Tranh Tường 3',
      description: 'Mô tả ngắn về video 3',
     thumbnail: '../../../assets/hinh/z6348903755964_369d5de2822a8cf705bc8d19e2152080.jpg'
    },
    {
      id:   '../../../assets/video/6349500494127.mp4',
      title: 'Video Tranh Tường 4',
      description: 'Mô tả ngắn về video 3',
      thumbnail: '../../../assets/hinh/z6348903773099_9d11a98017d61cb8093866432dec88b9.jpg'
    },
    {
      id:   '../../../assets/video/6349500847689.mp4',
      title: 'Video Tranh Tường 5',
      description: 'Mô tả ngắn về video 3',
      thumbnail: '../../../assets/hinh/z6348903773099_9d11a98017d61cb8093866432dec88b9.jpg'
    },
    {
      id:   '../../../assets/video/6349501209736.mp4',
      title: 'Video Tranh Tường 6',
      description: 'Mô tả ngắn về video 3',
       thumbnail: '../../../assets/hinh/z6348903818076_cf9f80792855c0dfc41c57978ba5f487.jpg'
    }
  ];

  loadedVideos: { [key: string]: boolean } = {};

  constructor() { }

  ngOnInit(): void {
    // Khởi tạo tất cả video là chưa load
    this.videos.forEach(video => {
      this.loadedVideos[video.id] = false;
    });
  }

  loadVideo(videoId: string): void {
    this.loadedVideos[videoId] = true;
  }

  getVideoUrl(videoId: string): string {
    return videoId;
   //return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }
}
