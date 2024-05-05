import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { HlmSkeletonComponent } from '@spartan-ng/ui-skeleton-helm';
import { ChatBotService } from 'src/app/services/chatbot.service';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
export interface Message {
  text: string;
  sender: 'bot' | 'user';
}
@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss'],
  standalone: true,
  imports: [CommonModule, HlmSkeletonComponent, HlmButtonDirective],
  providers: [ChatBotService],
})
export class ChatBotComponent {
  @ViewChild('input') input!: ElementRef;

  browsers: string[] = [];
  currentTime = new Date();
  messages = signal<Message[]>([
    {
      text: "We're sorry that you encountered a bug! please provide us a detailed description so we can help",
      sender: 'bot',
    },
  ]);
  chatBotService = inject(ChatBotService);
  loading: boolean = true;
  browserType: string | undefined;

  constructor() {
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }

  sendChatBotMessage(message: string): void {
    this.currentTime = new Date();

    this.addNewMessageToConversation(message, 'user');
    this.input.nativeElement.value = '';

    this.chatBotService.sendMessage$(message).subscribe((responseMessage) => {
      for (const iterator of responseMessage.fulfillmentMessages) {
        if (
          iterator.payload &&
          iterator.payload.fields &&
          iterator.payload.fields.browsers &&
          !this.browsers.length
        ) {
          this.browsers = iterator.payload.fields.browsers.listValue.values.map(
            (value: { stringValue: string; kind: string }) => value.stringValue
          );
        }
      }
      this.addNewMessageToConversation(responseMessage.fulfillmentText, 'bot');
    });
  }
  onClickBrowserType(browser: string) {
    this.browserType = browser;
    this.browsers = [];
    this.sendChatBotMessage(browser);
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
