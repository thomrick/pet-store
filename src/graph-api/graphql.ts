
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class Cat {
    id?: string;
    name: string;
    adopted?: boolean;
}

export abstract class IQuery {
    abstract cat(id: string): Cat | Promise<Cat>;

    abstract cats(): Cat[] | Promise<Cat[]>;
}
