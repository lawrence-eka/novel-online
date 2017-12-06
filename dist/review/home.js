yalla.framework.addComponent("/dist/review/home", (function() {
  var $patchChanges = yalla.framework.renderToScreen;
  var $inject = yalla.framework.createInjector("/dist/review/home");
  var $export = {};
  var $path = "/dist/review/home";
  var _elementName = "dist.review.home";
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
    state.book = props.book;
    state.reviews = [];
    return state;
  }

  function onRead() {
    window.location.hash = "#app/reader.home:folder=upload?bookfiles:file=" + this.state.book.filename.split('.')[0] + ":ext=epub";
  }

  function onClose() {
    window.history.back();
  }

  function formatReview(review) {
    return '"' + review + '"';
  }

  function reviews() {
    console.log(this.state.reviews);
    return this.state.reviews;
  }

  function onPostReview() {
    //debugger;
    var e = this.target.form.elements;
    var self = this;
    var review = {
      review: e.review.value,
      stars: e.stars.value,
      bookId: this.state.book.id,
      personId: storage.me.read().id,
    }
    console.log(review);
    console.log(self.state.reviews);
    dpd.reviews.post(review, function(result) {
      window.location.reload();
    })
  }

  function loadData() {
    var self = this;
    //debugger;
    return new Promise(function(resolve) {
      loadBook.bind(self)()
        .then(loadReview.bind(self))
        .then(function(reviews) {
          resolve(self.state.book);
        });
    });
  }

  function loadBook() {
    var self = this;
    return new Promise(function(resolve) {
      if (!self.state.book) {
        return
      } else if (typeof self.state.book == 'object') {
        resolve(self.state.book)
        return;
      }
      dpd.books.get(self.state.book, function(book, err) {
        self.state.book = book;
        if (self.state.book.subjects) {
          self.state.book.genre = '';
          self.state.book.subjects.forEach(function(s) {
            self.state.book.genre += ((self.state.book.genre ? ',  ' : '') + s)
          })
        }
        resolve(self.state.book);
        //				dpd.reviews.post({bookId:'07c143d7ee32f9ac', personId:'db6bf76fa4a4dafe', stars:Math.round(Math.random() * 50)/10, review:'It really blows my mind!'});
        //				dpd.reviews.post({bookId:'07c143d7ee32f9ac', personId:'36d83f1119ee6a27', stars:Math.round(Math.random() * 50)/10, review:'It really blows my mind!'});
        //				dpd.reviews.post({bookId:'07c143d7ee32f9ac', personId:'becd2c438a34d86a', stars:Math.round(Math.random() * 50)/10, review:'It really blows my mind!'});
        //				dpd.reviews.post({bookId:'07c143d7ee32f9ac', personId:'5ca89f884652488a', stars:Math.round(Math.random() * 50)/10, review:'It really blows my mind!'});
        //				dpd.reviews.post({bookId:'07c143d7ee32f9ac', personId:'c3c0c9953816bb34', stars:Math.round(Math.random() * 50)/10, review:'It really blows my mind!'});
        //				dpd.reviews.post({bookId:'07c143d7ee32f9ac', personId:'a1d7900b6708ebe6', stars:Math.round(Math.random() * 50)/10, review:'It really blows my mind!'});
        //				dpd.reviews.post({bookId:'07c143d7ee32f9ac', personId:'eab838164b7b684c', stars:Math.round(Math.random() * 50)/10, review:'It really blows my mind!'});
        //				dpd.reviews.post({bookId:'07c143d7ee32f9ac', personId:'a4c7d447bdba295e', stars:Math.round(Math.random() * 50)/10, review:'It really blows my mind!'});
        //				dpd.reviews.post({bookId:'07c143d7ee32f9ac', personId:'564462bdbd037800', stars:Math.round(Math.random() * 50)/10, review:'It really blows my mind!'});
      });
    })
  }

  function loadReview(book) {
    var self = this;
    return new Promise(function(resolve) {
      dpd.reviews.get({
        bookId: book.id,
        includeNames: true,
        $sort: {
          stars: -1,
          date: -1
        }
      }, function(reviews) {
        self.state.reviews = reviews;
        resolve(reviews);
      })
    });
  }

  function $render(_props, _slotView) {
    _context["rating"] = $inject("/rating/home");
    var rating = _context["rating"];
    _context["entry"] = $inject("/component/entry");
    var entry = _context["entry"];
    _context["thumb"] = $inject("/book-list/book-block");
    var thumb = _context["thumb"];
    _context["text"] = $inject("/review/text");
    var text = _context["text"];
    _context["line"] = $inject("/component/horizontal-line");
    var line = _context["line"];
    _elementOpenStart("div", "");
    _attr("element", "dist.review.home");
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
        var _params = {
          "unlimitedtitlewidth": "unlimitedtitlewidth",
          "book": _state.book,
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
            onRead.bind(self)();
          }
        };
        _context["thumb"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
        _elementClose("div");
        _elementOpenStart("div", "");
        _attr("class", "row book-row-centered");
        _elementOpenEnd("div");
        var _params = {
          "name": "rating",
          "value": _state.book.stars,
          "max": "5",
          "showtext": "showtext",
          "readonly": "readonly"
        };
        _context["rating"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
        _elementClose("div");
        _elementOpenStart("div", "");
        _attr("class", "row");
        _elementOpenEnd("div");
        var _params = {
          "type": "button",
          "value": "Read This!",
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
            onRead.bind(self)();
          }
        };
        _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
        var _params = {
          "type": "button",
          "value": "Close",
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
            onClose.bind(self)();
          }
        };
        _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
        _elementClose("div");
        var _params = {
          "type": "label",
          "naked": "naked",
          "prompt": "Author",
          "value": _state.book.creator
        };
        _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
        var _params = {
          "type": "label",
          "naked": "naked",
          "prompt": "Year",
          "value": _state.book.date ? _state.book.date : '-'
        };
        _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
        var _params = {
          "type": "label",
          "naked": "naked",
          "prompt": "Genre",
          "value": _state.book.genre ? _state.book.genre : '-'
        };
        _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
        var _params = {
          "type": "label",
          "naked": "naked",
          "prompt": "Description",
          "value": _state.book.description ? _state.book.description : '-',
          "collapsible": "collapsible"
        };
        _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
        _elementOpenStart("form", "");
        _elementOpenEnd("form");
        var _params = {
          "type": "textarea",
          "naked": "naked",
          "prompt": "Your Review",
          "name": "review"
        };
        _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
        _elementOpenStart("div", "");
        _attr("style", "margin-bottom:10px;");
        _elementOpenEnd("div");
        _elementClose("div");
        var _params = {
          "type": "label",
          "naked": "naked",
          "prompt": "Your Rating"
        };
        _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
        _elementOpenStart("div", "");
        _attr("style", "font-size:2em;text-align:center;");
        _elementOpenEnd("div");
        var _params = {
          "name": "stars",
          "value": _state.book.stars,
          "max": "5",
          "showtext": "showtext",
          "textstyle": "font-size:0.75em"
        };
        _context["rating"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
        _elementClose("div");
        var _params = {
          "type": "button",
          "naked": "naked",
          "value": "Post Review",
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
            onPostReview.bind(self)();
          }
        };
        _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
        _elementClose("form");
        _elementOpenStart("div", "");
        _attr("style", "margin-bottom:10px");
        _elementOpenEnd("div");
        _elementClose("div");
        var _params = {
          "type": "label",
          "naked": "naked",
          "prompt": _state.reviews.length ? 'What Others Said' : 'No review yet'
        };
        _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
        var _array = _state.reviews || [];
        _array.forEach(function(r) {
          _elementOpenStart("div", "");
          _elementOpenEnd("div");
          var _params = {
            "type": "label",
            "naked": "naked",
            "prompt": (r.firstName + ' ' + r.lastName + ':').toTitleCase()
          };
          _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
          _elementOpenStart("div", "");
          _attr("style", "font-size:0.75em;");
          _elementOpenEnd("div");
          var _params = {
            "name": "rating",
            "value": r.stars,
            "max": "5",
            "readonly": "readonly"
          };
          _context["rating"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
          _elementClose("div");
          var _params = {
            "type": "label",
            "naked": "naked",
            "value": formatReview.bind(self)(r.review),
            "collapsible": "collapsible"
          };
          _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
          var _params = {};
          _context["line"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
          _elementClose("div");
        });
      }
      var promise = loadData.bind(self)();
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