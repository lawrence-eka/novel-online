yalla.framework.addComponent("/dist/component/entry-naked", (function() {
  var $patchChanges = yalla.framework.renderToScreen;
  var $inject = yalla.framework.createInjector("/dist/component/entry-naked");
  var $export = {};
  var $path = "/dist/component/entry-naked";
  var _elementName = "dist.component.entry-naked";
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
  /**/
  function initState(props) {
    //debugger;
    var state = {};
    if (props.alert) props.alert.onError.subscribe(errorSelector.bind(this));
    state.name = props.name;
    state.error = null;
    state.alias = props.alias;
    state.entries = props.entries;

    state.lookupDelimiter = props.lookupDelimiter;
    state.multiple = props.multiple;

    //if(props.collapsible) debugger;
    state.collapsible = !(!props.collapsible);
    state.collapsedWords = state.collapsible ? isNaN(props.collapsible) ? 20 : props.collapsible : 0;

    state.valueLong = props.value;
    if (state.valueLong && typeof(state.valueLong) == 'string') state.valueLong = state.valueLong.replace(/<(?:.|\n)*?>/gm, ' ');

    state.valueShort = state.collapsible && state.valueLong ? state.valueLong.split(/(\s+)/).filter(function(b) {
      return b.trim()
    }).slice(0, state.collapsedWords).join(' ') : state.valueLong;
    //state.valueShort = state.collapsible && state.valueLong? state.valueLong.split(' ').slice(0, state.collapsedWords).join(' ') : state.valueLong;
    state.valueShort += (state.valueLong && state && state.valueLong.length > state.valueShort.length ? '...' : '');
    state.collapsible = state.collapsible && (state.valueShort != state.valueLong);
    state.collapsed = true;
    state.rich = props.rich;

    return state;
  }

  function onPropertyChange(props) {
    var state = this.state;

    if (props.value) state.valueLong = props.value.newValue;

    state.valueShort = state.collapsible && state.valueLong ? state.valueLong.split(' ').slice(0, state.collapsedWords).join(' ') : state.valueLong;
    state.valueShort += (state.valueLong && state && state.valueLong.length > state.valueShort.length ? '...' : '');
    state.collapsible = state.collapsible && (state.valueShort != state.valueLong);
    state.collapsed = true;
  }

  function copyTextToTextArea(editor) {
    this.state.textArea.value = editor.nicInstances[0].getContent();
    //console.log(this.state.textArea.value);
    //console.log(nicEditors.editors);
  }

  function onTextAreaCreated() {
    if (this.state.rich) {
      this.state.textArea = this.target;
      var editors = nicEditors.allTextAreas({
        minHeight: this.target.clientHeight,
        maxHeight: this.target.clientHeight,
        iconsPath: 'asset/js/nicEdit/nicEditorIcons.gif'
      });
      editors[editors.length - 1].addEvent('blur', copyTextToTextArea.bind(this, editors[editors.length - 1]));
    }
  }

  function onExpandText() {
    this.state.collapsed = !this.state.collapsed;
    $patchChanges('collapsible')
  }

  function onSearchFieldCreated() {
    this.state.searchField = this.target;
  }

  function onClearSearchField() {
    this.state.searchField.value = '';
  }

  function onSearchStarted() {
    this.emitEvent('search', this.state.searchField.value);
  }

  function initAwesomplete(value) {
    setTimeout(actualInitAwesomplete.bind(this, value), 100);
  }

  function actualInitAwesomplete(value) {
    var options = {
      list: this.state.entries
    };
    if (this.state.multiple) {
      options.filter = function(text, input) {
        return Awesomplete.FILTER_CONTAINS(text, input.match(/[^,]*$/)[0]);
      };
      options.item = function(text, input) {
        return Awesomplete.ITEM(text, input.match(/[^,]*$/)[0]);
      };
      options.multiple = true;
    }
    var as = new Awesomplete(this.target, options);
    this.target.addEventListener('awesomplete-select', onAwesompleteSelect.bind(this));
    this.state.awesompleteField = this.target;

    as.replace = awesompleteReplace.bind(this);
    if (as._list.length > 0 && as._list[0].label && as._list[0].value) {
      var item = (as._list.find(function(x) {
        return x.value == value
      }));
      if (item) {
        as.input.value = item.label;
      } else {
        as.input.value = ''
      }
    } else {
      as.input.value = value;
    }
    this.emitEvent('created');
  }

  function registerLookupField() {
    this.state.lookupField = this.target;
  }

  function awesompleteReplace(text) {
    var t = text;
    if (this.state.lookupDelimiter) {
      t = text.label.split(this.state.lookupDelimiter);
      t.splice(-1)
      t = t.join(this.state.lookupDelimiter);
    } else if (this.state.multiple) {
      var before = this.target.value.match(/^.+,\s*|/)[0];
      t = before + t + ", ";
    }
    this.target.value = t;
  }

  function onAwesompleteSelect(event) {
    //debugger;
    this.state.lookupField.value = event.text.value ? event.text.value : event.text;
    //document.getElementsByName(this.state.name)[0].value = event.text.value ? event.text.value : event.text;
    this.emitEvent('lookupSelected', event.text);
  }

  function calculateRootStyle(margin) {
    var s = margin ? 'margin-right:' + margin : '';
    return s;
  }

  function onCreated() {
    if (this.properties.alert) this.properties.alert.onError.subscribe(errorSelector.bind(this.target));
  }

  function errorSelector(errors) {
    this._state.error = null;
    if (errors) {
      for (var i in errors) {
        if ((this._state.name && errors[i].name == this._state.name) || (this._state.alias && errors[i].name == this._state.alias)) {
          this._state.error = errors[i].message;
          errors.splice(i, 1);
          //return;
        }
      }
    }
  }

  function setValue(value, min, max) {
    if (typeof(value) != 'undefined' && min && (value < min)) return min;
    else if (typeof(value) != 'undefined' && max && (value > max)) return max;
    else if (typeof(value) != 'undefined') return value;
    else return '';
  }

  function isGeneric(type) {
    return ('|textarea|label|checkbox|hyperlink|select|lookup|search|'.indexOf('|' + type + '|') < 0);
  }

  function onHyperlinkClick() {
    this.emitEvent('click');
  }

  function onPromptClick() {
    this.emitEvent('click');
  }

  function onButtonClicked() {
    this.emitEvent('click');
  }

  function onFocusOut() {
    this.emitEvent("focusout");
  }

  function onChange() {
    this.emitEvent("change", this.target.value);
  }

  function onKeyUp() {
    this.emitEvent("keyUp", this.target.value);
  }

  function onCheckboxClick(event) {
    //debugger;
    this.emitEvent("click", this.target.checked);
  }


  function $render(_props, _slotView) {
    _elementOpenStart("span", "");
    _attr("element", "dist.component.entry-naked");
    _attr("style", calculateRootStyle.bind(self)(_props.margin));
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
    if ((_props.glyph || _props.prompt) && ((_props.type) == 'label' || ((_props.type) != 'checkbox' && (_props.type) != 'hyperlink' && (_props.type) != 'hidden'))) {
      _elementOpenStart("label", "");
      _attr("class", ((_props.class ? _props.class : 'custom-entry-prompt' + (_props.deleted ? ' custom-deleted-text' : ''))));
      _attr("style", _props.elementStyle);
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
        onPromptClick.bind(self)();
      });
      _elementOpenEnd("label");
      _text("" + ((_props.prompt || _props.prompt == 0) ? _props.prompt : '') + "");
      if (_props.glyph) {
        _elementOpenStart("span", "");
        _attr("class", 'glyphicon glyphicon-' + _props.glyph);
        _elementOpenEnd("span");
        _elementClose("span");
      }
      _elementClose("label");
    }
    if ((typeof(_props.value) != 'undefined') && ((_props.type) == 'label')) {
      _elementOpenStart("div", "");
      _elementOpenEnd("div");
      yalla.framework.registerRef("collapsible", IncrementalDOM.currentElement(), function() {
        _elementOpenStart("label", "");
        _attr("class", "custom-label-value");
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
          onPromptClick.bind(self)();
        });
        _attr("style", (_state.collapsible ? 'display:inline !important' : '') + ';' + _props.elementStyle);
        _elementOpenEnd("label");
        _text("" + (_state.collapsed ? _state.valueShort : _state.valueLong) + "");
        _elementClose("label");
        if (_state.collapsible) {
          _elementOpenStart("a", "");
          _attr("class", "custom-label-value");
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
            onExpandText.bind(self)();
          });
          _elementOpenEnd("a");
          _text("" + (_state.collapsed ? ' (see more)' : ' (see less)') + "");
          _elementClose("a");
        }
      })()
      _elementClose("div");
    }
    if (isGeneric(_props.type)) {
      _elementOpenStart("input", "");
      _attr("type", _props.type);
      _attr("name", _props.name);
      _attr("class", (_props.class ? _props.class : 'form-control ' + (_props.type == 'button' ? 'btn btn-info btn-block' : 'input-sm')));
      _attr("required", _props.required);
      _attr("placeholder", _props.placeholder);
      _attr("value", setValue.bind(self)(_props.value, _props.min, _props.max));
      _attr("min", _props.min);
      _attr("max", _props.max);
      _attr("accept", _props.accept);
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
        onButtonClicked.bind(self)();
      });
      _attr("onfocusout", function(event) {
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
        onFocusOut.bind(self)();
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
        onChange.bind(self)();
      });
      _attr("onkeyup", function(event) {
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
        onKeyUp.bind(self)();
      });
      _attr("style", (_props.hidden ? 'visibility:hidden; position:absolute; left:0; top:0' : (_props.uppercase ? 'text-transform:uppercase' : _props.elementStyle ? _props.elementStyle : '')));
      _attr("blob", _props.blob);
      _elementOpenEnd("input");
      _elementClose("input");
    }
    if ((_props.type) == 'textarea') {
      _elementOpenStart("textarea", "");
      _attr("name", _props.name);
      _attr("required", _props.required);
      _attr("class", (_props.class || _props.rich) ? _props.class : 'form-control input-sm');
      _attr("onfocusout", function(event) {
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
        onFocusOut.bind(self)();
      });
      _attr("style", _props.areastyle);
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
        onTextAreaCreated.bind(self)();
      });
      _elementOpenEnd("textarea");
      _text("" + ((_props.value ? _props.value : '')) + "");
      _elementClose("textarea");
    }
    if ((_props.type) == 'hyperlink') {
      _elementOpenStart("a", "");
      _attr("href", _props.href);
      _attr("class", (_props.class ? _props.class : 'custom-entry-prompt'));
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
        onHyperlinkClick.bind(self)();
      });
      _elementOpenEnd("a");
      _text("" + (_props.prompt) + "");
      _elementClose("a");
    }
    if ((_props.type) == 'checkbox') {
      _elementOpenStart("div", "");
      _elementOpenEnd("div");
      _elementOpenStart("input", "");
      _attr("type", "checkbox");
      _attr("name", _props.name);
      _attr("id", _props.name);
      _attr("autocomplete", "off");
      _attr("checked", _props.checked);
      _attr("onfocusout", function(event) {
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
        onFocusOut.bind(self)();
      });
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
        onCheckboxClick.bind(self)(event);
      });
      _attr("class", _props.class);
      _attr("style", _props.style);
      _elementOpenEnd("input");
      _elementClose("input");
      if (_props.prompt && _props.traditional) {
        _elementOpenStart("label", "");
        _attr("class", 'custom-label-value ' + _props.class);
        _attr("style", _props.style + '; margin:0 !important; padding-left:2px !important;padding-right:2px !important');
        _elementOpenEnd("label");
        _text("" + (_props.prompt) + "");
        _elementClose("label");
      }
      if (!_props.traditional) {
        _elementOpenStart("div", "");
        _attr("class", "btn-group");
        _attr("onfocusout", function(event) {
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
          onFocusOut.bind(self)();
        });
        _elementOpenEnd("div");
        _elementOpenStart("label", "");
        _attr("for", _props.name);
        _attr("class", "btn btn-default btn-checkbox");
        _elementOpenEnd("label");
        _elementOpenStart("span", "");
        _attr("class", "glyphicon glyphicon-ok");
        _attr("onfocusout", function(event) {
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
          onFocusOut.bind(self)();
        });
        _elementOpenEnd("span");
        _elementClose("span");
        _elementOpenStart("span", "");
        _elementOpenEnd("span");
        _elementClose("span");
        _elementClose("label");
        _elementOpenStart("label", "");
        _attr("for", _props.name);
        _attr("class", "btn btn-default active btn-checkbox");
        _attr("onfocusout", function(event) {
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
          onFocusOut.bind(self)();
        });
        _elementOpenEnd("label");
        _text("" + (_props.prompt) + "");
        _elementClose("label");
        _elementClose("div");
      }
      _elementClose("div");
    }
    if ((_props.type) == 'select') {
      _elementOpenStart("div", "");
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
        onChange.bind(self)();
      });
      _elementOpenEnd("div");
      _elementOpenStart("select", "");
      _attr("class", "form-control input-sm");
      _attr("name", _props.name);
      _attr("required", _props.required);
      _elementOpenEnd("select");
      var _array = _props.entries || [];
      _array.forEach(function(entry) {
        _elementOpenStart("option", "");
        _attr("value", (typeof(entry.value) != 'undefined' ? entry.value : entry));
        _attr("selected", (typeof(entry.value) != 'undefined' ? entry.value : entry) == _props.value);
        _elementOpenEnd("option");
        _text("" + (typeof(entry.text) != 'undefined' ? entry.text : entry) + "");
        _elementClose("option");
      });
      _elementClose("select");
      _elementClose("div");
    }
    if ((_props.type) == 'lookup') {
      _elementOpenStart("div", "");
      _elementOpenEnd("div");
      _elementOpenStart("input", "");
      _attr("class", "form-control input-sm");
      _attr("name", _props.name + '-display');
      _attr("data-minchars", "1");
      _attr("required", _props.required);
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
        initAwesomplete.bind(self)(_props.value);
      });
      _attr("onfocusout", function(event) {
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
        onFocusOut.bind(self)();
      });
      _elementOpenEnd("input");
      _elementClose("input");
      _elementOpenStart("input", "");
      _attr("type", "hidden");
      _attr("name", _props.name);
      _attr("value", _props.value);
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
        registerLookupField.bind(self)();
      });
      _elementOpenEnd("input");
      _elementClose("input");
      _elementClose("div");
    }
    if ((_props.type) == 'search') {
      _elementOpenStart("span", "");
      _elementOpenEnd("span");
      _elementOpenStart("div", "");
      _attr("class", "input-group");
      _elementOpenEnd("div");
      _elementOpenStart("input", "");
      _attr("type", "text");
      _attr("class", "form-control input-sm");
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
        onSearchFieldCreated.bind(self)();
      });
      _elementOpenEnd("input");
      _elementClose("input");
      _elementOpenStart("span", "");
      _attr("class", "input-group-addon custom-input-group-addon");
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
        onClearSearchField.bind(self)();
      });
      _elementOpenEnd("span");
      _elementOpenStart("span", "");
      _attr("class", "fa fa-times");
      _elementOpenEnd("span");
      _elementClose("span");
      _elementClose("span");
      _elementOpenStart("span", "");
      _attr("class", "input-group-addon custom-input-group-addon");
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
        onSearchStarted.bind(self)();
      });
      _elementOpenEnd("span");
      _elementOpenStart("span", "");
      _attr("class", "fa fa-search");
      _elementOpenEnd("span");
      _elementClose("span");
      _elementClose("span");
      _elementClose("div");
      _elementClose("span");
    }
    if ((_props.type) == 'radio') {
      _elementOpenStart("span", "");
      _elementOpenEnd("span");
      _text("<input type");
      _elementClose("span");
    }
    if (_state.error && (_props.type) != 'hidden') {
      _elementOpenStart("label", "");
      _attr("class", "custom-entry-prompt custom-error-text");
      _elementOpenEnd("label");
      _text("" + (_state.error) + "");
      _elementClose("label");
    }
    _elementClose("span");
  }
  if (typeof $render === "function") {
    $export.render = $render;
  }
  return $export;
})());