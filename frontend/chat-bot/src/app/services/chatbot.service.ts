import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ChatBotService {
  private readonly server = environment.apiGateway;
  constructor(private readonly httpClient: HttpClient) {}

  sendMessage$(text: string): Observable<any> {
    return this.httpClient.post(`${this.server}/df_text_query`, { text });
  }
}
