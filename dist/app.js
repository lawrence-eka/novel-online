yalla.framework.addComponent("/dist/app", (function() {
  var $patchChanges = yalla.framework.renderToScreen;
  var $inject = yalla.framework.createInjector("/dist/app");
  var $export = {};
  var $path = "/dist/app";
  var _elementName = "dist.app";
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

    state.hideHomeButton = (window.location.hash == mainMenuPath);
    state.additionalIcons = homeButton(state.hideHomeButton);
    state.atHome = (window.location.hash == mainMenuPath);
    state.mainMenu = null;
    state.userActivatedMenuSetName = '';
    state.forceOpenDrawer = null;
    state.dialog = {
      show: false,
    }
    return state;
  }

  function onPropertyChange(props) {
    if (props.mainMenu) {
      this.menu = props.mainMenu.newValue;
    }
  }

  function homeButton(hideHomeButton) {
    if (!hideHomeButton) {
      return [{
        icon: "fa fa-home normal-icon pull-right",
        name: "close",
        click: function() {
          window.location.hash = mainMenuPath;
        }
      }, ];
    } else return [];
  }

  this.popupManager = null;
  this.navbarManager = null;
  this.dialogManager = null;

  function checkCurrentUser() {
    setManagers.bind(this)();
    return storage.me.read();
  }

  function onCreated() {
    document.body.className = "body-no-background";
    this.state.navbar = document.getElementsByName('navbarMain')[0];
    this.state.navbar.classList.add('show-navbar');
  }

  function setManagers() {
    //console.log('app set managers')
    var self = this;

    function NavbarManager() {
      this.set = function(menu, additionalIcons, showHomeButton) {
        self.state.mainMenu = menu;
        self.state.hideHomeButton = !showHomeButton;
        self.state.additionalIcons = additionalIcons.concat(homeButton(self.state.hideHomeButton));
        $patchChanges('navbarMain');
      }

      this.mainMenu = function(menu) {
        self.state.mainMenu = menu;
        $patchChanges('navbarMain');
      }

      this.additionalIcons = function(icons, showHomeButton) {
        self.state.hideHomeButton = !showHomeButton;
        self.state.additionalIcons = icons.concat(homeButton(self.state.hideHomeButton));
        $patchChanges('navbarMain');
      }

      this.patchChanges = function() {
        $patchChanges('navbarMain');
      }

      this.removeAdditionalIcons = function(iconName) {
        if (iconName) self.state.additionalIcons = self.state.additionalIcons.filter(function(i) {
          return i.name != iconName
        });
        else {
          self.state.hideHomeButton = (window.location.hash == mainMenuPath);
          self.state.additionalIcons = homeButton(self.state.hideHomeButton);
        }
        $patchChanges('navbarMain');
      }

      this.isNavbarVisible = function() {
        return !self.state.navbar.classList.contains('hide-navbar');
      }

      this.showMenu = function(menuName) {
        self.state.userActivatedMenuSetName = menuName;
        self.state.forceOpenDrawer = Math.random();
        $patchChanges('navbarMain');
      }

      this.toggleNavbar = function() {
        self.state.navbar.classList.toggle('hide-navbar');
      }

    }

    function PopupManager() {
      var popup = [];

      this.create = function(child, isScrollable, additionalClassName) {
        var panel = document.createElement('div');
        popup.push(panel);
        var universe = document.getElementsByName('universe')[0];
        var panels = universe.children;
        panels[panels.length - 1].classList.add('blur');
        panels[panels.length - 1].classList.remove('not-blur');

        universe.appendChild(panel);
        panel.classList.add("container", "centered-form", (isScrollable ? "popupContainerScrollable" : "popupContainer"), additionalClassName);
        panel.style.visibility = 'visible';
        panel.appendChild(child);
        return panel;
      }

      this.close = function(afterClosing) {
        doClose = function(afterClosing) {
          document.getElementsByName('universe')[0].removeChild(popup.splice(-1)[0]);
          afterClosing();
        }

        var panel = popup[popup.length - 1];
        panel.classList.add('custom-fadeout-anim');

        var panels = document.getElementsByName('universe')[0].children;
        panels[panels.length - 2].classList.add('not-blur');
        panels[panels.length - 2].classList.remove('blur');
        if (afterClosing) setTimeout(doClose.bind(this, afterClosing), 250);
      }
    }

    function DialogManager() {
      hide = function(event) {
        self.state.dialog.clientResult(event);
        self.state.dialog.show = false;
      }
      this.show = function(title, message, buttons, onResult, isShow) {
        if (typeof(isShow) == "undefined" || isShow) {
          self.state.dialog.show = true;
          self.state.dialog.message = message;
          self.state.dialog.title = title;
          buttons = buttons || '';
          buttons = buttons.toLowerCase();
          self.state.dialog.yesnocancel = (buttons == 'yesnocancel');
          self.state.dialog.yesno = (buttons == 'yesno');
          self.state.dialog.okcancel = (buttons = 'okcancel');
          self.state.dialog.okonly = (!self.state.dialog.yesnocancel && !self.state.dialog.yesno && !self.state.dialog.okcancel);
          self.state.dialog.onResult = hide;
          self.state.dialog.clientResult = onResult;
          $patchChanges('dialog-box');
        } else onResult();
      }
    }
    popupManager = new PopupManager();
    navbarManager = new NavbarManager();
    dialogManager = new DialogManager();
  }

  document.addEventListener('touchmove', function(event) {
    if (event.scale !== 1) {
      event.preventDefault();
    }
  }, false);
  var lastTouchEnd = 0;
  document.addEventListener('touchend', function(event) {
    var now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);


  function $render(_props, _slotView) {
    _context["navbar"] = $inject("/component/navbar");
    var navbar = _context["navbar"];
    _context["dialog"] = $inject("/component/dialog-box");
    var dialog = _context["dialog"];
    _elementOpenStart("div", "");
    _attr("element", "dist.app");
    _attr("class", "container custom-std-anim");
    _attr("name", "universe");
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
    _attr("name", "motherNature");
    _attr("class", "body-no-background");
    _elementOpenEnd("div");
    (function(domNode) {
      var node = domNode.element;
      var self = {
        target: node
      };
      self.properties = _props;
      if ('elements' in self.target) {
        self.elements = self.target.elements;
      }
      self.currentTarget = self.target;
      self.component = _component;
      self.component._state = self.component._state || {};
      self.state = self.component._state;

      function asyncFunc_1(data) {
        _elementOpenStart("span", "");
        _elementOpenEnd("span");
        yalla.framework.registerRef("navbarMain", IncrementalDOM.currentElement(), function() {
          var _params = {
            "name": "navbarMain",
            "forceOpenDrawer": _state.forceOpenDrawer,
            "activemenuset": _state.userActivatedMenuSetName,
            "mainMenu": _state.mainMenu,
            "additionalicons": _state.additionalIcons
          };
          _context["navbar"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
        })()
        _elementClose("span");
        _elementOpenStart("span", "");
        _elementOpenEnd("span");
        yalla.framework.registerRef("dialog-box", IncrementalDOM.currentElement(), function() {
          if (_state.dialog && _state.dialog.show) {
            var _params = {
              "title": _state.dialog.title,
              "message": _state.dialog.message,
              "yesnocancel": _state.dialog.yesnocancel,
              "yesno": _state.dialog.yesno,
              "okcancel": _state.dialog.okcancel,
              "okonly": _state.dialog.okonly,
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
                _state.dialog.onResult.bind(self)(event);
              }
            };
            _context["dialog"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
          }
        })()
        _elementClose("span");
        if (_state.atHome) {
          _elementOpenStart("div", "");
          _attr("class", "row row-centered");
          _elementOpenEnd("div");
          _elementOpenStart("div", "");
          _attr("class", "col-xs-12 col-sm-6 col-md-4 col-lg-3 col-centered");
          _attr("style", "width:99%");
          _elementOpenEnd("div");
          _elementOpenStart("img", "");
          _attr("src", "/asset/img/image6.jpg");
          _attr("class", "custom-main-menu-image");
          _elementOpenEnd("img");
          _elementClose("img");
          _elementClose("div");
          _elementClose("div");
        }
        _slotView("default", {});
      }
      var promise = checkCurrentUser.bind(self)();
      if (promise && typeof promise == "object" && "then" in promise) {
        _skip();
        promise.then(function(_result) {
          $patchChanges(node, function() {
            asyncFunc_1.call(self, _result)
          });
        }).catch(function(err) {
          console.log(err);
        });
      } else {
        asyncFunc_1.call(self, promise)
      }
    })({
      element: IncrementalDOM.currentElement(),
      pointer: IncrementalDOM.currentPointer()
    });
    _elementClose("div");
    _elementClose("div");
  }
  if (typeof $render === "function") {
    $export.render = $render;
  }
  return $export;
})());