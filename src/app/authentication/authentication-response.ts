import { User } from "../user/user";

export interface AuthenticationResponse {
    
    token:string;
    userAccount:User;

}
