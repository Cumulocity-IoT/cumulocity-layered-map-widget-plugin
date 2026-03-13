import { Token } from './reverse-queries-util.model';
export declare class Tokenizer {
    private input;
    private pos;
    constructor(input: string);
    next(): Token;
    private consume;
    private readString;
    private readNumber;
    private readIdentifierOrOperator;
}
