import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { map, tap } from 'rxjs';
import { ChatBotService } from 'src/app/services/chatbot.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
  messages = signal<Message[]>([
    {
      text: "We're sorry that you encountered a bug! please provide us a detailed description so we can help",
      sender: 'bot',
    },
  ]);
  chatBotService = inject(ChatBotService);

  sendChatBotMessage(message: string): void {
    this.currentTime = new Date();

    this.addNewMessageToConversation(message, 'user');
    this.input.nativeElement.value = '';

    this.chatBotService
      .sendMessage$(message)

      .subscribe((responseMessage) => {
        for (const iterator of responseMessage.fulfillmentMessages) {
          if (
            iterator.payload &&
            iterator.payload.fields &&
            iterator.payload.fields.browsers
          ) {
            console.log(
              'iterator.payload.browsers',
              iterator.payload.fields.browsers
            );
          }
        }
        this.addNewMessageToConversation(
          responseMessage.fulfillmentText,
          'bot'
        );
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
