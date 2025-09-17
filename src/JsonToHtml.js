import Css from './Css';

var JsonToHtml = (function() {
  var html = '';
  var level = 0;
  var rootStyle = "";
  var suffix = '&nbsp;&nbsp;';
  var colspan = 2;
  var jsonObjOrig; 
  var subLevel = 0;
  var componentLevel = 0;
  var cssProp = {};
  var indentProp = 3;
  let trStyles = "";
  let tdStyles = "";
  let spacerStyles = "";
  let subElementStyles = "";
  let dataCellStyles = "";
  let rootElementStyles = "";

  var getTable = function(jsonObj, css, indent) {
    cssProp = css || {};
    indentProp = indent || 3;
    validateProps(jsonObj, cssProp, indentProp);
    trStyles = getStyleAttributes('jsonTr');
    tdStyles = getStyleAttributes('jsonTd');
    spacerStyles = getStyleAttributes('rowSpacer');
    subElementStyles = getStyleAttributes('subElement');
    dataCellStyles = getStyleAttributes('dataCell');
    rootElementStyles = getStyleAttributes('rootElement');
    jsonObjOrig = jsonObj;
    level = 0;
    html = '<table>';
    walkTheDog(jsonObj);
    html += '</table>';
    return html;
  };

  var validateProps = function(jsonObj, css, indent) {
    if (!Number.isInteger(indent) || Math.sign(indent) !== 1) {
      throw "The indent prop must be a positive number"
    }
    if (typeof css !== 'object' || css === null || Array.isArray(css)) {
      throw "The css prop must be an object(but not an array)"
    }
    if (typeof jsonObj !== 'object' || jsonObj === null || Array.isArray(jsonObj)) {
      throw "The json prop must be an object(but not an array)"
    }
  }

  var getIndent = function(level) {
    var indent = '&nbsp;'; 
    const singleIndent = [...Array(indentProp)].map((_, i) => "&nbsp;").join("")

    for (var i=0; i<level; i++) {
      indent += singleIndent;
    }

    return indent;
  }

  var getSpacer = function() {
    return '<tr style="' + spacerStyles + '"></tr>';
  }

  // Get the Css obj from Css.js(or from props if present), and return a semicolon
  // separated list of styles
  var getStyleAttributes = function(className) {
    const defaultCssObj = Css[className];
    const defaultKeys = Object.keys(defaultCssObj);
    var attributes = "";

    for(var i=0; i<defaultKeys.length; i++) {
      const key = defaultKeys[i];
      const cssAttr = key.replace(/([A-Z])/g, "-$1").toLowerCase(); 
      var cssClass = (cssProp[className] && cssProp[className][key]) ? cssProp[className] : defaultCssObj;
      attributes += cssAttr + ":" + cssClass[key] + ";";
    }

    return attributes;
  }

  var isPlainObject = function(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }

  var isPrimitiveValue = function(value) {
    return value === null || typeof value !== 'object';
  }

  var shouldRenderAsSimpleTable = function(arr) {
    if (!Array.isArray(arr) || arr.length === 0) {
      return false;
    }

    for (var idx = 0; idx < arr.length; idx++) {
      var item = arr[idx];

      if (!isPlainObject(item)) {
        return false;
      }

      for (var key in item) {
        if (item.hasOwnProperty(key) && !isPrimitiveValue(item[key])) {
          return false;
        }
      }
    }

    return true;
  }

  var formatPrimitive = function(value) {
    if (value === null || typeof value === 'undefined') {
      return '';
    }

    return value.toString();
  }

  var processArray = function(arr) {
    var distKeys = [];

    if (!Array.isArray(arr) || arr.length === 0) {
      return;
    }

    if (isPlainObject(arr[0])) {
      if (arr.length === 1) {
        var obj = arr[0];

        for (var key in obj) {
          if (!obj.hasOwnProperty(key)) {
            continue;
          }

          var value = obj[key];

          if (Array.isArray(value)) {
            html += '<tr style="' + trStyles + '">';
            html += '  <td style="' + subElementStyles + '" colspan="3">';
            html +=      getIndent(level) + key + suffix;
            html += '  </td>';
            html += '</tr>';
            html += getSpacer();

            var prevLevel = level;
            level += 1;
            processArray(value);
            level = prevLevel;
          }
          else if (isPlainObject(value)) {
            html += '<tr style="' + trStyles + '">';
            html += '  <td style="' + subElementStyles + '" colspan="3">';
            html +=      getIndent(level) + key + suffix;
            html += '  </td>';
            html += '</tr>';
            html += getSpacer();

            var nestedLevel = level;
            level += 1;
            walkTheDog(value);
            level = nestedLevel;
          }
          else {
            html += '<tr style="' + trStyles + '">';
            html += '  <td style="' + subElementStyles + '">';
            html +=      getIndent(level) + key + suffix;
            html += '  </td>';
            html += '  <td style="' + dataCellStyles + '">';
            html +=      getIndent(level) + formatPrimitive(value) + suffix;
            html += '  </td>';
            html += '</tr>';
            html += getSpacer();
          }
        }

        return;
      }

      if (shouldRenderAsSimpleTable(arr)) {
        html += '<tr style="' + trStyles + '">';

        for (var headerKey in arr[0]) {
          if (!arr[0].hasOwnProperty(headerKey)) {
            continue;
          }

          distKeys.push(headerKey);
          html += '<td style="' + subElementStyles + '">';
          html +=   getIndent(level) + headerKey + suffix;
          html += '</td>';
        }

        html += '</tr>';
        html += getSpacer();

        for (var rowIndex = 0; rowIndex < arr.length; rowIndex++) {
          var rowItem = arr[rowIndex];

          html += '<tr style="' + trStyles + '">';

          for (var i = 0; i < distKeys.length; i++) {
            var cellKey = distKeys[i];
            var cellValue = formatPrimitive(rowItem[cellKey]);

            html += '<td style="' + dataCellStyles + '">';
            html +=   getIndent(level) + cellValue + suffix;
            html += '</td>';
          }

          html += '</tr>';
          html += getSpacer();
        }

        return;
      }

      for (var idx = 0; idx < arr.length; idx++) {
        var entry = arr[idx];

        if (isPrimitiveValue(entry)) {
          html += '<tr style="' + trStyles + '">';
          html += '  <td style="' + dataCellStyles + '" colspan="2">';
          html +=      getIndent(level) + formatPrimitive(entry) + suffix;
          html += '  </td>';
          html += '</tr>';
          html += getSpacer();
          continue;
        }

        html += '<tr style="' + trStyles + '">';
        html += '  <td style="' + subElementStyles + '" colspan="3">';
        html +=      getIndent(level) + 'Item ' + (idx + 1) + suffix;
        html += '  </td>';
        html += '</tr>';
        html += getSpacer();

        var previousLevel = level;
        level += 1;

        if (Array.isArray(entry)) {
          processArray(entry);
        }
        else {
          walkTheDog(entry);
        }

        level = previousLevel;
      }

      return;
    }

    if (Array.isArray(arr[0])) {
      for (var arrayIndex = 0; arrayIndex < arr.length; arrayIndex++) {
        var nestedEntry = arr[arrayIndex];

        if (isPrimitiveValue(nestedEntry)) {
          html += '<tr style="' + trStyles + '">';
          html += '  <td style="' + dataCellStyles + '" colspan="2">';
          html +=      getIndent(level) + formatPrimitive(nestedEntry) + suffix;
          html += '  </td>';
          html += '</tr>';
          html += getSpacer();
          continue;
        }

        html += '<tr style="' + trStyles + '">';
        html += '  <td style="' + subElementStyles + '" colspan="3">';
        html +=      getIndent(level) + 'Item ' + (arrayIndex + 1) + suffix;
        html += '  </td>';
        html += '</tr>';
        html += getSpacer();

        var nestedLevel = level;
        level += 1;

        if (Array.isArray(nestedEntry)) {
          processArray(nestedEntry);
        }
        else {
          walkTheDog(nestedEntry);
        }

        level = nestedLevel;
      }

      return;
    }

    for (var primitiveIndex = 0; primitiveIndex < arr.length; primitiveIndex++) {
      var primitiveValue = arr[primitiveIndex];

      html += '<tr style="' + trStyles + '">';
      html += '  <td style="' + dataCellStyles + '" colspan="2">';
      html +=      getIndent(level) + formatPrimitive(primitiveValue) + suffix;
      html += '  </td>';
      html += '</tr>';
    }
  };

  var walkTheDog = function(jsonObj) {
    var hasArray = false;

    if (typeof jsonObj === 'string') {
      jsonObj = JSON.parse(jsonObj);
    }

    subLevel = level;

    for (var k in jsonObj) {
      // Reset the indent if next element is root
      if (typeof jsonObjOrig[k] !== 'undefined') {
        level = 0;
        rootStyle = rootElementStyles;
      }
      else {
        rootStyle = subElementStyles;
      }
      
      componentLevel = subLevel;

      if (jsonObj.hasOwnProperty(k)) {
        var v = jsonObj[k];
        
        if (hasArray) {
          level = componentLevel;
        }

        if (typeof v === 'object') {
          colspan += level; 

          html += '<tr style="' + trStyles + '">';
          html += '  <td style="' + rootStyle + '" colspan="3">';
          html +=      getIndent(level) + k + suffix;
          html += '  </td>';
          html += '</tr>';
          html += getSpacer();

          level += 1;
        }
        else {
          var style = tdStyles + dataCellStyles;

          html += '<tr style="' + trStyles + '">';
          html += '  <td style="' + rootStyle + '">';
          html +=      getIndent(level) + k + suffix;
          html += '  </td>';
          html += '  <td style="' + style + '" colspan="2">' + v + '</td>';
          html += '</tr>';
          html += getSpacer();
        }
       
        if (v instanceof Array) {
          processArray(v);
          hasArray = true;
        }

        if (typeof v === 'object' && !(v instanceof Array)) {
          walkTheDog(v);
          level = subLevel - 1; // Outdent back 
        }
      }
    } 
  };

  return {
    getTable: getTable
  }

})();

export default JsonToHtml;
