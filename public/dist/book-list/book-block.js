yalla.framework.addComponent("/dist/book-list/book-block", (function() {
  var $patchChanges = yalla.framework.renderToScreen;
  var $inject = yalla.framework.createInjector("/dist/book-list/book-block");
  var $export = {};
  var $path = "/dist/book-list/book-block";
  var _elementName = "dist.book-list.book-block";
  var _context = {};
  var _parentComponent = yalla.framework.getParentComponent;
  var _merge = yalla.utils.merge;

  function ComponentEvent(type, data, target, currentTarget) {
    this.data = data;
    this.target = target;
    this.type = type;
    this.currentTarget = currentTarget;
  }

  var _elementOpen = IncrementalDOM.elementOpen;
  var _elementClose = IncrementalDOM.elementClose;
  var _elementOpenStart = IncrementalDOM.elementOpenStart;
  var _elementOpenEnd = IncrementalDOM.elementOpenEnd;
  var _elementVoid = IncrementalDOM.elementVoid;
  var _text = IncrementalDOM.text;
  var _attr = IncrementalDOM.attr;
  var _skip = IncrementalDOM.skip;

  function initState(props) {
    return {}
  };

  function onPropertyChange(event) {};

  function onClick(event) {
    this.emitEvent('click', event);
  }

  function $render(_props, _slotView) {
    _context["entry"] = $inject("/component/entry");
    var entry = _context["entry"];
    _elementOpenStart("span", "");
    _attr("element", "dist.book-list.book-block");
    _attr("onclick", function(event) {
      var self = {
        target: event.target
      };
      self.properties = _props;
      if ('elements' in self.target) {
        self.elements = self.target.elements;
      }
      self.currentTarget = this == event.target ? self.target : _parentComponent(event.currentTarget);
      self.component = _component;
      self.component._state = self.component._state || {};
      self.state = self.component._state;
      self.emitEvent = function(eventName, data) {
        var event = new ComponentEvent(eventName, data, self.target, self.currentTarget);
        if ('on' + eventName in _props) {
          _props['on' + eventName](event);
        }
      };
      onClick.bind(self)(_props.book);
    });
    _elementOpenEnd("span");
    var _component = IncrementalDOM.currentElement();
    var _validComponent = yalla.framework.validComponentName(_component, _elementName)
    _component._state = _component._state && _validComponent ? _component._state : initState.bind(_component)(_props);
    _component._state._name = _elementName;
    var _state = _component._state;
    var _self = {
      component: _component,
      properties: _props,
      state: _component._state
    };
    if (_validComponent) {
      yalla.framework.propertyCheckChanges(_component._properties, _props, onPropertyChange.bind(_self));
    }
    _component._properties = _props;
    _elementOpenStart("div", "");
    _attr("class", "col-xs-6 col-sm-4 col-md-3 col-lg-3 custom-book-block");
    _attr("style", _props.unlimitedtitlewidth ? 'margin-bottom:0 !important;' : '');
    _elementOpenEnd("div");
    _elementOpenStart("div", "");
    _attr("class", "row");
    _elementOpenEnd("div");
    _elementOpenStart("div", "");
    _attr("class", "custom-book-cover");
    _elementOpenEnd("div");
    _elementOpenStart("img", "");
    _attr("class", "img-fluid");
    _attr("src", ('upload/thumbs/' + _props.book.thumb + '?rnd=' + Math.random()));
    _attr("style", "max-width:100px");
    _elementOpenEnd("img");
    _elementClose("img");
    _elementClose("div");
    _elementClose("div");
    if (!_props.unlimitedtitlewidth) {
      _elementOpenStart("div", "");
      _attr("class", "custom-book-title");
      _elementOpenEnd("div");
      var _params = {
        "type": "label",
        "naked": "naked",
        "prompt": _props.book.title
      };
      _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
      _elementClose("div");
    }
    _elementClose("div");
    if (_props.unlimitedtitlewidth) {
      _elementOpenStart("div", "");
      _attr("class", "custom-book-title");
      _attr("style", "margin-bottom:5px;");
      _elementOpenEnd("div");
      var _params = {
        "type": "label",
        "naked": "naked",
        "prompt": _props.book.title
      };
      _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
      _elementClose("div");
    }
    _elementClose("span");
  }
  if (typeof $render === "function") {
    $export.render = $render;
  }
  return $export;
})());