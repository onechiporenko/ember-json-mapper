# Ember JSON Mapper

### What is it?
Small mapper for JSONs. It allows you to convert one object to another with minimal effort.

### Installing
````
bower i ember-json-mapper
````


### Usage examples
Basic
````javascript
var map = { a: 'a', c: 'b' };
var source = { a: 1, b: 2 };
var mapped = Ember.JsonMapper.map(source, map); // { a: 1, c: 2 }
````

Nested objects
````javascript
var map = { a: 'a', d: 'b.c' };
var source = { a: 1, b: { c: 2 } };
var ret = Ember.JsonMapper.map(source, map); // { a: 1, d: 2 }
````

Nested keys
````javascript
var map = { a: 'a', 'd.e': 'b' };
var source = { a: 1, b: 2 };
var ret = Ember.JsonMapper.map(source, map); // { a: 1, d: { e: 2 } }
````

Nested objects and nested keys
````javascript
var map = { a: 'a', 'd.e': 'b.c' };
var source = { a: 1, b: { c: 2 } };
var ret = Ember.JsonMapper.map(source, map); // { a: 1, d: { e: 2 } }
````

Objects as keys
````javascript
var map = { a: 'a', c: { key: 'b' } };
var source = { a: 1, b: 2 };
var mapped = Ember.JsonMapper.map(source, map); // { a: 1, c: 2 }
````

With default value
````javascript
var map = { a: 'a', c: { key: 'b', default: 3 } };
var source = { a: 1, b: 2 };
var mapped = Ember.JsonMapper.map(source, map); // { a: 1, c: 2 }
````

Set value without mapping from source
````javascript
var map = { a: 'a', c: { default: 3 } };
var source = { a: 1, b: 2 };
var mapped = Ember.JsonMapper.map(source, map); // { a: 1, c: 3 }
````