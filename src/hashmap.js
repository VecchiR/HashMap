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
        } catch { return null; }
    }

    has(key) {
        const index = this.hash(key);
        return this.buckets[index].containsKey(key);
    }

    remove(key) {
        const bucketIndex = this.hash(key);
        const bucket = this.buckets[bucketIndex];
        const keyIndex = bucket.findKey(key);
        if (keyIndex != null) {
            bucket.removeAt(keyIndex);
            return true;
        }
        else { return false; }
    }

    length() {
        let count = 0;
        this.buckets.forEach((bucket) => {
            count += bucket.size();
        })
        return count;
    }

    clear() {
        for (let i = 0; i < this.buckets.length; i++) {
            this.buckets[i] = new LinkedList();
        }
    }

    keys() {
        let keys = [];
        this.buckets.forEach((bucket) => {
            for (let i = 0; i < bucket.size(); i++) {
                keys.push(bucket.at(i).key);
            }
        })
        return keys;
    }

    values() {
        let values = [];
        this.buckets.forEach((bucket) => {
            for (let i = 0; i < bucket.size(); i++) {
                values.push(bucket.at(i).value);
            }
        })
        return values;
    }

    entries() {
        let allEntries = [];
        this.buckets.forEach((bucket) => {
            for (let i = 0; i < bucket.size(); i++) {
                let entry = [];
                entry.push(bucket.at(i).key);
                entry.push(bucket.at(i).value);
                allEntries.push(entry);
            }
        })
        return allEntries;
    }

}

let hmap = new HashMap();

hmap.set('a', 'thisA') // hashes to 1
hmap.set('1', 'now1') // also hashes to 1
hmap.set('2', 'dis2') // hashes to 2
hmap.set('3', 'see3') // hashes to 3
hmap.set('4', 'c4') // hashes to 4
hmap.set('34', 'flla') // hashes to 1
hmap.set('oreo', 'flla') // hashes to 13


console.log(hmap);