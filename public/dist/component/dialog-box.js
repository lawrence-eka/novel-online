yalla.framework.addComponent("/dist/component/dialog-box", (function() {
  var $patchChanges = yalla.framework.renderToScreen;
  var $inject = yalla.framework.createInjector("/dist/component/dialog-box");
  var $export = {};
  var $path = "/dist/component/dialog-box";
  var _elementName = "dist.component.dialog-box";
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
    var buttons = [];
    var className = "";
    if (props.yesnocancel) {
      className = "col-xs-4 col-sm-4 col-md-4 col-lg-4";
      buttons.push({
        text: 'Yes'
      });
      buttons.push({
        text: 'No'
      })
      buttons.push({
        text: 'Cancel'
      })
    } else if (props.yesno) {
      className = "col-xs-6 col-sm-6 col-md-6 col-lg-6";
      buttons.push({
        text: 'Yes'
      });
      buttons.push({
        text: 'No'
      })
    } else if (props.okcancel) {
      className = "col-xs-6 col-sm-6 col-md-6 col-lg-6";
      buttons.push({
        text: 'OK'
      });
      buttons.push({
        text: 'Cancel'
      })
    } else if (props.okonly) {
      className = "col-xs-12 col-sm-12 col-md-12 col-lg-12";
      buttons.push({
        text: 'OK'
      });
    }
    className = "col " + className;

    return {
      popup: null,
      popupPanel: null,
      centered: props.centered,
      message: props.message,
      buttons: buttons,
      className: className,
      show: props.show,
    }
  }

  function doClose(result) {
    this.state.popup.style.visibility = 'hidden';
    document.getElementsByName('universe')[0].removeChild(this.state.popup);
    this.state.popup = null;

    this.emitEvent('result', result);
  }

  function onCloseDialog(event) {
    this.state.popupPanel.className += ' custom-fadeout-anim';

    var panels = document.getElementsByName('universe')[0].children;
    panels[panels.length - 2].classList.remove('blur');

    setTimeout(doClose.bind(this, event.toLowerCase()), 250);
  }

  function onCreated() {
    this.state.popupPanel = this.target;
    this.state.popup = document.createElement('div');

    var panels = document.getElementsByName('universe')[0].children;
    panels[panels.length - 1].classList.add('blur');

    document.getElementsByName('universe')[0].appendChild(this.state.popup);
    this.state.popup.className = "container centered-form popupContainer"
    this.state.popup.style.visibility = 'visible';
    this.state.popup.appendChild(this.target);
  }

  function onDeleted() {
    document.getElementsByName('motherNature')[0].className = "not-blur";
  }


  function $render(_props, _slotView) {
    _context["entry"] = $inject("/component/entry");
    var entry = _context["entry"];
    _elementOpenStart("div", "");
    _attr("element", "dist.component.dialog-box");
    _attr("name", _props.name);
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
    _attr("ondeleted", function(event) {
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
      onDeleted.bind(self)();
    });
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
    _attr("class", "container custom-container-layout custom-std-anim");
    _elementOpenEnd("div");
    _elementOpenStart("div", "");
    _attr("class", "row centered-form no-top-margin");
    _elementOpenEnd("div");
    _elementOpenStart("div", "");
    _attr("class", "form-panel col-xs-12 col-sm-12 col-md-12 col-lg-12");
    _elementOpenEnd("div");
    _elementOpenStart("div", "");
    _attr("class", "panel panel-default ");
    _elementOpenEnd("div");
    if (_props.test || !_props.notitle || _props.title) {
      _elementOpenStart("div", "");
      _attr("class", "panel-heading custom-panel-layout");
      _elementOpenEnd("div");
      _elementOpenStart("h3", "");
      _attr("class", "panel-title");
      _elementOpenEnd("h3");
      _text("" + ((_props.title ? _props.title : '')) + "");
      _elementClose("h3");
      _elementClose("div");
    }
    _elementOpenStart("div", "");
    _attr("class", "panel-body custom-panel-layout");
    _attr("style", _props.style);
    _elementOpenEnd("div");
    _elementOpenStart("div", "");
    _attr("class", ('row ' + (_state.centered ? 'row-centered' : '')));
    _elementOpenEnd("div");
    var _params = {
      "type": "label",
      "name": "label",
      "prompt": _state.message
    };
    _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
    _elementClose("div");
    _elementOpenStart("div", "");
    _attr("class", "row");
    _elementOpenEnd("div");
    var _array = _state.buttons || [];
    _array.forEach(function(button) {
      _elementOpenStart("span", "");
      _elementOpenEnd("span");
      _elementOpenStart("div", "");
      _attr("class", _state.className);
      _elementOpenEnd("div");
      var _params = {
        "type": "button",
        "naked": "naked",
        "value": button.text,
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
          onCloseDialog.bind(self)(button.text);
        }
      };
      _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
      _elementClose("div");
      _elementClose("span");
    });
    _elementClose("div");
    _elementClose("div");
    _elementClose("div");
    _elementClose("div");
    _elementClose("div");
    _elementClose("div");
    _elementClose("div");
  }
  if (typeof $render === "function") {
    $export.render = $render;
  }
  return $export;
})());