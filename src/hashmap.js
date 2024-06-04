//LIMITATION: Use the following snippet whenever you access a bucket through an index. 
//We want to throw an error if we try to access an out of bound index:

// if (index < 0 || index >= buckets.length) {
//     throw new Error("Trying to access index out of bound");
//   }

import { Node, LinkedList } from "./hash-linked-lists.js";

class HashMap {
    constructor() {
        this.buckets = Array(16);
        for (let i = 0; i < this.buckets.length; i++) {
            this.buckets[i] = new LinkedList();
        }
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
            hashCode = hashCode % this.buckets.length;
        }
        return hashCode;
    }

    set(key, value) {
        const bucketIndex = this.hash(key);
        const bucket = this.buckets[bucketIndex];
        try {
            const keyIndex = bucket.findKey(key);
            bucket.at(keyIndex).key = key;
            bucket.at(keyIndex).value = value;
        } catch { bucket.append(key, value); }
    }

    get(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        try {
            return bucket.at(bucket.findKey(key)).value;
        } catch {return null;}
    }

    has(key) {
        const index = this.hash(key);
        return this.buckets[index].containsKey(key);
    }

    remove(key) {
        const index = this.hash(key);
        if (this.buckets[index].key === key) {
            delete this.buckets[index];
            return true;
        }
        else { return false; }
    }

    length() {
        let count = 0;
        this.buckets.forEach((bucket) => {
            bucket.key ? count++ : false;
        })
        return count;
    }

    clear() {
        this.buckets = Array(16);
    }

    keys() {
        let keys = [];
        this.buckets.forEach((bucket) => {
            bucket.key ? keys.push(bucket.key) : false;
        })
        return keys;
    }

    values() {
        let values = [];
        this.buckets.forEach((bucket) => {
            bucket.value ? values.push(bucket.value) : false;
        })
        return values;
    }

    entries() {
        let allEntries = [];
        this.buckets.forEach((bucket) => {
            let entry = [];
            try {
                entry.push(bucket.key);
                entry.push(bucket.value);
                allEntries.push(entry);
            } catch {
                false;
            }
        })
        return allEntries;
    }

}

let hmap = new HashMap();

// hmap.set('a', 'hello') // hashes to 1
// hmap.set('1', 'hello') // also hashes to 1
// hmap.set('2', 'hello') // hashes to 2
// hmap.set('3', 'hello') // hashes to 3
// hmap.set('4', 'hello') // hashes to 4

console.log(hmap);