import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { map } from 'rxjs';
import { ChatBotService } from 'src/app/services/chatbot.service';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss'],
  standalone: true,
  imports: [CommonModule],
  providers: [ChatBotService],
})
export class ChatBotComponent {
  response = signal<string | undefined>(undefined);
  chatBotService = inject(ChatBotService);

  sendChatBotMessage(message: string): void {
    this.chatBotService
      .sendMessage$(message)
      .pipe(map((chatbotResponse) => chatbotResponse.fulfillmentText))
      .subscribe((responseMessage) => {
        this.response.set(responseMessage);
      });
  }
}
