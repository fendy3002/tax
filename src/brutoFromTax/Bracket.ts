import * as types from './types';
export class Bracket implements types.BracketClass {
    constructor(firstBracket: types.bracket) {
        this.currentBracket = firstBracket;
        this.current = this.current.bind(this);
        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
    }
    currentBracket: types.bracket;
    current() {
        return this.currentBracket;
    }
    next() {
        this.currentBracket = this.currentBracket.next;
        return this.currentBracket;
    }
    prev() {
        this.currentBracket = this.currentBracket.prev;
        return this.currentBracket;
    }
};