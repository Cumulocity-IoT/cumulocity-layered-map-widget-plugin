import { AstNode } from './reverse-queries-util.model';
import { Tokenizer } from './string-tokenizer';
export declare class QueryParser {
    private tokenizer;
    private current;
    private previousToken;
    constructor(tokenizer: Tokenizer);
    parse(): AstNode;
    private advance;
    private peek;
    private match;
    private expect;
    private parseOr;
    private parseAnd;
    private parseUnary;
    private parsePrimary;
    private parsePredicate;
    private parseLiteral;
}
