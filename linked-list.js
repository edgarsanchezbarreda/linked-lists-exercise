/** Node: node for a singly linked list. */

class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

/** LinkedList: chained together nodes. */

class LinkedList {
    constructor(vals = []) {
        this.head = null;
        this.tail = null;
        this.length = 0;

        for (let val of vals) this.push(val);
    }

    get(idx) {
        let current = this.head;
        let count = 0;

        while (current !== null && count !== idx) {
            count += 1;
            current = current.next;
        }

        return current;
    }

    /** push(val): add new value to end of list. */

    push(val) {
        const newNode = new Node(val);
        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this.length += 1;
    }

    /** unshift(val): add new value to start of list. */

    unshift(val) {
        const newNode = new Node(val);
        const currentHead = this.head;
        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;
        } else {
            this.head = newNode;
            this.head.next = currentHead;
        }

        this.length += 1;
    }

    /** pop(): return & remove last item. */

    pop() {
        const currentHead = this.head;
        const currentTail = this.tail;

        if (this.length === 0) throw new Error('Error, nothing to pop');

        if (this.length === 1) {
            this.tail = null;
            this.head = null;
            this.length -= 1;
            return currentTail.val;
        } else {
            while (currentHead !== null) {
                if (currentHead.next.val === this.tail.val) {
                    this.tail = currentHead;
                    this.length -= 1;
                    return currentTail.val;
                } else {
                    currentHead = currentHead.next;
                }
            }
        }
    }

    /** shift(): return & remove first item. */

    shift() {
        const currentHead = this.head;

        if (this.length === 0) throw new Error('Error, nothing to shift');

        if (this.length === 1) {
            this.tail = null;
            this.head = null;
            this.length -= 1;
            return currentHead;
        } else {
            this.head = currentHead.next.val;
            this.length -= 1;
            return currentHead.val;
        }
    }

    /** getAt(idx): get val at idx. */

    getAt(idx) {
        if (idx < 0 || idx >= this.length) {
            throw new Error('Invalid Index');
        }

        return this.get(idx).val;
    }

    /** setAt(idx, val): set val at idx to val */

    setAt(idx, val) {
        if (idx < 0 || idx >= this.length) {
            throw new Error('Invalid Index');
        }

        let selectedVal = this.get(idx);
        selectedVal.val = val;
        return selectedVal;
    }

    /** insertAt(idx, val): add node w/val before idx. */

    insertAt(idx, val) {
        // Throw error if index is less than 0 or if greater than the list length
        if (idx < 0 || idx > this.length) {
            throw new Error('Invalid index');
        }

        // if index is the length of the list, than insert value at the tail
        if (idx === this.length) return this.push(val);
        // if index is 0, insert value at the head
        if (idx === 0) return this.unshift(val);

        // Node directly before chosen index
        let prev = this.get(idx - 1);

        let newNode = new Node(val);

        // Set the 'next' value of the new node to the node that it is replacing.
        // Set the 'next', value of the previous node to the new node
        newNode.next = prev.next;
        prev.next = newNode;
        this.length += 1;
    }

    /** removeAt(idx): return & remove item at idx, */

    removeAt(idx) {
        // Throw error if index is not valid, or if list is empty
        if (idx < 0 || idx >= this.length || this.length === 0) {
            throw new Error('Invalid Index');
        }

        // if index is in last position, call the pop() method
        if (idx === this.length - 1) return this.pop();

        // if index is in first position, call the shift() method
        if (idx === 0) return this.shift();

        // Node directly before chosen index
        let prev = this.get(idx - 1);
        let current = this.get(idx);

        prev.next = current.next;
        return current.val;
    }

    /** average(): return an average of all values in the list */

    average() {
        // If list is not empty, iterate through list.
        if (this.length > 0) {
            // Keeps track of current item in list while iterating
            let currentHead = this.head;

            // Current round of iterating through list
            let count = 0;
            // Sum of all values in list
            let sum = 0;

            while (count < this.length) {
                sum += currentHead.val;
                count += 1;
                currentHead = currentHead.next;
            }

            return sum / this.length;
        }

        // return 0 if list is empty
        return 0;
    }
}

module.exports = LinkedList;
