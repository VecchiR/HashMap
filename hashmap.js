//LIMITATION: Use the following snippet whenever you access a bucket through an index. 
//We want to throw an error if we try to access an out of bound index:

// if (index < 0 || index >= buckets.length) {
//     throw new Error("Trying to access index out of bound");
//   }


class HashMap {
    constructor() {
        this.buckets = Array(16);
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
        const index = this.hash(key);

        // if(!this.buckets[index]){
        //     this.buckets[index] = [];
        // }
        // this.buckets[index].push({ key, value }); //legal, mas se fizer 2 vezes a mesma key, duplica

        this.buckets[index] = { key, value }; //legal tb, mas só aceita 1 par
    }

    get(key) {
        const index = this.hash(key);
        return this.buckets[index].key === key ? this.buckets[index].value : null;
    }

    has(key) {
        const index = this.hash(key);
        return this.buckets[index].key === key;
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

hmap.set('oreo', 'hello')
hmap.set('1', 'hello')
hmap.set('2', 'hello')
hmap.set('3', 'hello')
hmap.set('4', 'hello')

console.log(hmap);

/* até aqui, tudo 'funciona', mas SÓ CABE 1 KEY-VALUE PAIR em cada bucket
1 - transformar cada bucket numa linked-list  p/ acomodar mais pares
2 - refactor all functions based on this new behavior
3 - GROWING. (capcity, load factor...) */