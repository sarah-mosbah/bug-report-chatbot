import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { map } from 'rxjs';
import { ChatBotService } from 'src/app/services/chatbot.service';

export interface Message {
  text: string;
  sender: 'bot' | 'user';
}
@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss'],
  standalone: true,
  imports: [CommonModule],
  providers: [ChatBotService],
})
export class ChatBotComponent {
  @ViewChild('input') input!: ElementRef;

  currentTime = new Date();
  messages = signal<Message[]>([]);
  chatBotService = inject(ChatBotService);

  sendChatBotMessage(message: string): void {
    this.currentTime = new Date();

    this.addNewMessageToConversation(message, 'user');
    this.input.nativeElement.value = '';

    this.chatBotService
      .sendMessage$(message)
      .pipe(map((chatbotResponse) => chatbotResponse.fulfillmentText))
      .subscribe((responseMessage) => {
        this.addNewMessageToConversation(responseMessage, 'bot');
      });
  }

  private addNewMessageToConversation(
    message: string,
    sender: 'user' | 'bot'
  ): void {
    this.messages.update((messages) => [
      ...messages,
      { text: message, sender },
    ]);
  }
}
