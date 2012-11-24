// Generated by CoffeeScript 1.4.0
(function() {
  var root, _base, _ref, _ref1,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  root = typeof global !== "undefined" && global !== null ? global : this;

  if ((_ref = root.FUNDDY) == null) {
    root.FUNDDY = {};
  }

  if ((_ref1 = (_base = root.FUNDDY).JsTranslations) == null) {
    _base.JsTranslations = {};
  }

  root = typeof global !== "undefined" && global !== null ? global : this;

  root.FUNDDY.JsTranslations.IntervalSymbol = (function() {
    var LEFT_TYPE, RIGHT_TYPE;

    LEFT_TYPE = "[";

    RIGHT_TYPE = "]";

    function IntervalSymbol(symbol) {
      this.symbol = symbol;
      if (this.symbol !== LEFT_TYPE && this.symbol !== RIGHT_TYPE) {
        throw new Error("Symbol " + this.symbol + " not recognized");
      }
    }

    IntervalSymbol.prototype.isLeftOpen = function() {
      return this.symbol === RIGHT_TYPE;
    };

    IntervalSymbol.prototype.isLeftClose = function() {
      return this.symbol === LEFT_TYPE;
    };

    IntervalSymbol.prototype.isRightOpen = function() {
      return this.symbol === LEFT_TYPE;
    };

    IntervalSymbol.prototype.isRightClose = function() {
      return this.symbol === RIGHT_TYPE;
    };

    return IntervalSymbol;

  })();

  root = typeof global !== "undefined" && global !== null ? global : this;

  root.FUNDDY.JsTranslations.IntervalSymbolFactory = (function() {

    function IntervalSymbolFactory() {}

    IntervalSymbolFactory.prototype.create = function(string) {
      return new root.FUNDDY.JsTranslations.IntervalSymbol(string);
    };

    return IntervalSymbolFactory;

  })();

  root = typeof global !== "undefined" && global !== null ? global : this;

  root.FUNDDY.JsTranslations.Interval = (function() {
    var NEGATIVE_INFINITY, NUMBER_PATTERN, POSITIVE_INFINITY, assertNumber, parseNumber;

    POSITIVE_INFINITY = "Inf";

    NEGATIVE_INFINITY = "-Inf";

    NUMBER_PATTERN = /\d+/;

    function Interval(leftSymbol, leftNumberString, rightNumberString, rightSymbol) {
      this.leftSymbol = leftSymbol;
      this.rightSymbol = rightSymbol;
      this.leftNumber = parseNumber(leftNumberString);
      this.rightNumber = parseNumber(rightNumberString);
      if (this.leftNumber > this.rightNumber) {
        throw new Error("Left number must be lower or equal than right one");
      }
    }

    Interval.prototype.contains = function(number) {
      return !this.numberDoesNotFitLeftAndRightConstraints(number);
    };

    Interval.prototype.numberDoesNotFitLeftAndRightConstraints = function(number) {
      return this.numberDoesNotFitLeftOpenConstraint(number) || this.numberDoesNotFitLeftCloseConstraint(number) || this.numberDoesNotFitRightOpenConstraint(number) || this.numberDoesNotFitRightCloseConstraint(number);
    };

    Interval.prototype.numberDoesNotFitLeftOpenConstraint = function(number) {
      return this.leftSymbol.isLeftOpen() && number <= this.leftNumber;
    };

    Interval.prototype.numberDoesNotFitLeftCloseConstraint = function(number) {
      return this.leftSymbol.isLeftClose() && number < this.leftNumber;
    };

    Interval.prototype.numberDoesNotFitRightOpenConstraint = function(number) {
      return this.rightSymbol.isRightOpen() && number >= this.rightNumber;
    };

    Interval.prototype.numberDoesNotFitRightCloseConstraint = function(number) {
      return this.rightSymbol.isRightClose() && number > this.rightNumber;
    };

    parseNumber = function(string) {
      if (string === POSITIVE_INFINITY) {
        return Infinity;
      }
      if (string === NEGATIVE_INFINITY) {
        return -Infinity;
      }
      assertNumber(string);
      return parseFloat(string);
    };

    assertNumber = function(string) {
      if (!NUMBER_PATTERN.test(string)) {
        throw new Error("" + string + " is not a number");
      }
    };

    return Interval;

  })();

  root = typeof global !== "undefined" && global !== null ? global : this;

  root.FUNDDY.JsTranslations.IntervalFactory = (function() {

    function IntervalFactory() {}

    IntervalFactory.prototype.create = function(leftSymbol, leftNumberString, rightNumberString, rightSymbol) {
      return new root.FUNDDY.JsTranslations.Interval(leftSymbol, leftNumberString, rightNumberString, rightSymbol);
    };

    return IntervalFactory;

  })();

  root = typeof global !== "undefined" && global !== null ? global : this;

  root.FUNDDY.JsTranslations.Set = (function() {

    function Set(data) {
      this.data = data;
    }

    Set.prototype.contains = function(number) {
      var dataNumber, _i, _len, _ref2;
      _ref2 = this.data;
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        dataNumber = _ref2[_i];
        if (parseInt(dataNumber) === number) {
          return true;
        }
      }
      return false;
    };

    return Set;

  })();

  root = typeof global !== "undefined" && global !== null ? global : this;

  root.FUNDDY.JsTranslations.SetFactory = (function() {

    function SetFactory() {}

    SetFactory.prototype.create = function(data) {
      return new root.FUNDDY.JsTranslations.Set(data);
    };

    return SetFactory;

  })();

  root = typeof global !== "undefined" && global !== null ? global : this;

  root.FUNDDY.JsTranslations.IntervalParser = (function() {
    var CLOSING_SET_CARACTER, FIRST_CHARACTER_POSITION, INTERVAL_PATTERN, OPENING_SET_CHARACTER, SECOND_CHARACTER_POSITION, SEPARATOR_CHARACTER, SET_PATTERN, stringIsLikeASet, stringIsLikeAnInteval;

    FIRST_CHARACTER_POSITION = 0;

    SECOND_CHARACTER_POSITION = 1;

    OPENING_SET_CHARACTER = "{";

    CLOSING_SET_CARACTER = "}";

    SET_PATTERN = /^\{-?\d+(,-?\d+)*\}/;

    INTERVAL_PATTERN = /^[\[\]]-?(\d+|Inf),-?(\d+|Inf)[\[\]]/;

    SEPARATOR_CHARACTER = ",";

    function IntervalParser(setFactory, intervalFactory, intervalSymbolFactory) {
      this.setFactory = setFactory;
      this.intervalFactory = intervalFactory;
      this.intervalSymbolFactory = intervalSymbolFactory;
    }

    IntervalParser.prototype.parse = function(string) {
      if (stringIsLikeASet(string)) {
        return this.createSetFromString(string);
      }
      if (stringIsLikeAnInteval(string)) {
        return this.createIntervalFromString(string);
      }
      throw new Error("Parse error in string '" + string + "'");
    };

    stringIsLikeASet = function(string) {
      return SET_PATTERN.test(string);
    };

    stringIsLikeAnInteval = function(string) {
      return INTERVAL_PATTERN.test(string);
    };

    IntervalParser.prototype.createSetFromString = function(string) {
      var data, interval;
      string = string + "";
      interval = string.substr(1, string.length - 2);
      data = interval.split(SEPARATOR_CHARACTER);
      return this.setFactory.create(data);
    };

    IntervalParser.prototype.createIntervalFromString = function(string) {
      var leftNumberText, leftPart, leftSymbol, parts, rightNumberText, rightPart, rightSymbol;
      parts = string.split(SEPARATOR_CHARACTER);
      leftPart = parts[0];
      rightPart = parts[1];
      leftNumberText = leftPart.substr(SECOND_CHARACTER_POSITION);
      rightNumberText = rightPart.substr(FIRST_CHARACTER_POSITION, rightPart.length - 1);
      rightSymbol = this.intervalSymbolFactory.create(rightPart[rightPart.length - 1]);
      leftSymbol = this.intervalSymbolFactory.create(leftPart[FIRST_CHARACTER_POSITION]);
      return this.intervalFactory.create(leftSymbol, leftNumberText, rightNumberText, rightSymbol);
    };

    return IntervalParser;

  })();

  root = typeof global !== "undefined" && global !== null ? global : this;

  root.FUNDDY.JsTranslations.Translator = (function() {
    var INTERVAL_SEPARATOR, MULTIPLE_CHOICES_SEPARATOR, replaceParametersWithValues, splitIntoChoices;

    MULTIPLE_CHOICES_SEPARATOR = "|";

    INTERVAL_SEPARATOR = " ";

    function Translator(intervalParser, translations, locale) {
      this.intervalParser = intervalParser;
      this.translations = translations;
      this.locale = locale;
      this.transChoice = __bind(this.transChoice, this);

      this.trans = __bind(this.trans, this);

      this.checkLocaleExists();
    }

    Translator.prototype.checkLocaleExists = function() {
      if (!(this.locale in this.translations)) {
        throw new Error("There are no transactions with locale '" + this.locale + "'");
      }
    };

    Translator.prototype.trans = function(id, parameters) {
      var translation;
      if (parameters == null) {
        parameters = {};
      }
      translation = this.findTranslation(id);
      return replaceParametersWithValues(translation, parameters);
    };

    Translator.prototype.findTranslation = function(id) {
      this.checkIdExists(id);
      return this.translations[this.locale][id];
    };

    Translator.prototype.checkIdExists = function(id) {
      if (!(id in this.translations[this.locale])) {
        throw new Error("No translation found for id '" + id + "'");
      }
    };

    replaceParametersWithValues = function(text, parameters) {
      var index, parameter;
      for (index in parameters) {
        parameter = parameters[index];
        text = text.replace(index, parameter);
      }
      return text;
    };

    Translator.prototype.transChoice = function(id, number, parameters) {
      var choices, translation;
      if (parameters == null) {
        parameters = {};
      }
      translation = this.findTranslation(id);
      choices = splitIntoChoices(translation);
      return this.selectAndProcessChoice(choices, number, parameters);
    };

    splitIntoChoices = function(translation) {
      var choices, intervalData, part, parts, pos, _i, _len;
      parts = translation.split(MULTIPLE_CHOICES_SEPARATOR);
      choices = {};
      for (_i = 0, _len = parts.length; _i < _len; _i++) {
        part = parts[_i];
        pos = part.indexOf(INTERVAL_SEPARATOR);
        intervalData = part.substr(0, pos);
        choices[intervalData] = part.substr(pos + 1);
      }
      return choices;
    };

    Translator.prototype.selectAndProcessChoice = function(choices, number, parameters) {
      var interval, intervalData, translation;
      for (intervalData in choices) {
        translation = choices[intervalData];
        interval = this.intervalParser.parse(intervalData);
        if (interval.contains(number)) {
          return replaceParametersWithValues(translation, parameters);
        }
      }
      throw new Error("Number " + number + " not in choices");
    };

    return Translator;

  })();

}).call(this);
