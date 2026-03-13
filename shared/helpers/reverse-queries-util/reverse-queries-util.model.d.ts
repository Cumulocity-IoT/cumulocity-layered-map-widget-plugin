export type TokenType = 'AND' | 'OR' | 'NOT' | 'LPAREN' | 'RPAREN' | 'OP' | 'IDENT' | 'NUMBER' | 'STRING' | 'COMMA' | 'EOF';
export interface Token {
    type: TokenType;
    value?: string;
}
export type AstNode = AndNode | OrNode | NotNode | ComparisonNode | HasNode | ByGroupIdNode;
export interface AndNode {
    type: 'and';
    nodes: AstNode[];
}
export interface OrNode {
    type: 'or';
    nodes: AstNode[];
}
export interface NotNode {
    type: 'not';
    node: AstNode;
}
export interface ComparisonNode {
    type: 'comparison';
    field: string;
    operator: 'eq' | 'lt' | 'le' | 'gt' | 'ge';
    value: string | number;
}
export interface HasNode {
    type: 'has';
    fragment: string;
}
export interface ByGroupIdNode {
    type: 'bygroupid';
    groupId: number;
}
export type QueryJson = {
    __and: QueryJson[];
} | {
    __or: QueryJson[];
} | {
    __not: QueryJson;
} | {
    __has: string;
} | {
    __bygroupid: number;
} | {
    [fragment: string]: unknown;
};
