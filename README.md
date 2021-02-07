# next-core-bundle

Augmented.js Next Core - Resource Bundle

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [ResourceBundle](#resourcebundle)
    -   [Parameters](#parameters)
    -   [\_fallback](#_fallback)
        -   [Properties](#properties)
    -   [\_bundle](#_bundle)
        -   [Properties](#properties-1)
    -   [\_delimiter](#_delimiter)
        -   [Properties](#properties-2)
    -   [get](#get)
        -   [Parameters](#parameters-1)
    -   [Properties](#properties-3)
    -   [Properties](#properties-4)
    -   [Properties](#properties-5)
-   [MessageKeyFormatter](#messagekeyformatter)
    -   [Parameters](#parameters-2)
    -   [format](#format)
        -   [Parameters](#parameters-3)
        -   [Properties](#properties-6)
    -   [format](#format-1)
        -   [Parameters](#parameters-4)
-   [MapFormatter](#mapformatter)
    -   [format](#format-2)
        -   [Parameters](#parameters-5)
        -   [Examples](#examples)

## ResourceBundle

ResourceBundle

### Parameters

-   `options`   (optional, default `{}`)

### \_fallback

#### Properties

-   `fallback` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Is fallback support enabled

### \_bundle

#### Properties

-   `bundle` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** The bundle used

### \_delimiter

#### Properties

-   `delimiter` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The key delimiter (if fallback is enabled)

### get

Get a string from the bundle

#### Parameters

-   `key` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The key to find in the bundle

## 

### Properties

-   `locale` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The locale

## 

### Properties

-   `language` **language** The language

## 

### Properties

-   `country` **country** The country

## MessageKeyFormatter

<p>MessageKeyFormatter<br/>

Concatenate the pieces of the message together if a portion of the key is
missing, the rest of the key is ignored. <em>ex. if the "rule" attribute is
missing, then the key will return with the message.level + message.kind only</em></p>

### Parameters

-   `options`   (optional, default `{}`)

### format

Key Delimiter

#### Parameters

-   `message`   (optional, default `{}`)

#### Properties

-   `delimiter` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The delimter used to seperate each key

### format

Format a key for a message

#### Parameters

-   `message` **message** The message to format (optional, default `{}`)

Returns **any** The key to lookup in a bundle

## MapFormatter

MapFormatter - maps a JSON object of keys to new text

### format

Replaces a string with replacedment test from a JSON object.  
Will replace all instances marked withthe key name

#### Parameters

-   `message` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The original string
-   `replacements` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Object with replacement strings

#### Examples

```javascript
const message = MapFormatter.format("This is a test of {ebs}.", { "ebs": "the Emergency Broadcast System" });
```

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Returns the string with replaced text
