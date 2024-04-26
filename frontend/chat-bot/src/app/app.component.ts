import { Component } from '@angular/core';
import { ChatBotComponent } from './components/chat-bot/chat-bot.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [ChatBotComponent, MatCardModule, CommonModule],
})
export class AppComponent {
  products = [
    {
      name: 'Product 1',
      category: 'Category 1',
      image: 'path/to/product1-image.jpg',
      description: 'Description of Product 1',
    },
    {
      name: 'Product 2',
      category: 'Category 2',
      image: 'path/to/product2-image.jpg',
      description: 'Description of Product 2',
    },
    {
      name: 'Product 3',
      category: 'Category 1',
      image: 'path/to/product3-image.jpg',
      description: 'Description of Product 3',
    },
    {
      name: 'Product 4',
      category: 'Category 2',
      image: 'path/to/product4-image.jpg',
      description: 'Description of Product 4',
    },
  ];
}
