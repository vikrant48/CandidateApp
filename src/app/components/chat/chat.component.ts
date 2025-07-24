import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  chatForm: FormGroup;
  responseMessage: string = '';
  isLoading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private chatService: ChatService) {
    this.chatForm = this.fb.group({
      message: ['', Validators.required],
    });
  }

  onSubmit(): void {
  if (this.chatForm.invalid) return;

  this.isLoading = true;
  this.responseMessage = '';
  this.errorMessage = '';

  const userMessage = this.chatForm.value.message;

  this.chatService.sendMessage(userMessage).subscribe({
    next: (res: any) => {
      try {
        // Parse Gemini's response if needed (as string or already JSON)
        const parsed = typeof res === 'string' ? JSON.parse(res) : res;
        this.responseMessage =
          parsed?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini.';
      } catch (e) {
        this.responseMessage = typeof res === 'string' ? res : JSON.stringify(res);
      }
      this.isLoading = false;
    },
    error: (err) => {
      this.errorMessage = err.error?.error?.message || 'Something went wrong.';
      this.isLoading = false;
    }
  });
}

}
