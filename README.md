# react-json-to-html

[![npm version](https://badge.fury.io/js/react-json-to-html.svg)](https://badge.fury.io/js/react-json-to-html)

A simple React component that renders an HTML table from a JSON object.

> **Note**
>
> This version fully supports rendering nested JSON structures within arrays, ensuring complex data sets display correctly without additional configuration.

## Demo

Explore the interactive demo at [mohsalsaleem.github.io/react-json-to-html](https://mohsalsaleem.github.io/react-json-to-html/).

## Installation

Use your preferred package manager to install the published package:

```bash
npm install @mohsalsaleem/react-json-to-html
# or
yarn add @mohsalsaleem/react-json-to-html
# or
pnpm add @mohsalsaleem/react-json-to-html
```

## Usage

A simple example. Download and run the demo for more examples, or browse the [examples here](https://mohsalsaleem.github.io/react-json-to-html/).

```js
import React from 'react';
import { JsonTable } from '@mohsalsaleem/react-json-to-html';

const json = {
  "Server Name": "foo",
  "Description": "bar",
  "Specs": {
    "IP": "10.100.99.101",
    "MAC": "00:0a:XX:9F:XX:16"
  },
  "Date": "Jan 1, 2018"
};

const Nested = () => <JsonTable json={json} />;

export default Nested;
```
![alt tag](https://user-images.githubusercontent.com/9720835/35484781-f5faabd0-0422-11e8-9144-b622394f96a1.png)


## JsonTable props
| Name         | Type     | Required | Default                 | Possible Values         | Description     |
| ------------ | -------- | -------- | ----------------------- | ----------------------- | --------------- |
| json         | [Object] | Yes      | undefined               | Any valid JSON object   | The JSON that will get rendered as HTML table   |
| css          | [Object] | No       | see the Css JSON below  | Css as JS               | Some CSS attributes that can be overridden |
| indent       | Integer  | No       | 3                        | Any positive number    | Number of non breaking spaces for indentation of nested attributes |
 
## Css variables

The below CSS variables can be passed in as JS via the `css` prop. These are the default values, but can be overriden.

```
const Css = {
  jsonTr: {
    height: '25px'
  },
  jsonTd: {
    padding: '5px',
    borderSpacing: '2px',
    borderRadius: '5px'
  },
  rowSpacer: {
    height: '2px'
  },
  rootElement: {
    padding: '5px',
    borderSpacing: '2px',
    backgroundColor: '#BBBBBB',
    fontWeight: 'bold',
    fontFamily: 'Arial',
    borderRadius: '5px'
  },
  subElement: {
    padding: '5px',
    borderSpacing: '2px',
    backgroundColor: '#DDDDDD',
    fontWeight: 'bold',
    fontFamily: 'Arial',
    borderRadius: '5px'
  },
  dataCell: {
    borderSpacing: '2px',
    backgroundColor: '#F1F1F1',
    fontFamily: 'Arial',
    borderRadius: '5px'
  }
}
```


## Download Examples

```js
git clone https://github.com/mohsalsaleem/react-json-to-html.git
cd react-json-to-html
npm install
gulp demo
Browse http://localhost:8080
```

## Backlog
1. Add more props to control styling and CSS
2. More tests
