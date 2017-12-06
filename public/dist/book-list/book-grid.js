yalla.framework.addComponent("/dist/book-list/book-grid", (function() {
  var $patchChanges = yalla.framework.renderToScreen;
  var $inject = yalla.framework.createInjector("/dist/book-list/book-grid");
  var $export = {};
  var $path = "/dist/book-list/book-grid";
  var _elementName = "dist.book-list.book-grid";
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
    //console.log(props);
    return {
      currentTitle: 'Fetching Data...',
      title: props.title,
      titlenobook: props.titlenobook,
      titleothersbooks: props.titleothersbooks,
      books: null,
      othersbooks: null,
      filter: null,
    };
  }

  function onApplyFilter(event) {
    this.state.filter = event.data;
    console.log(this.state.filter);
    $patchChanges();
  }

  function loadBooks(manage) {
    var self = this;

    return new Promise(function(resolve) {
      var query = {
        manage: manage,
      }

      if (self.state.filter) {
        query.search = self.state.filter;
        console.log(query.search);
      }

      dpd.books.get(query, function(books, err) {
        self.state.currentTitle = books.length ? self.state.title : self.state.titlenobook;
        $patchChanges('title');
        if (self.state.titleothersbooks) {
          self.state.books = books.filter(function(b) {
            return b.uploaderId == storage.me.read().id;
          });
          self.state.othersbooks = books.filter(function(b) {
            return b.uploaderId != storage.me.read().id;
          });
        } else {
          self.state.books = books;
          self.state.othersbooks = null;
        }
        resolve(self.state.books);
      });
    })
  }

  function onClick(event) {
    this.emitEvent("click", event.data);
  }

  function $render(_props, _slotView) {
    _context["book-block"] = $inject("/book-list/book-block");
    var bookBlock = _context["book-block"];
    _context["entry"] = $inject("/component/entry");
    var entry = _context["entry"];
    _context["filter"] = $inject("/book-list/filter-sort");
    var filter = _context["filter"];
    _elementOpenStart("div", "");
    _attr("element", "dist.book-list.book-grid");
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
    if (_props.filterable) {
      var _params = {
        "onapply": function(event) {
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
          onApplyFilter.bind(self)(event);
        }
      };
      _context["filter"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
    }
    _elementOpenStart("div", "");
    _attr("class", "container");
    _elementOpenEnd("div");
    _elementOpenStart("div", "");
    _attr("class", "row");
    _elementOpenEnd("div");
    yalla.framework.registerRef("title", IncrementalDOM.currentElement(), function() {
      var _params = {
        "type": "label",
        "naked": "naked",
        "prompt": _state.currentTitle
      };
      _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
    })()
    _elementClose("div");
    _elementOpenStart("div", "");
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
        _elementOpenStart("div", "");
        _attr("class", "row book-row-centered");
        _elementOpenEnd("div");
        var _array = _state.books || [];
        _array.forEach(function(item) {
          _elementOpenStart("span", "");
          _elementOpenEnd("span");
          var _params = {
            "book": item,
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
              onClick.bind(self)(event);
            }
          };
          _context["book-block"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
          _elementClose("span");
        });
        _elementClose("div");
        if (_state.othersbooks && _state.othersbooks.length) {
          _elementOpenStart("span", "");
          _elementOpenEnd("span");
          _elementOpenStart("div", "");
          _attr("class", "row");
          _elementOpenEnd("div");
          var _params = {
            "type": "label",
            "naked": "naked",
            "prompt": _state.titleothersbooks
          };
          _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
          _elementClose("div");
          _elementOpenStart("div", "");
          _attr("class", "row book-row-centered");
          _elementOpenEnd("div");
          var _array = _state.othersbooks || [];
          _array.forEach(function(item) {
            _elementOpenStart("span", "");
            _elementOpenEnd("span");
            var _params = {
              "book": item,
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
                onClick.bind(self)(event);
              }
            };
            _context["book-block"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
            _elementClose("span");
          });
          _elementClose("div");
          _elementClose("span");
        }
      }
      var promise = loadBooks.bind(self)(_props.manage);
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
    _elementClose("div");
  }
  if (typeof $render === "function") {
    $export.render = $render;
  }
  return $export;
})());