import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {path : "chat", component : ChatComponent, canActivate: [authGuard]},
    {path : "home", component : HomeComponent},
    {path : "", redirectTo : "/home", pathMatch : 'full',},
];
