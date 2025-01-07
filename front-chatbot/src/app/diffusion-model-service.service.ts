import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StableDiffusionService {
  private API_URL = 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3-medium-diffusers';
  private API_KEY = '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';
  public messageHistory: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  async generateImage(prompt: string): Promise<string | void> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.API_KEY}`);

    this.messageHistory.next({
      from: 'user',
      message: prompt
    });

    try {
      const response = await this.http.post(this.API_URL, 
        { inputs: prompt },
        { 
          headers: headers,
          responseType: 'blob'
        }
      ).toPromise();

      if (response) {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
          reader.onloadend = () => {
            const base64data = reader.result as string;
            this.messageHistory.next({
              from: 'bot',
              message: base64data
            });
            resolve(base64data);
          };
          reader.onerror = reject;
          reader.readAsDataURL(response);
        });
      } else {
        // Handle case where response is falsy
        throw new Error("No response received");
      }
    } catch (error: unknown) {
      let errorMessage = 'Unknown error';
      
      if (error instanceof HttpErrorResponse) {
        errorMessage = error.error?.error || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      console.error('Error generating image:', error);
      this.messageHistory.next({
        from: 'bot',
        message: errorMessage,
        error: true
      });
      throw error; // Ensure to throw the error to indicate failure
    }
}
}