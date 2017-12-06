yalla.framework.addComponent("/dist/component/horizontal-line", (function() {
  var $patchChanges = yalla.framework.renderToScreen;
  var $inject = yalla.framework.createInjector("/dist/component/horizontal-line");
  var $export = {};
  var $path = "/dist/component/horizontal-line";
  var _elementName = "dist.component.horizontal-line";
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
      align: props.align || 'center',
      top: props.top || 0,
      bottom: props.bottom || 10,
      height: props.height || 1,
      background: props.background || '#c0c0c0',
      width: props.width || 25,
    }
  }

  function $render(_props, _slotView) {
    _elementOpenStart("div", "");
    _attr("element", "dist.component.horizontal-line");
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
    _attr("style", 'height:' + _state.bottom + 'px !important; text-align:' + _state.align + ' !important;vertical-align:top !important');
    _elementOpenEnd("div");
    _elementOpenStart("div", "");
    _attr("style", 'vertical-align:top !important; display:inline-block; height:' + _state.height + 'px !important;width:' + _state.width + '% !important;background: ' + _state.background + ';border:0 !important; border-top: 1px solid #ccc !important; margin-top:' + _state.top + 'px !important; margin-bottom: 0 !important; !important; padding:0 !important;');
    _elementOpenEnd("div");
    _elementClose("div");
    _elementClose("div");
    _elementClose("div");
  }
  if (typeof $render === "function") {
    $export.render = $render;
  }
  return $export;
})());