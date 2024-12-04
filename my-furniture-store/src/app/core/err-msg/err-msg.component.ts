import { Component, OnInit, signal } from '@angular/core';
import { ErrMsgService } from './err-msg.service';

@Component({
  selector: 'app-err-msg',
  standalone: true,
  imports: [],
  templateUrl: './err-msg.component.html',
  styleUrl: './err-msg.component.css',
})
export class ErrMsgComponent implements OnInit {
  errMsg = signal('');
  constructor(private errMsgService: ErrMsgService) {}
  ngOnInit(): void {
    this.errMsgService.apiError$.subscribe((err: any) => {
      this.errMsg.set(err?.message);
    });
  }
}
