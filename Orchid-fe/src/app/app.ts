import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './components/upload/upload';

@Component({
  selector: 'app-root',
  standalone: true, // ✅ this line is REQUIRED
  imports: [RouterOutlet, HttpClientModule, CommonModule, UploadComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = signal('Orchid-fe');
}
