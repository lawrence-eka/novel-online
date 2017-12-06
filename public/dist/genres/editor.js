yalla.framework.addComponent("/dist/genres/editor", (function() {
  var $patchChanges = yalla.framework.renderToScreen;
  var $inject = yalla.framework.createInjector("/dist/genres/editor");
  var $export = {};
  var $path = "/dist/genres/editor";
  var _elementName = "dist.genres.editor";
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
      genre: props.genre,
    }
  }

  function loadGenres() {
    var self = this;
    return new Promise(function(resolve) {
      dpd.genres.get({
        isApproved: true,
        id: {
          $ne: self.state.genre.id
        },
        $sort: {
          genre: 1
        }
      }, function(genres) {
        var result = [''];
        genres.forEach(function(genre) {
          if (!result.find(function(r) {
              return r == genre.genre
            })) result.push(genre.genre);
        })
        resolve(result);
      })
    })
  }

  function onSave() {
    var e = this.target.form.elements;
    var self = this;
    var data = {
      id: this.state.genre.id,
      genre: e.genre.value,
      oldGenre: this.state.genre.genre,
      minAge: e.minAge.value || 0,
      isApproved: e.isApproved.checked,
    }
    if (e.mergeWith) data.mergeWith = e.mergeWith.value;

    dpd.genres.post(data, function(result) {
      self.emitEvent('save');
    });
  }

  function onCancel() {
    this.emitEvent('cancel');
  }

  function $render(_props, _slotView) {
    _context["panel"] = $inject("/component/panel");
    var panel = _context["panel"];
    _context["entry"] = $inject("/component/entry");
    var entry = _context["entry"];
    _context["line"] = $inject("/component/horizontal-line");
    var line = _context["line"];
    _elementOpenStart("div", "");
    _attr("element", "dist.genres.editor");
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
    var _params = {
      "title": _props.title,
      "nofooter": "nofooter"
    };
    _context["panel"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {
      if (slotName === "body") {
        _elementOpenStart("div", "");
        _elementOpenEnd("div");
        _elementOpenStart("form", "");
        _elementOpenEnd("form");
        _elementOpenStart("div", "");
        _attr("class", "row");
        _elementOpenEnd("div");
        var _params = {
          "type": "text",
          "prompt": "Genre",
          "name": "genre",
          "value": _props.genre.genre,
          "divClass": "col col-xs-8 col-sm-8 col-md-8 col-lg-8",
          "style": "padding-right:0 !important"
        };
        _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
        var _params = {
          "type": "number",
          "prompt": "Min.Age",
          "name": "minAge",
          "value": _props.genre.minAge,
          "divClass": "col col-xs-4 col-sm-4 col-md-4 col-lg-4 pull-right",
          "style": "padding-left:5px !important; text-align:right"
        };
        _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
        _elementClose("div");
        _elementOpenStart("div", "");
        _attr("class", "row");
        _elementOpenEnd("div");
        if (_props.genre.genre) {
          _elementOpenStart("span", "");
          _elementOpenEnd("span");
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
              var _params = {
                "type": "select",
                "prompt": "Merge With",
                "name": "mergeWith",
                "entries": data,
                "divClass": "col-xs-12 col-sm-12 col-md-12 col-lg-12"
              };
              _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
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
          _elementClose("span");
        }
        var _params = {
          "type": "checkbox",
          "prompt": "Approved",
          "name": "isApproved",
          "checked": _props.genre.isApproved,
          "divClass": "col-xs-12 col-sm-12 col-md-12 col-lg-12"
        };
        _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
        var _params = {
          "type": "button",
          "value": "Save",
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
            onSave.bind(self)();
          },
          "divClass": "col-xs-6 col-sm-6 col-md-6 col-lg-6"
        };
        _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
        var _params = {
          "type": "button",
          "value": "Cancel",
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
            onCancel.bind(self)();
          },
          "divClass": "col-xs-6 col-sm-6 col-md-6 col-lg-6"
        };
        _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
        _elementClose("div");
        _elementClose("form");
        _elementClose("div");
      }
    });
    var _params = {};
    _context["line"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
    _elementClose("div");
  }
  if (typeof $render === "function") {
    $export.render = $render;
  }
  return $export;
})());