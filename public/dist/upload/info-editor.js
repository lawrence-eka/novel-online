yalla.framework.addComponent("/dist/upload/info-editor", (function() {
  var $patchChanges = yalla.framework.renderToScreen;
  var $inject = yalla.framework.createInjector("/dist/upload/info-editor");
  var $export = {};
  var $path = "/dist/upload/info-editor";
  var _elementName = "dist.upload.info-editor";
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
    state.deleteWhenCancel = props.deletewhencancel;
    state.reviews = [];
    state.alert = new Alert(null, $patchChanges, "alert");
    state.editedChapter = null;
    state.form = null;
    return state;
  }

  function onPropertyChange(props) {
    if (props.book) {
      this.state.book = props.book.newValue;
      this.state.editedChapter = null;
      this.state.reviews = [];
    }
    if (props.deletewhencancel) {
      this.state.deleteWhenCancel = props.deletewhencancel.newValue;
    }
  }

  function onFormCreated() {
    var additionalIcons = [{
        icon: "fa fa-save normal-icon",
        name: "save",
        click: onSave.bind(this)
      },
      {
        icon: "fa fa-undo normal-icon",
        name: "cancel",
        click: onCancel.bind(this)
      },
    ];
    if (!this.state.deleteWhenCancel) {
      additionalIcons.push({
        icon: "fa fa-trash-o normal-icon",
        name: "delete",
        click: onDelete.bind(this)
      });
    }
    this.state.formElements = this.target.elements;

    navbarManager.additionalIcons(additionalIcons);
  }

  function loadData() {
    var self = this;
    //debugger;
    return new Promise(function(resolve) {
      loadBook.bind(self)()
        .then(function() {
          //debugger;
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
      });
    })
  }

  function saveBook() {
    var self = this;
    var e = self.state.formElements;
    //debugger;

    return new Promise(function(resolve) {
      self.state.book.title = e.title.value;
      self.state.book.creator = e.creator.value;
      self.state.book.date = e.date.value;
      self.state.book.description = e.description.value;
      self.state.book.subjects = e.subjects.value.split(',').filter(function(s) {
        return s.trim() != ''
      });
      self.state.book.isPublished = e.isPublished.checked;

      if (!self.state.book.filename) {
        dpd.books.post(self.state.book, function(result, err) {
          if (err) {
            console.log('error', err);
          } else {
            self.state.book.filename = result.id + '.epub';
            self.state.book.id = result.id;
            self.state.book.thumb = self.state.book.thumb || (self.state.book.id + '.jpg');
            //saveFile(e.pict.blob, self.state.book.filename, self.state.book.thumb).then(function (result) {
            saveThumb(e.pict.blob, self.state.book.thumb).then(function(result) {
              if (result) {
                self.state.book.thumbFileId = result.add[0].id;
                //self.state.book.thumb = result.add[0].filename.substr(result.add[0].filename.lastIndexOf('/'));
              }
              dpd.books.put(self.state.book.id, self.state.book, function(result) {
                resolve(result);
              });
            })
          }
        })
      } else {
        self.state.book.thumb = self.state.book.thumb || self.state.book.id;
        //saveFile(e.pict.blob, self.state.book.filename, self.state.book.thumb).then(function (result) {
        saveThumb(e.pict.blob, self.state.book.thumb).then(function(result) {
          if (result) {
            self.state.book.thumbFileId = result.add[0].id;
            //self.state.book.thumb = result.add[0].filename.substr(result.add[0].filename.lastIndexOf('/'));
          }
          dpd.books.put(self.state.book.id, self.state.book, function(result) {
            resolve(result);
          });
        })
      }
    });
  }

  function onSave() {
    var self = this;
    saveBook.bind(this)().then(function(result) {
      $patchChanges();
      self.emitEvent('save');
    });
  }

  function onDelete() {
    var self = this;
    dialogManager.show('Confirmation', 'Are you sure to delete this book?', 'yesno', function(event) {
      if (!event || event.data == 'yes') {
        if (!self.state.book.id) {
          self.emitEvent('delete');
          return;
        } else {
          self.emitEvent('delete');
        }
        dpd.books.del(self.state.book.id, function(result) {
          self.emitEvent('delete');
        })
      }
    });
  }

  function onCancel() {
    if (this.state.deleteWhenCancel) onDelete.bind(this)();
    else this.emitEvent('cancel');
  }

  function onEditChapter(event) {
    var self = this;
    saveBook.bind(this)().then(function(result) {
      event.data.bookId = result.id;
      self.state.editedChapter = event.data;
      $patchChanges();
    })
  }

  //function saveFile(img, path, filename) {
  function saveThumb(img, filename) {
    var self = this;
    path = (filename ? filename : 'cover.jpg');
    return new Promise(function(resolve, reject) {
      var fd = new FormData();
      //debugger;
      if (img) {
        /* new way started */
        fd.append("uploadedFile", img.blob, path)
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', '/thumbfiles');
        xhr.onload = function() {
          var response = JSON.parse(this.responseText);

          if (this.status < 300) {
            resolve({
              add: response
            });
          } else {
            reject({
              message: response.message
            });
          }
        };
        xhr.onerror = function(err) {
          reject({
            message: err
          });
        }
        xhr.send(fd);
      } else {
        resolve();
      }
    });
  }

  function onEndEditChapter() {
    this.state.editedChapter = null;
    $patchChanges();
  }

  function $render(_props, _slotView) {
    _context["entry"] = $inject("/component/entry");
    var entry = _context["entry"];
    _context["line"] = $inject("/component/horizontal-line");
    var line = _context["line"];
    _context["genre"] = $inject("/upload/genre-editor");
    var genre = _context["genre"];
    _context["pict"] = $inject("/component/profile-picture/home");
    var pict = _context["pict"];
    _context["chapters"] = $inject("/writer/chapters");
    var chapters = _context["chapters"];
    _context["chapter-editor"] = $inject("/writer/chapter-editor-quill");
    var chapterEditor = _context["chapter-editor"];
    _elementOpenStart("div", "");
    _attr("element", "dist.upload.info-editor");
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
    if (!_state.editedChapter) {
      _elementOpenStart("div", "");
      _elementOpenEnd("div");
      _elementOpenStart("div", "");
      _attr("class", "container custom-std-anim");
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
          _elementOpenStart("form", "");
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
            onFormCreated.bind(self)();
          });
          _elementOpenEnd("form");
          _elementOpenStart("div", "");
          _attr("class", "row book-row-centered");
          _elementOpenEnd("div");
          var _params = {
            "name": "pict",
            "img": 'upload/thumbs/' + _state.book.thumb,
            "quality": "1",
            "ratio": _state.book.isEditable ? 1 : {
              width: 100
            }
          };
          _context["pict"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
          _elementClose("div");
          _elementOpenStart("div", "");
          _attr("class", "row");
          _elementOpenEnd("div");
          var _params = {
            "type": "checkbox",
            "name": "isPublished",
            "prompt": "Published",
            "checked": _state.book.isPublished,
            "style": "padding-left:0 !important"
          };
          _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
          var _params = {
            "type": "text",
            "naked": "naked",
            "name": "title",
            "prompt": "Title",
            "value": _state.book.title
          };
          _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
          var _params = {
            "type": "text",
            "naked": "naked",
            "name": "creator",
            "prompt": "Author",
            "value": _state.book.creator
          };
          _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
          var _params = {
            "type": "text",
            "naked": "naked",
            "name": "date",
            "prompt": "Year",
            "value": _state.book.date
          };
          _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
          var _params = {
            "type": "textarea",
            "naked": "naked",
            "name": "description",
            "prompt": "Description",
            "value": _state.book.description,
            "collapsible": "collapsible"
          };
          _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
          var _params = {
            "prompt": "Genre",
            "name": "subjects",
            "genres": _state.book.subjects
          };
          _context["genre"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
          _elementClose("div");
          _elementClose("form");
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
      if (_state.book.isEditable) {
        _elementOpenStart("div", "");
        _elementOpenEnd("div");
        var _params = {
          "bookId": _state.book.id,
          "onedit": function(event) {
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
            onEditChapter.bind(self)(event);
          }
        };
        _context["chapters"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
        _elementClose("div");
      }
      _elementClose("div");
    }
    if (_state.editedChapter) {
      _elementOpenStart("div", "");
      _elementOpenEnd("div");
      var _params = {
        "chapter": _state.editedChapter,
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
          onEndEditChapter.bind(self)();
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
          onEndEditChapter.bind(self)();
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
          onEndEditChapter.bind(self)();
        }
      };
      _context["chapter-editor"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
      _elementClose("div");
    }
    _elementClose("div");
  }
  if (typeof $render === "function") {
    $export.render = $render;
  }
  return $export;
})());