yalla.framework.addComponent("/dist/rating/star", (function() {
  var $patchChanges = yalla.framework.renderToScreen;
  var $inject = yalla.framework.createInjector("/dist/rating/star");
  var $export = {};
  var $path = "/dist/rating/star";
  var _elementName = "dist.rating.star";
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
    return {
      readonly: props.readonly,
      width: parseInt(window.getComputedStyle(this).getPropertyValue('font-size')),
      partial: (parseInt(window.getComputedStyle(this).getPropertyValue('font-size')) * props.value),
      value: props.value,
    };
  }

  function onPropertyChange(props) {
    if (props.value) this.state.partial = (parseInt(window.getComputedStyle(this.component).getPropertyValue('font-size')) * props.value.newValue);
    if (props.readonly) this.state.readonly = props.readonly.newValue;
  }

  function onClick(event) {
    if (!this.state.readonly) this.emitEvent('click', event.offsetX / this.state.width);
  }

  function onMouseMove(event) {
    if (!this.state.readonly && event.buttons) this.emitEvent('click', event.offsetX / this.state.width);
  }

  function $render(_props, _slotView) {
    _elementOpenStart("div", "");
    _attr("element", "dist.rating.star");
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
    _elementOpenStart("div", "");
    _attr("style", ('position:relative; width:' + _state.width + 'px; height:' + _state.width + 'px;'));
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
      onClick.bind(self)(event);
    });
    _attr("onmousemove", function(event) {
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
      onMouseMove.bind(self)(event);
    });
    _elementOpenEnd("div");
    _elementOpenStart("i", "");
    _attr("class", "fa fa-star-o");
    _attr("style", "position:absolute; color:lightgrey");
    _elementOpenEnd("i");
    _elementClose("i");
    _elementOpenStart("i", "");
    _attr("class", "fa fa-star");
    _attr("style", ('position:absolute; width:' + _state.partial + 'px;overflow:hidden;color:orange'));
    _elementOpenEnd("i");
    _elementClose("i");
    _elementClose("div");
    _elementClose("div");
  }
  if (typeof $render === "function") {
    $export.render = $render;
  }
  return $export;
})());