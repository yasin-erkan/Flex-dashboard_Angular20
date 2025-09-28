import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-subscribers',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './subscribers.html',
  styleUrl: './subscribers.css',
})
export class SubscribersComponent {}
