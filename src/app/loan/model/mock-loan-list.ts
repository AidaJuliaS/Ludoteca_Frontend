import { Loan } from "./Loan";
import { GAME_DATA } from "../../game/model/mock-games";
import { CLIENT_DATA } from "../../client/model/mock.clients";

export const LOAN_DATA_LIST : Loan[] = [ 
    
    { 
        id: 1, 
        game: GAME_DATA[0],
        client: CLIENT_DATA[0], 
        dateStart: new Date ('2027-01-01'), 
        dateEnd: new Date ('2027-01-06')  
    },  
    
    { 
        id: 2, 
        game: GAME_DATA[1],
        client: CLIENT_DATA[0],
        dateStart: new Date ('2027-01-02'), 
        dateEnd: new Date ('2027-01-14')  
    },  
    
    { 
        id: 3, 
        game: GAME_DATA [0], 
        client: CLIENT_DATA [0],
        dateStart: new Date ('2027-01-07'), 
        dateEnd: new Date ('2027-01-14')  
    },  
    
    { 
        id: 4, 
        game: GAME_DATA [2],
        client: CLIENT_DATA [1], 
        dateStart: new Date ('2027-01-01'), 
        dateEnd: new Date ('2027-01-09')  
    },  
    
    { 
        id: 5, 
        game: GAME_DATA [3],
        client: CLIENT_DATA [2],
        dateStart: new Date ('2027-01-01'), 
        dateEnd: new Date ('2027-01-10')  
    },  
]