yalla.framework.addComponent("/dist/genres/list", (function() {
  var $patchChanges = yalla.framework.renderToScreen;
  var $inject = yalla.framework.createInjector("/dist/genres/list");
  var $export = {};
  var $path = "/dist/genres/list";
  var _elementName = "dist.genres.list";
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
      edited: props.edited,
    }
  }

  function loadGenres() {
    return new Promise(function(resolve) {
      dpd.genres.get({
        $sort: {
          isApproved: 1,
          genre: 1,
        }
      }, function(genres) {
        resolve(genres);
      })
    })
  }

  function onEdit(event) {
    //this.emitEvent('edit', event);
    this.state.edited = event;
    $patchChanges('list');
  }

  function onEndEdit() {
    this.state.edited = null;
    $patchChanges('list');
  }

  function $render(_props, _slotView) {
    _context["entry"] = $inject("/component/entry");
    var entry = _context["entry"];
    _context["line"] = $inject("/component/horizontal-line");
    var line = _context["line"];
    _context["editor"] = $inject("/genres/editor");
    var editor = _context["editor"];
    _elementOpenStart("div", "");
    _attr("element", "dist.genres.list");
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
    _elementOpenEnd("div");
    yalla.framework.registerRef("list", IncrementalDOM.currentElement(), function() {
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
          _elementOpenStart("div", "");
          _attr("style", "font-size: 1.5em;font-weight:700;");
          _elementOpenEnd("div");
          var _params = {
            "type": "label",
            "naked": "naked",
            "prompt": "List of Genres"
          };
          _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
          _elementClose("div");
          var _array = data || [];
          _array.forEach(function(genre) {
            _elementOpenStart("span", "");
            _elementOpenEnd("span");
            if ((!_state.edited || genre.id != _state.edited.id)) {
              _elementOpenStart("span", "");
              _elementOpenEnd("span");
              var _params = {
                "top": "10",
                "width": "100",
                "bottom": "20"
              };
              _context["line"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
              _elementOpenStart("div", "");
              _attr("class", "row");
              _elementOpenEnd("div");
              _elementOpenStart("div", "");
              _attr("class", "col col-xs-8 col-sm-8 col-md-8 col-lg-8");
              _attr("style", "padding-right:0 !important");
              _elementOpenEnd("div");
              var _params = {
                "type": "label",
                "naked": "naked",
                "prompt": "Genre",
                "value": genre.genre
              };
              _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
              _elementClose("div");
              _elementOpenStart("div", "");
              _attr("class", "col col-xs-4 col-sm-4 col-md-4 col-lg-4 pull-right");
              _attr("style", "text-align:right");
              _elementOpenEnd("div");
              var _params = {
                "type": "label",
                "naked": "naked",
                "prompt": "Min.Age",
                "value": genre.minAge
              };
              _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
              _elementClose("div");
              _elementClose("div");
              _elementOpenStart("div", "");
              _attr("class", "row");
              _attr("style", ('text-align:center;color:' + (genre.isApproved ? 'darkblue' : 'darkred')));
              _elementOpenEnd("div");
              var _params = {
                "type": "label",
                "prompt": ('Status: ' + (genre.isApproved ? 'Approved' : 'Proposed'))
              };
              _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
              _elementClose("div");
              var _params = {
                "type": "button",
                "naked": "naked",
                "value": "Edit/Delete",
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
                  onEdit.bind(self)(genre);
                }
              };
              _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
              _elementClose("span");
            }
            if (_state.edited && _state.edited.id == genre.id) {
              var _params = {
                "genre": genre,
                "oncancel": function(event) {
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
                  onEndEdit.bind(self)();
                },
                "onsave": function(event) {
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
                  onEndEdit.bind(self)();
                }
              };
              _context["editor"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
            }
            _elementClose("span");
          });
        }
        var promise = loadGenres.bind(self)();
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
    })()
    _elementClose("div");
    _elementClose("div");
  }
  if (typeof $render === "function") {
    $export.render = $render;
  }
  return $export;
})());