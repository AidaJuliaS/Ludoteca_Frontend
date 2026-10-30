import { Component, OnInit, inject} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LoanEdit } from '../loan-edit/loan-edit';
import { LoanService } from '../loan.service';
import { Loan } from '../model/Loan'; 
import { GameService } from '../../game/game.service';
import { Game } from '../../game/model/game';
import { ClientService } from '../../client/client.service';
import { Client } from '../../client/model/Client';
import { Pageable } from '../../core/model/page/Pageable';
import { DialogConfirmationComponent } from '../../core/dialog-confirmation/dialog-confirmation';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-loan-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    CommonModule,
    MatPaginatorModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
],
  templateUrl: './loan-list.page.html',
  styleUrl: './loan-list.page.scss',
})
export class LoanList implements OnInit {

  protected readonly loanService = inject(LoanService);
  protected readonly gameService = inject(GameService);
  protected readonly clientService = inject(ClientService);
  protected readonly dialog = inject(MatDialog);

  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;

  games: Game[] = [];
  clients: Client[] = [];

  selectedGameId?: number;
  selectedClientId?: number;
  selectedDate?: Date;

  dataSource = new MatTableDataSource<Loan>();
  displayedColumns: string[] = ['id', 'game', 'client', 'dateStart', 'dateEnd', 'action'];

  ngOnInit(): void {
    this.gameService.getGames().subscribe((data) => {
      this.games = data;
    });

    this.clientService.getClients().subscribe((data) => {
      this.clients = data;
    });

    this.loadPage();
  }

  loadPage(event?: PageEvent) {
    const pageable: Pageable = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sort: [
        {
          property: 'id',
          direction: 'ASC'
        },
      ],
    };

    if (event != null) {
      pageable.pageSize = event.pageSize;
      pageable.pageNumber = event.pageIndex;
    }

    this.loanService.getLoans(pageable, this.selectedGameId, this.selectedClientId, this.selectedDate).subscribe((data) => {

      this.dataSource.data = data.content;
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;

    });
  }

  createLoan() {
    const dialogRef = this.dialog.open(LoanEdit, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadPage();
    });
  }

  editLoan(loan: Loan) {
    const dialogRef = this.dialog.open(LoanEdit, {
      data: { loan: loan },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadPage();
    });
  }

  deleteLoan(loan: Loan) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: {
        title: 'Eliminar préstamo',
        description: 'Atención si borra el préstamo se perderán sus datos.<br> ¿Desea eliminar el préstamo?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loanService.deleteLoan(loan.id).subscribe((result) => {
          this.loadPage();
        });
      }
    });
  }

  //Filtro
  onCleanFilter(): void {
    this.selectedGameId = undefined;
    this.selectedClientId = undefined;
    this.selectedDate = undefined;

    this.pageNumber = 0;

    this.loadPage();
  }
  
  onSearch(): void {

    this.pageNumber = 0;

    this.loadPage();
  }

}
