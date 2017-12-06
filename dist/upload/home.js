yalla.framework.addComponent("/dist/upload/home", (function() {
  var $patchChanges = yalla.framework.renderToScreen;
  var $inject = yalla.framework.createInjector("/dist/upload/home");
  var $export = {};
  var $path = "/dist/upload/home";
  var _elementName = "dist.upload.home";
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

  var setProcessParamsFor = '';

  function initState(props) {
    var state = {};
    state.editedBook = null;
    state.deleteWhenCancel = false;
    state.manage = 'own';
    return state;
  }

  function onEditInfo(event) {
    this.state.editedBook = event.data;
    this.state.deleteWhenCancel = false;
    $patchChanges();
  }

  function onEndEditInfo() {
    this.state.editedBook = null;
    navbarManager.removeAdditionalIcons();
    $patchChanges();
  }

  function onIncludeOthers() {
    this.state.manage = (this.target.form.elements.includeOthers.checked ? 'all' : 'own');
    $patchChanges();
  }

  function onUpload() {
    document.getElementsByName('newBook')[0].click();
  }

  function onBookSelected() {
    var form = this.target.form;
    //var self = this;
    var book = (form.elements.newBook.files[0]);

    var filename = book.name.substring(book.name.lastIndexOf('.') + 1);
    var title = book.name;
    title = (title.lastIndexOf('.') > 0 ? title.substring(0, title.lastIndexOf('.')) : title).toTitleCase()
    form.reset();
    this.state.uploadingBook = {
      book: book,
      filename: filename,
      title: title,
    };
    setProcessParamsFor = title + '.' + filename;
    $patchChanges("processParams");
    //uploadBook.bind(this)();
  }

  function onProcessParamSet(event) {
    setProcessParamsFor = '';
    uploadBook.bind(this)(event.data);
  }

  function uploadBook(processParams) {
    var book = this.state.uploadingBook.book;
    var filename = this.state.uploadingBook.filename;
    var title = this.state.uploadingBook.title;
    var fd = new FormData();
    var self = this;
    dpd.books.post({
      title: title,
      uploaderId: storage.me.read().id,
      identifier: '-'
    }, function(info) {
      filename = info.id + '.' + filename;
      fd.append("uploadedFile", book, filename)
      var xhr = new XMLHttpRequest();
      xhr.open('PUT', '/bookfiles');
      xhr.onload = function() {
        var response = JSON.parse(this.responseText);
        if (this.status < 300) {
          var results = [];
          response.forEach(function(file) {
            file.bookId = info.id;
            file.processParams = processParams;
            dpd.processbook.put(file, file, function(result, err) {
              self.state.editedBook = result;
              self.state.deleteWhenCancel = true;
              $patchChanges();
            })
          });

        } else {
          //console.log(response);
        }
      };
      xhr.onerror = function(err) {
        console.log(err);
      }
      xhr.send(fd);
    })

  }

  function $render(_props, _slotView) {
    _context["panel"] = $inject("/component/panel");
    var panel = _context["panel"];
    _context["entry"] = $inject("/component/entry");
    var entry = _context["entry"];
    _context["home"] = $inject("/component/home-button");
    var home = _context["home"];
    _context["books"] = $inject("/book-list/book-grid");
    var books = _context["books"];
    _context["info"] = $inject("/upload/info-editor");
    var info = _context["info"];
    _context["processParams"] = $inject("/chapter-processor-params/home");
    var processParams = _context["processParams"];
    _elementOpenStart("div", "");
    _attr("element", "dist.upload.home");
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
    if (!_state.editedBook) {
      _elementOpenStart("span", "");
      _elementOpenEnd("span");
      _elementOpenStart("span", "");
      _elementOpenEnd("span");
      yalla.framework.registerRef("processParams", IncrementalDOM.currentElement(), function() {
        if (setProcessParamsFor) {
          var _params = {
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
              onProcessParamSet.bind(self)(event);
            },
            "file": setProcessParamsFor
          };
          _context["processParams"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
        }
      })()
      _elementClose("span");
      var _params = {
        "title": "Upload Book"
      };
      _context["panel"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {
        if (slotName === "body") {
          _elementOpenStart("div", "");
          _elementOpenEnd("div");
          _elementOpenStart("form", "");
          _elementOpenEnd("form");
          var _params = {
            "type": "file",
            "name": "newBook",
            "accept": ('.zip' + (storage.me.read().isAdmin ? ',.epub' : '')),
            "hidden": "hidden",
            "onchange": function(event) {
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
              onBookSelected.bind(self)();
            }
          };
          _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
          _elementOpenStart("div", "");
          _attr("class", "row");
          _elementOpenEnd("div");
          var _params = {
            "type": "button",
            "name": "btnSave",
            "value": "Upload New Book",
            "divClass": "col-xs-12 col-sm-12 col-md-12 col-lg-12",
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
              onUpload.bind(self)();
            }
          };
          _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
          _elementClose("div");
          _elementClose("form");
          _elementClose("div");
        }
      });
      if (storage.me.read().isAdmin) {
        _elementOpenStart("div", "");
        _attr("style", "text-align:center");
        _elementOpenEnd("div");
        _elementOpenStart("form", "");
        _elementOpenEnd("form");
        var _params = {
          "type": "checkbox",
          "name": "includeOthers",
          "prompt": "Manage Other's Books",
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
            onIncludeOthers.bind(self)();
          }
        };
        _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
        _elementClose("form");
        _elementClose("div");
      }
      _elementOpenStart("span", "");
      _elementOpenEnd("span");
      yalla.framework.registerRef("booklist", IncrementalDOM.currentElement(), function() {
        var _params = {
          "title": "Your Books:",
          "titlenobook": "You haven't uploaded any book yet.",
          "titleothersbooks": "Other's Books:",
          "manage": _state.manage,
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
            onEditInfo.bind(self)(event);
          }
        };
        _context["books"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
      })()
      _elementClose("span");
      _elementClose("span");
    }
    if (_state.editedBook) {
      _elementOpenStart("span", "");
      _elementOpenEnd("span");
      var _params = {
        "book": _state.editedBook,
        "deletewhencancel": _state.deleteWhenCancel,
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
          onEndEditInfo.bind(self)();
        },
        "ondelete": function(event) {
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
          onEndEditInfo.bind(self)();
        },
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
          onEndEditInfo.bind(self)();
        }
      };
      _context["info"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
      _elementClose("span");
    }
    _elementClose("div");
  }
  if (typeof $render === "function") {
    $export.render = $render;
  }
  return $export;
})());