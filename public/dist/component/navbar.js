yalla.framework.addComponent("/dist/component/navbar", (function() {
  var $patchChanges = yalla.framework.renderToScreen;
  var $inject = yalla.framework.createInjector("/dist/component/navbar");
  var $export = {};
  var $path = "/dist/component/navbar";
  var _elementName = "dist.component.navbar";
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

  var isDrawerOpened;
  var doNotCloseDrawer;

  function initState(props) {
    var state = {};
    state.mainMenu = props.mainMenu || mainMenu;
    isDrawerOpened = !(!props.activemenuset);
    state.userActivatedMenuSetName = props.activemenuset;
    state = setActiveMenuSet(state);

    state.additionalIcons = props.additionalicons;
    return state;

  }

  function onPropertyChange(props) {
    var needResetMenuSet = false;
    if (props.additionalicons) {
      this.state.additionalIcons = props.additionalicons.newValue;
    }
    if (props.activemenuset) {
      isDrawerOpened = true;
      this.state.userActivatedMenuSetName = props.activemenuset.newValue;
      needResetMenuSet = true;
    }
    if (props.mainMenu) {
      this.state.mainMenu = props.mainMenu.newValue;
      needResetMenuSet = true;
    }
    if (props.forceOpenDrawer) {
      isDrawerOpened = true;
      needResetMenuSet = true;
    }
    if (needResetMenuSet) {
      this.state = setActiveMenuSet(this.state);
    }
  }

  function setActiveMenuSet(state) {
    state = state || this.state;
    if (state.mainMenu && state.mainMenu().length && state.mainMenu()[0] && state.mainMenu()[0].menu) {
      state.activeMenuSet = state.mainMenu().find(function(m) {
        return state.userActivatedMenuSetName ? m.name == state.userActivatedMenuSetName : m.default
      }) || state.mainMenu()[0];
      state.activeMenu = state.activeMenuSet.menu;
      state.onMenuClicked = state.activeMenuSet.onClick;
    } else {
      state.activeMenu = state.mainMenu;
      state.onMenuClicked = state.mainMenu;
    }
    return state;
  }

  function whatButton() {
    var result = [];
    result.push('fa');
    if (isDrawerOpened) {
      result.push('fa-chevron-up');
    } else {
      result.push('fa-bars');
    }
    result.push('burger-button');
    return result.join(' ');
  }

  function drawerClass() {
    if (isDrawerOpened) return "drawer expand";
    else return "drawer";
  }

  function drawerCover() {
    if (isDrawerOpened) return "screen-cover";
    else return 'screen-uncover';
  }

  function onIconClicked(iconName, isDisabled) {
    if (!isDisabled) this.emitEvent('iconClicked', iconName);
  }

  function onMenuSetIconClicked(menuName, isDisabled) {
    doNotCloseDrawer = true;
    if (menuName != this.state.activeMenuSet.name) {
      this.state.activeMenuSet = this.state.mainMenu().find(function(m) {
        return m.name == menuName
      }) || this.state.mainMenu()[0];
      this.state.activeMenu = this.state.activeMenuSet.menu;
      this.state.onMenuClicked = this.state.activeMenuSet.onClick;
      //debugger;
      $patchChanges("burger");
    }
  }

  function onHamburgerClicked() {
    doNotCloseDrawer = true;
    isDrawerOpened = !isDrawerOpened;
    this.emitEvent('click', isDrawerOpened);
    $patchChanges("burger");
  }

  function hideMenu() {
    if (!doNotCloseDrawer) {
      isDrawerOpened = false;
      $patchChanges("burger");
    } else {
      doNotCloseDrawer = false;
    }
  }

  function $render(_props, _slotView) {
    _elementOpenStart("div", "");
    _attr("element", "dist.component.navbar");
    _attr("name", _props.name);
    _attr("class", "navbar-fixed-top navbar-transition");
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
    yalla.framework.registerRef("burger", IncrementalDOM.currentElement(), function() {
      _elementOpenStart("div", "");
      _attr("class", "custom-navbar navbar-header");
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
        hideMenu.bind(self)();
      });
      _elementOpenEnd("div");
      _elementOpenStart("i", "");
      _attr("class", whatButton.bind(self)());
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
        onHamburgerClicked.bind(self)();
      });
      _elementOpenEnd("i");
      _elementClose("i");
      var _array = _state.additionalIcons || [];
      _array.forEach(function(icon) {
        _elementOpenStart("span", "");
        _elementOpenEnd("span");
        _elementOpenStart("i", "");
        _attr("class", (icon.icon + (icon.disabled ? ' disabled-color' : '')));
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
          icon.click ? icon.click.bind(self)(icon.name, icon.disabled) : onIconClicked.bind(self)(icon.name, icon.disabled);
        });
        _elementOpenEnd("i");
        _elementClose("i");
        _elementClose("span");
      });
      _elementClose("div");
      _elementOpenStart("div", "");
      _attr("class", drawerCover.bind(self)());
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
        hideMenu.bind(self)();
      });
      _elementOpenEnd("div");
      _elementOpenStart("div", "");
      _attr("id", "navbar");
      _attr("class", drawerClass.bind(self)());
      _elementOpenEnd("div");
      if (_state.mainMenu()[0].menu) {
        _elementOpenStart("ul", "");
        _attr("class", "list-group");
        _elementOpenEnd("ul");
        var _array = _state.mainMenu() || [];
        _array.forEach(function(menu) {
          _elementOpenStart("li", "");
          _attr("class", "horizontal-icons");
          _elementOpenEnd("li");
          _elementOpenStart("i", "");
          _attr("class", (menu.icon + (menu.disabled ? ' disabled-color' : menu.name == _state.activeMenuSet.name ? ' active-color' : '')));
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
            onMenuSetIconClicked.bind(self)(menu.name, menu.disabled);
          });
          _elementOpenEnd("i");
          _elementClose("i");
          _elementClose("li");
        });
        _elementClose("ul");
      }
      _elementOpenStart("ul", "");
      _attr("class", "nav navbar-nav menu");
      _elementOpenEnd("ul");
      var _array = _state.activeMenu() || [];
      _array.forEach(function(menu) {
        _elementOpenStart("li", "");
        _elementOpenEnd("li");
        _elementOpenStart("a", "");
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
          _state.onMenuClicked.bind(self)(menu.addr);
        });
        _attr("class", "custom-mouse-pointer");
        _elementOpenEnd("a");
        _text("" + ((menu.long ? menu.long : menu.short)) + "");
        _elementClose("a");
        _elementClose("li");
      });
      _elementClose("ul");
      _elementClose("div");
      _elementClose("div");
    })()
    _elementClose("span");
    _elementClose("div");
  }
  if (typeof $render === "function") {
    $export.render = $render;
  }
  return $export;
})());