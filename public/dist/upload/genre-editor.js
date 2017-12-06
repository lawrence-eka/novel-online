yalla.framework.addComponent("/dist/upload/genre-editor", (function() {
  var $patchChanges = yalla.framework.renderToScreen;
  var $inject = yalla.framework.createInjector("/dist/upload/genre-editor");
  var $export = {};
  var $path = "/dist/upload/genre-editor";
  var _elementName = "dist.upload.genre-editor";
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

    if (typeof(props.genres) != 'string') {
      state.genres = uniquify(props.genres) || [];
    } else {
      state.genres = uniquify(props.genres.split(',').map(function(x) {
        return x.trim()
      }));
    }
    state.genresString = state.genres.join(',');
    state.hideButton = props.hideButton
    return state;
  }

  function onPropertyChange(props) {}

  function onDelete(genre) {
    this.state.genres = this.state.genres.filter(function(g) {
      return g != genre
    });
    this.state.genresString = this.state.genres.join(',');
    $patchChanges();
  }

  function onAddGenre() {
    this.state.genres = uniquify(this.state.genres.concat(this.state.genreField.value.split(',').map(function(x) {
      return x.trim().toTitleCase();
    }).filter(function(x) {
      return x != ""
    })));
    this.state.genresString = this.state.genres.join(',');
    this.state.genreField.value = '';
    $patchChanges();
  }

  function onGenreFieldCreated() {
    this.state.genreField = this.target;
  }

  function loadGenres() {
    return new Promise(function(resolve) {
      dpd.genres.get({
        isApproved: true,
        $fields: {
          genre: 1
        }
      }, function(genres) {
        genres = genres.map(function(g) {
          return {
            label: g.genre,
            value: g.genre
          }
        });
        resolve(genres);
      })
    })
  }

  function uniquify(a) {
    var b = [];
    if (a && a.length) {
      a.forEach(function(e) {
        if (b.indexOf(e) < 0) b.push(e);
      });
    }
    return b;
  }

  function $render(_props, _slotView) {
    _context["entry"] = $inject("/component/entry");
    var entry = _context["entry"];
    _context["line"] = $inject("/component/horizontal-line");
    var line = _context["line"];
    _elementOpenStart("div", "");
    _attr("element", "dist.upload.genre-editor");
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
    if (_props.prompt) {
      _elementOpenStart("div", "");
      _attr("class", "row");
      _elementOpenEnd("div");
      _elementOpenStart("div", "");
      _attr("class", "col col-xs-12 col-sm-12 col-md-12 col-lg-12");
      _elementOpenEnd("div");
      var _params = {
        "type": "label",
        "naked": "naked",
        "prompt": _props.prompt
      };
      _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
      _elementClose("div");
      _elementClose("div");
    }
    _elementOpenStart("div", "");
    _attr("class", "row");
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
        var _params = {
          "type": "hidden",
          "name": _props.name,
          "value": _state.genresString
        };
        _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
        var _params = {
          "type": "lookup",
          "entries": data,
          "oncreated": function(event) {
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
            onGenreFieldCreated.bind(self)();
          },
          "multiple": "multiple",
          "onfocusout": function(event) {
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
            onAddGenre.bind(self)();
          },
          "divClass": "col col-xs-12 col-sm-12 col-md-12 col-lg-12"
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
    _elementClose("div");
    var _array = _state.genres || [];
    _array.forEach(function(genre) {
      _elementOpenStart("span", "");
      _elementOpenEnd("span");
      _elementOpenStart("div", "");
      _attr("class", "row");
      _elementOpenEnd("div");
      _elementOpenStart("i", "");
      _attr("class", "fa fa-times col col-xs-1 col-sm-1 col-md-1 col-lg-1");
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
        onDelete.bind(self)(genre);
      });
      _elementOpenEnd("i");
      _elementClose("i");
      var _params = {
        "type": "label",
        "naked": "naked",
        "value": genre,
        "divClass": "col col-xs-10 col-sm-10 col-md-10 col-lg-10 pull-left",
        "style": "padding-left: 0 !important;",
        "elementStyle": "margin-bottom:0 !important"
      };
      _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
      _elementClose("div");
      _elementOpenStart("div", "");
      _attr("class", "row");
      _attr("style", "height:1px !important");
      _elementOpenEnd("div");
      _elementOpenStart("div", "");
      _attr("class", "col col-xs-12 col-sm-12 col-md-12 col-lg-12");
      _elementOpenEnd("div");
      var _params = {
        "bottom": "5",
        "align": "center",
        "width": "100",
        "background": "#fff"
      };
      _context["line"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
      _elementClose("div");
      _elementClose("div");
      _elementClose("span");
    });
    _elementClose("div");
  }
  if (typeof $render === "function") {
    $export.render = $render;
  }
  return $export;
})());