import { Injectable, inject} from "@angular/core";
import { Observable } from "rxjs";
import { Pageable } from "../core/model/page/Pageable";
import { Loan } from "./model/Loan";
import { PaginatedData } from "../core/model/page/PaginatedData";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'    
})
export class LoanService {
    protected readonly http = inject(HttpClient);

    private baseUrl = 'http://localhost:8080/loan';

    getLoans (
        pageable: Pageable,
        gameId?: number,
        clientId?: number,
        date?: Date
    ): Observable<PaginatedData<Loan>> {

        return this.http.post<PaginatedData<Loan>>(this.baseUrl, { 
            gameId,
            clientId,
            date: date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`: undefined,
            pageable
        });
    }

    saveLoan(loan: Loan): Observable<Loan> {
        const { id } = loan;
        const url = id? `${this.baseUrl}/${id}`: this.baseUrl;
        return this.http.put<Loan>(url, loan);
    }

    deleteLoan(idLoan: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${idLoan}`);
    }

    getAllLoans(): Observable<Loan[]> {
        return this.http.get<Loan[]>(this.baseUrl);
    }
}
