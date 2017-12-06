yalla.framework.addComponent("/dist/chapter-processor-params/home", (function() {
  var $patchChanges = yalla.framework.renderToScreen;
  var $inject = yalla.framework.createInjector("/dist/chapter-processor-params/home");
  var $export = {};
  var $path = "/dist/chapter-processor-params/home";
  var _elementName = "dist.chapter-processor-params.home";
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

  var result = {};

  function needParams(file) {
    var ext = file.toLowerCase();
    ext = ext.substring(ext.lastIndexOf('.') + 1)
    console.log(ext);
    if ('|zip|'.indexOf('|' + ext + '|') > -1) return ext;
    else return '';
  }

  function initState(props) {
    return {
      needParams: needParams(props.file),
    };
  }

  function onCreated() {
    if (!this.state.needParams) this.emitEvent('result', {});
  }

  function onApply() {
    this.emitEvent('result', result);
  }

  function onResult(event) {
    result = event.data;
  }

  function $render(_props, _slotView) {
    _context["popup"] = $inject("/component/popup-panel");
    var popup = _context["popup"];
    _context["zippedTextFiles"] = $inject("/chapter-processor-params/zipped-text-files");
    var zippedTextFiles = _context["zippedTextFiles"];
    _elementOpenStart("div", "");
    _attr("element", "dist.chapter-processor-params.home");
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
    _attr("oncreated", function(event) {
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
      onCreated.bind(self)();
    });
    _elementOpenEnd("div");
    if (_state.needParams) {
      _elementOpenStart("div", "");
      _elementOpenEnd("div");
      var _params = {
        "title": _props.file || _props.title || 'Chapter Processor',
        "onclose": function(event) {
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
          onApply.bind(self)();
        },
        "buttontext": "Apply"
      };
      _context["popup"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {
        if (slotName === "body") {
          _elementOpenStart("span", "");
          _elementOpenEnd("span");
          var _params = {
            "onresult": function(event) {
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
              onResult.bind(self)(event);
            },
            "unbuttoned": "unbuttoned"
          };
          _context["zippedTextFiles"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
          _elementClose("span");
        }
      });
      _elementClose("div");
    }
    if (!_state.needParams) {
      _elementOpenStart("div", "");
      _elementOpenEnd("div");
      _elementClose("div");
    }
    _elementClose("div");
    _elementClose("div");
  }
  if (typeof $render === "function") {
    $export.render = $render;
  }
  return $export;
})());