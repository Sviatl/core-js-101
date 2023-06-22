/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  const rectangle = {};

  rectangle.width = width;
  rectangle.height = height;

  rectangle.getArea = () => rectangle.width * rectangle.height;

  return rectangle;
}


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const obj = JSON.parse(json);
  Object.setPrototypeOf(obj, proto);
  return obj;
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

// const cssSelectorBuilder = {
//   selectors: [],
//   combinators: [],
//   isEl: false,
//   isId: false,
//   isClass: false,
//   isPseudoEl: false,
//   isAttr: false,
//   isPseudoClass: false,
//   selector: '',
//   order: [],
//   element(value) {
//     if (this.isEl) {
//       throw new Error('1');
//     }
//     this.isEl = true;
//     this.selector = `${this.selector}${value}`;
//     const builder = Object.create(cssSelectorBuilder);
//     builder.isEl = this.isEl;
//     builder.selector = this.selector;
//     return builder;
//   },

//   id(value) {
//     this.isId = true;
//     this.selector = `${this.selector}#${value}`;
//     const builder = Object.create(cssSelectorBuilder);
//     builder.isId = this.isId;
//     builder.selector = this.selector;
//     return builder;
//   },

//   class(value) {
//     this.isClass = true;
//     this.selector = `${this.selector}.${value}`;
//     const builder = Object.create(cssSelectorBuilder);
//     builder.isClass = this.isClass;
//     builder.selector = this.selector;
//     return builder;
//   },

//   attr(value) {
//     this.isAttr = true;
//     this.selector = `${this.selector}[${value}]`;
//     const builder = Object.create(cssSelectorBuilder);
//     builder.isAttr = this.isAttr;
//     builder.selector = this.selector;
//     return builder;
//   },

//   pseudoClass(value) {
//     this.isPseudoClass = true;
//     this.selector = `${this.selector}:${value}`;
//     const builder = Object.create(cssSelectorBuilder);
//     builder.isPseudoClass = this.isPseudoClass;
//     builder.selector = this.selector;
//     return builder;
//   },

//   pseudoElement(value) {
//     this.isPseudoEl = true;
//     this.selector = `${this.selector}::${value}`;
//     const builder = Object.create(cssSelectorBuilder);
//     builder.isPseudoEl = this.isPseudoEl;
//     builder.selector = this.selector;
//     return builder;
//   },

//   combine(selector1, combinator, selector2) {
//     this.selectors.push(selector1);
//     this.selectors.push(selector2);
//     this.combinators.push(combinator);
//     const builder = Object.create(cssSelectorBuilder);
//     builder.selectors = this.selectors;
//     builder.combinators = this.combinators;
//     return builder;
//   },

//   stringify() {
//     console.log(this);
//     let ans;
//     if (this.selectors.length === 0) {
//       ans = this.selector;
//     } else {
//       for (let i = 0; i < this.selectors.length; i += 1) {
//         if (i === 0) {
//           ans = `${ans}${this.selectors[i]}`;
//         } else {
//           ans = `${ans}${this.combinators[i - 1]}${this.selectors[i]}`;
//         }
//       }
//     }
//     console.log(this.selector);
//     return ans;
//   },
// };
const cssSelectorBuilder = {
  selector: '',
  hasElement: false,
  hasId: false,
  hasPseudoEl: false,
  order: '',

  element(value) {
    if (this.hasElement) {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }
    const builder = Object.create(cssSelectorBuilder);
    builder.selector = this.selector + value;
    builder.hasElement = true;
    builder.order = `${this.order},1`;
    builder.checkOrder();
    return builder;
  },

  id(value) {
    if (this.hasId) {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }
    const builder = Object.create(cssSelectorBuilder);
    builder.selector = `${this.selector}#${value}`;
    builder.hasId = true;
    builder.order = `${this.order},2`;
    builder.checkOrder();
    return builder;
  },

  class(value) {
    const builder = Object.create(cssSelectorBuilder);
    builder.selector = `${this.selector}.${value}`;
    builder.order = `${this.order},3`;
    builder.checkOrder();
    return builder;
  },

  attr(value) {
    const builder = Object.create(cssSelectorBuilder);
    builder.selector = `${this.selector}[${value}]`;
    builder.order = `${this.order},4`;
    builder.checkOrder();
    return builder;
  },

  pseudoClass(value) {
    const builder = Object.create(cssSelectorBuilder);
    builder.selector = `${this.selector}:${value}`;
    builder.order = `${this.order},5`;
    builder.checkOrder();
    return builder;
  },

  pseudoElement(value) {
    if (this.hasPseudoEl) {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }
    const builder = Object.create(cssSelectorBuilder);
    builder.selector = `${this.selector}::${value}`;
    builder.hasPseudoEl = true;
    builder.order = `${this.order},6`;
    builder.checkOrder();
    return builder;
  },

  checkOrder() {
    const arr = this.order.split(',');
    for (let i = 1; i < arr.length; i += 1) {
      if (arr[i - 1] > arr[i]) {
        throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
      }
    }
  },

  combine(selector1, combinator, selector2) {
    const builder = Object.create(cssSelectorBuilder);
    builder.selector = `${selector1.stringify()} ${combinator} ${selector2.stringify()}`;
    return builder;
  },

  stringify() {
    return this.selector;
  },
};


module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
