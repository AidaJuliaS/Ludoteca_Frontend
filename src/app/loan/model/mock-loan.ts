import { PaginatedData } from "../../core/model/page/PaginatedData";
import { Loan } from "./Loan";
import { LOAN_DATA_LIST } from "./mock-loan-list";

export const LOAN_DATA: PaginatedData<Loan> = {
    content: LOAN_DATA_LIST, 
    pageable: {
        pageSize: 5,
        pageNumber: 0,
        sort: [
            {
                property: 'id',
                direction: 'ASC'
            }
        ]
    },
    totalElements: 5
};