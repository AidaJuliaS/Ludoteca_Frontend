import { Component, inject, OnInit, signal } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoanService } from '../loan.service';
import { Loan } from '../model/Loan';
import { GameService } from '../../game/game.service';
import { Game } from '../../game/model/game';
import { ClientService } from '../../client/client.service';
import { Client } from '../../client/model/Client';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { validateFields } from '../../core/helpers/validation.helper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-loan-edit',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
],
  templateUrl: './loan-edit.html',
  styleUrl: './loan-edit.scss'
  
})
export class LoanEdit implements OnInit{
  protected readonly loanService = inject(LoanService);
  protected readonly gameService = inject(GameService);
  protected readonly clientService = inject(ClientService);

  protected readonly dialogRef = inject(MatDialogRef<LoanEdit>);
  protected readonly data = inject(MAT_DIALOG_DATA);

  protected readonly id = signal<number | null>(null);
  protected readonly game = signal<Game | null>(null);
  protected readonly client = signal<Client | null>(null);
  protected readonly dateStart = signal<Date | null>(null);
  protected readonly dateEnd = signal<Date | null>(null);
  protected readonly errorMessage = signal<string | null> (null);

  readonly minDate = new Date();

  games: Game[] = [];
  clients: Client[] = [];

  loadFormData(initialData: Loan | null) {
    this.id.set(initialData?.id ?? null);
    this.game.set(initialData?.game ?? null);
    this.client.set(initialData?.client ?? null);
    this.dateStart.set(initialData?.dateStart ?? null);
    this.dateEnd.set(initialData?.dateEnd ?? null);
  }

  ngOnInit(): void {
    this.loadFormData(this.data.loan ?? null);
    this.gameService.getGames().subscribe(data => {
      this.games = data;
    });
    this.clientService.getClients().subscribe(data => {
      this.clients = data;
    });
  }

  onGameChange(id: number) {
    const game = this.games.find(g => g.id == id) ?? null;
    this.game.set(game);
  }

  onClientChange(id: number) {
    const client = this.clients.find(c => c.id == id) ?? null;
    this.client.set(client)
  }

  onSave() {

    this.errorMessage.set(null);

    const id = this.id();
    const game = this.game();
    const client = this.client();
    const dateStart = this.dateStart();
    const dateEnd = this.dateEnd();

    const requiredFields = ["game", "client", "dateStart", "dateEnd"] as const
    const data = { game, client, dateStart, dateEnd }

    if (!validateFields(data, requiredFields)) {
      return;
    }

    const loan = {
      id,
      game,
      client,
      dateStart,
      dateEnd,
    } as Loan;
    this.loanService.saveLoan(loan).subscribe({
      next: () => {
      this.dialogRef.close(true);
    },
    error: () => {
      this.errorMessage.set('La operación no es válida');
    }
  });
}

  onClose() {
    this.dialogRef.close(false);
  }
}
