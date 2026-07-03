/*
LRU (Least Recently Used) Cache - Implementation Steps

1. Create an LRUCache class.
   - Store the maximum cache capacity.
   - Use a Map to store key-value pairs.

2. Why Map?
   - Maintains insertion order.
   - Provides O(1) get(), set(), and delete() operations.

3. Implement get(key)
   - Check if the key exists.
   - If not, return -1.
   - If it exists:
     - Get the value.
     - Delete the key from the Map.
     - Insert it again so it becomes the most recently used.
     - Return the value.

4. Implement put(key, value)
   - If the key already exists:
     - Delete the old entry.
   - Insert the new key-value pair.
   - The newly inserted key becomes the most recently used.

5. Handle capacity overflow
   - If the cache size exceeds the capacity:
     - Remove the first key in the Map.
     - The first key is the least recently used item.

6. Time Complexity
   - get()  -> O(1)
   - put()  -> O(1)

Example:
Capacity = 3

put(1)
Map: [1]

put(2)
Map: [1, 2]

put(3)
Map: [1, 2, 3]

get(2)
Map: [1, 3, 2]   // 2 becomes most recently used

put(4)
Map: [3, 2, 4]   // 1 is removed (Least Recently Used)
*/

class Node {
    // prev <-- [key, value] --> next
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class LRUCacheAdvance {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
        this.head = new Node(0, 0);
        this.tail = new Node(0, 0);

        // Head <------> Tail
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    get(key) {
        if (!this.cache.get(key)) return -1;
        const node = this.cache.get(key);
        this._deleteNode(node);
        this._addNode(node);
        return node.value;
    }
    put(key, value) {
        if (this.cache.has(key)) {
            const oldNode = this.cache.get(key);
            oldNode.value = value;
            this._remove(oldNode);
            this._addNode(oldNode);
        } else {
            const newNode = new Node(key, value);
            this.cache.set(key, newNode);
            this._addNode(newNode);
            if (this.cache.size > this.capacity) {
                const lru = this._removeTail();
                this.cache.delete(lru.key);
            }
        }
    }
    _addNode(node) {
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next.prev = node;
        this.head.next = node;
    }
    _deleteNode(node) {
        node.next.prev = node.prev
        node.prev.next = node.next
    }
    _removeTail() {
        const res = this.tail.prev;
        this._deleteNode(res);
        return res;
    }
}

const lru = new LRUCacheAdvance(3);
lru.put(1, 1);
lru.put(2, 22);
lru.put(3, 32);

console.log(lru.get(2));
console.log(lru.get(1));

lru.put(4, 42);
lru.put(5, 52);

console.log(lru);

console.log("------------------------------------")
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map(); // Preserve insertion order
    }

    get(key) {
        if (!this.cache.get(key)) return -1;

        let value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);

        return value;
    }

    put(key, value) {
        if (this.cache.get(key)) {
            this.cache.delete(key);
        }

        this.cache.set(key, value);

        if (this.cache.size > this.capacity) {
            // Remove least recently used item
            let firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
    }
}

const cache = new LRUCache(3);
cache.put(1, 1);
cache.put(2, 22);
cache.put(3, 32);

console.log(cache.get(2));
console.log(cache.get(1));

cache.put(4, 42);
cache.put(5, 52);

console.log(cache);