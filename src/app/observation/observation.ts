import { Client } from "../client/client";

export interface Observation {

	id?:number;
    client?:Client;
    clientId?: number;
    observationType:string;
    content:string;

}
