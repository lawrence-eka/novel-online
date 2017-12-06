yalla.framework.addComponent("/dist/rating/home", (function() {
  var $patchChanges = yalla.framework.renderToScreen;
  var $inject = yalla.framework.createInjector("/dist/rating/home");
  var $export = {};
  var $path = "/dist/rating/home";
  var _elementName = "dist.rating.home";
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

  function initState(props) {
    var state = {};
    state.stars = new Array(parseInt(props.max));
    state.max = props.max;
    setValues(state.stars, props.value, props.max);
    state.value = parseFloat(props.value || '0.0').toFormattedString(1);
    state.readonly = props.readonly;
    return state;
  }

  function setValues(stars, value, max) {
    for (var i = 0; i < max; value -= 1, i++) {
      var v = {};
      v.index = i;
      v.value = (value > 1 ? 1 : value > 0 ? value : 0);
      stars[i] = v;
    }
  }

  function onStarClicked(index, event) {
    this.state.value = index + event.data;
    this.state.value = (this.state.value * 2 <= this.state.max ? Math.floor(this.state.value * 10) / 10 : Math.ceil(this.state.value * 10) / 10);
    setValues(this.state.stars, this.state.value, this.state.max);
    this.state.value = parseFloat(this.state.value).toFormattedString(1);
    $patchChanges('stars');
  }

  function $render(_props, _slotView) {
    _context["star"] = $inject("/rating/star");
    var star = _context["star"];
    _context["entry"] = $inject("/component/entry");
    var entry = _context["entry"];
    _elementOpenStart("div", "");
    _attr("element", "dist.rating.home");
    _attr("style", "display:inline-block;line-height:0;");
    _elementOpenEnd("div");
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
    _elementOpenStart("span", "");
    _elementOpenEnd("span");
    yalla.framework.registerRef("stars", IncrementalDOM.currentElement(), function() {
      _elementOpenStart("div", "");
      _attr("style", "line-height:0;display:inline-block;text-align:left;");
      _elementOpenEnd("div");
      var _array = _state.stars || [];
      _array.forEach(function(star) {
        _elementOpenStart("div", "");
        _attr("style", "line-height:0;display:inline-block;");
        _elementOpenEnd("div");
        var _params = {
          "value": star.value,
          "readonly": _state.readonly,
          "onclick": function(event) {
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
            onStarClicked.bind(self)(star.index, event);
          }
        };
        _context["star"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
        _elementClose("div");
      });
      _elementClose("div");
      if (_props.showtext) {
        _elementOpenStart("div", "");
        _attr("style", ('line-height:1; text-align:center;') + _props.textstyle);
        _elementOpenEnd("div");
        _elementOpenStart("div", "");
        _attr("style", "margin: 0 auto;line-height:1; display:inline-block;");
        _elementOpenEnd("div");
        var _params = {
          "type": "label",
          "naked": "naked",
          "prompt": _state.value,
          "style": "line-height:1;"
        };
        _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
        var _params = {
          "type": "text",
          "name": _props.name,
          "naked": "naked",
          "hidden": "hidden",
          "value": _state.value
        };
        _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
        _elementClose("div");
        _elementClose("div");
      }
    })()
    _elementClose("span");
    _elementClose("div");
  }
  if (typeof $render === "function") {
    $export.render = $render;
  }
  return $export;
})());