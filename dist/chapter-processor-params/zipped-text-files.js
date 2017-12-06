yalla.framework.addComponent("/dist/chapter-processor-params/zipped-text-files", (function() {
  var $patchChanges = yalla.framework.renderToScreen;
  var $inject = yalla.framework.createInjector("/dist/chapter-processor-params/zipped-text-files");
  var $export = {};
  var $path = "/dist/chapter-processor-params/zipped-text-files";
  var _elementName = "dist.chapter-processor-params.zipped-text-files";
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

  var firstLabelStyle = "margin-top:3px; margin-bottom:0;";
  var secondLabelStyle = "margin-top:3px !important; margin-bottom:0 !important;";
  var outerDivStyle = "display:flex; margin-top:-2px !important;";
  var radioDivStyle = "display:inline-block; vertical-align:top;";
  var labelDivStyle = "flex-grow:1;";
  var buttonDivStyle = "padding-top:10px";

  function initState(props) {
    return {};
  }

  function onApply() {
    onResult.bind(this)(true);
  }

  function onResult(sendMessage) {
    if (!sendMessage) return;

    var e = (this.target.form || this.target).elements;
    var result = {
      titleFrom: e.titleFrom.value,
      addTitle: e.addTitle.value,
      titleCut: e.titleCut.value == 'all' ? {} : {
        from: e.from.value,
        to: e.to.value,
      },
    }
    this.emitEvent('result', result);
  }

  function onTakeAll() {
    this.target.form.elements.from.value = "";
    this.target.form.elements.to.value = "";
  }

  function onBetweenSet() {
    this.target.form.elements.titleCut.value = "between";
  }

  function $render(_props, _slotView) {
    _elementOpenStart("div", "");
    _attr("element", "dist.chapter-processor-params.zipped-text-files");
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
    _elementOpenStart("form", "");
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
      onResult.bind(self)(_props.unbuttoned);
    });
    _attr("onchange", function(event) {
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
      onResult.bind(self)(_props.unbuttoned);
    });
    _elementOpenEnd("form");
    _elementOpenStart("div", "");
    _elementOpenEnd("div");
    _elementOpenStart("label", "");
    _attr("class", "custom-entry-prompt");
    _elementOpenEnd("label");
    _text("Pick Title From");
    _elementClose("label");
    _elementClose("div");
    _elementOpenStart("div", "");
    _attr("style", outerDivStyle);
    _elementOpenEnd("div");
    _elementOpenStart("div", "");
    _attr("style", radioDivStyle);
    _elementOpenEnd("div");
    _elementOpenStart("input", "");
    _attr("type", "radio");
    _attr("name", "titleFrom");
    _attr("value", "fileName");
    _attr("checked", "checked");
    _elementOpenEnd("input");
    _elementClose("input");
    _elementClose("div");
    _elementOpenStart("div", "");
    _attr("style", labelDivStyle);
    _elementOpenEnd("div");
    _elementOpenStart("label", "");
    _attr("class", "custom-label-value");
    _attr("style", firstLabelStyle);
    _elementOpenEnd("label");
    _text("File Name");
    _elementClose("label");
    _elementClose("div");
    _elementClose("div");
    _elementOpenStart("div", "");
    _attr("style", outerDivStyle);
    _elementOpenEnd("div");
    _elementOpenStart("div", "");
    _attr("style", radioDivStyle);
    _elementOpenEnd("div");
    _elementOpenStart("input", "");
    _attr("type", "radio");
    _attr("name", "titleFrom");
    _attr("value", "firstLine");
    _elementOpenEnd("input");
    _elementClose("input");
    _elementClose("div");
    _elementOpenStart("div", "");
    _attr("style", labelDivStyle);
    _elementOpenEnd("div");
    _elementOpenStart("label", "");
    _attr("class", "custom-label-value");
    _attr("style", firstLabelStyle);
    _elementOpenEnd("label");
    _text("First Line of Text");
    _elementClose("label");
    _elementClose("div");
    _elementClose("div");
    _elementOpenStart("div", "");
    _elementOpenEnd("div");
    _elementOpenStart("label", "");
    _attr("class", "custom-entry-prompt");
    _elementOpenEnd("label");
    _text("Include Title in Text");
    _elementClose("label");
    _elementClose("div");
    _elementOpenStart("div", "");
    _attr("style", outerDivStyle);
    _elementOpenEnd("div");
    _elementOpenStart("div", "");
    _attr("style", radioDivStyle);
    _elementOpenEnd("div");
    _elementOpenStart("input", "");
    _attr("type", "radio");
    _attr("name", "addTitle");
    _attr("value", "yes");
    _elementOpenEnd("input");
    _elementClose("input");
    _elementClose("div");
    _elementOpenStart("div", "");
    _attr("style", labelDivStyle);
    _elementOpenEnd("div");
    _elementOpenStart("label", "");
    _attr("class", "custom-label-value");
    _attr("style", firstLabelStyle);
    _elementOpenEnd("label");
    _text("Yes");
    _elementClose("label");
    _elementClose("div");
    _elementClose("div");
    _elementOpenStart("div", "");
    _attr("style", outerDivStyle);
    _elementOpenEnd("div");
    _elementOpenStart("div", "");
    _attr("style", radioDivStyle);
    _elementOpenEnd("div");
    _elementOpenStart("input", "");
    _attr("type", "radio");
    _attr("name", "addTitle");
    _attr("value", "no");
    _attr("checked", "checked");
    _elementOpenEnd("input");
    _elementClose("input");
    _elementClose("div");
    _elementOpenStart("div", "");
    _attr("style", labelDivStyle);
    _elementOpenEnd("div");
    _elementOpenStart("label", "");
    _attr("class", "custom-label-value");
    _attr("style", firstLabelStyle);
    _elementOpenEnd("label");
    _text("No");
    _elementClose("label");
    _elementClose("div");
    _elementClose("div");
    _elementOpenStart("div", "");
    _elementOpenEnd("div");
    _elementOpenStart("label", "");
    _attr("class", "custom-entry-prompt");
    _elementOpenEnd("label");
    _text("Title Cut");
    _elementClose("label");
    _elementClose("div");
    _elementOpenStart("div", "");
    _attr("style", outerDivStyle);
    _elementOpenEnd("div");
    _elementOpenStart("div", "");
    _attr("style", radioDivStyle);
    _elementOpenEnd("div");
    _elementOpenStart("input", "");
    _attr("type", "radio");
    _attr("name", "titleCut");
    _attr("value", "all");
    _attr("checked", "checked");
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
      onTakeAll.bind(self)();
    });
    _elementOpenEnd("input");
    _elementClose("input");
    _elementClose("div");
    _elementOpenStart("div", "");
    _attr("style", labelDivStyle);
    _elementOpenEnd("div");
    _elementOpenStart("label", "");
    _attr("class", "custom-label-value");
    _attr("style", firstLabelStyle);
    _elementOpenEnd("label");
    _text("Take Everything");
    _elementClose("label");
    _elementClose("div");
    _elementClose("div");
    _elementOpenStart("div", "");
    _attr("style", outerDivStyle);
    _elementOpenEnd("div");
    _elementOpenStart("div", "");
    _attr("style", radioDivStyle);
    _elementOpenEnd("div");
    _elementOpenStart("input", "");
    _attr("type", "radio");
    _attr("name", "titleCut");
    _attr("value", "between");
    _elementOpenEnd("input");
    _elementClose("input");
    _elementClose("div");
    _elementOpenStart("div", "");
    _attr("style", labelDivStyle);
    _elementOpenEnd("div");
    _elementOpenStart("label", "");
    _attr("class", "custom-label-value pull-left");
    _attr("style", firstLabelStyle);
    _elementOpenEnd("label");
    _text("Between");
    _elementClose("label");
    _elementOpenStart("label", "");
    _attr("class", "custom-label-value pull-right");
    _attr("style", firstLabelStyle);
    _elementOpenEnd("label");
    _elementOpenStart("i", "");
    _elementOpenEnd("i");
    _text("(empty = from start)");
    _elementClose("i");
    _elementClose("label");
    _elementOpenStart("input", "");
    _attr("type", "text");
    _attr("name", "from");
    _attr("class", "form-control input-sm col");
    _attr("style", secondLabelStyle);
    _attr("onkeypress", function(event) {
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
      onBetweenSet.bind(self)();
    });
    _elementOpenEnd("input");
    _elementClose("input");
    _elementOpenStart("label", "");
    _attr("class", "custom-label-value pull-left");
    _attr("style", secondLabelStyle);
    _elementOpenEnd("label");
    _text("and");
    _elementClose("label");
    _elementOpenStart("label", "");
    _attr("class", "custom-label-value pull-right");
    _attr("style", secondLabelStyle);
    _elementOpenEnd("label");
    _elementOpenStart("i", "");
    _elementOpenEnd("i");
    _text("(empty = to the end)");
    _elementClose("i");
    _elementClose("label");
    _elementOpenStart("input", "");
    _attr("type", "text");
    _attr("name", "to");
    _attr("class", "form-control input-sm col");
    _attr("style", secondLabelStyle);
    _attr("onkeypress", function(event) {
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
      onBetweenSet.bind(self)();
    });
    _elementOpenEnd("input");
    _elementClose("input");
    _elementClose("div");
    _elementClose("div");
    if (!_props.unbuttoned) {
      _elementOpenStart("div", "");
      _attr("style", buttonDivStyle);
      _elementOpenEnd("div");
      _elementOpenStart("input", "");
      _attr("type", "button");
      _attr("class", "form-control btn btn-info btn-block");
      _attr("value", "Apply");
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
        onApply.bind(self)();
      });
      _elementOpenEnd("input");
      _elementClose("input");
      _elementClose("div");
    }
    _elementClose("form");
    _elementClose("div");
  }
  if (typeof $render === "function") {
    $export.render = $render;
  }
  return $export;
})());