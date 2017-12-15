yalla.framework.addComponent("/dist/writer/chapter-editor-quill", (function() {
  var $patchChanges = yalla.framework.renderToScreen;
  var $inject = yalla.framework.createInjector("/dist/writer/chapter-editor-quill");
  var $export = {};
  var $path = "/dist/writer/chapter-editor-quill";
  var _elementName = "dist.writer.chapter-editor-quill";
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

  //    var quill = null;
  function initState(props) {
    return {
      chapter: props.chapter,
      deleteWhenCancel: (!props.chapter) || (!props.chapter.id),
      quill: null,
      form: null,
    }
  }

  function loadChapter() {
    var self = this;
    return new Promise(function(resolve) {
      if (!self.state.chapter) resolve({});
      else if (typeof(self.state.chapter) == 'object') resolve(self.state.chapter);
      else {
        dpd.chapter.get(self.state.chapter, function(result) {
          self.state.chapter = result;
          resolve(self.state.chapter);
        })
      }
    })
  }

  function onPropertyChange(props) {
    if (props.chapter) {
      this.state.chapter = props.chapter.newValue;
      this.state.deleteWhenCancel = (!this.state.chapter) || (!this.state.chapter.id);
    }
  }

  function initializeQuill(content) {
    //debugger;
    this.state.quill = new Quill('#editor-container', {
      modules: {
        formula: false,
        syntax: false,
        toolbar: '#toolbar-container'
      },
      placeholder: 'Compose an epic...',
      theme: 'snow'
    });
    this.state.quill.clipboard.dangerouslyPasteHTML(this.state.chapter.content || "");
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
    } else {
      navbarManager.removeAdditionalIcons('delete');
    }
    navbarManager.additionalIcons(additionalIcons, true);
    this.state.form = this;
    setTimeout(initializeQuill.bind(this), 0);
  }

  function onSave() {
    var e = this.target.elements;
    var self = this;

    self.state.chapter.seqNo = e.seqNo.value;
    self.state.chapter.title = e.title.value;
    self.state.chapter.content = this.state.quill.editor.scroll.domNode.innerHTML;

    self.state.chapter.printChapterNumber = e.printChapterNumber.checked;
    self.state.chapter.printTitle = e.printTitle.checked;

    if (self.state.chapter.id) {
      dpd.chapters.put(self.state.chapter.id, self.state.chapter, function(result) {
        self.emitEvent('save');
      })
    } else {
      dpd.chapters.post(self.state.chapter, function(result) {
        self.emitEvent('save');
      })
    }
  }

  function onDelete() {
    var self = this;
    dialogManager.show('Confirmation', 'Are you sure to delete this chapter?', 'yesno', function(event) {
      if (!event || event.data == 'yes') {
        if (self.state.chapter.id) {
          dpd.chapters.del(self.state.chapter.id, function(result) {
            self.emitEvent('delete');
          })
        } else {
          self.emitEvent('delete');
        }
      }
    }, chapterHasValue(self.state));
  }

  function chapterHasValue(state) {
    var c = state.chapter;
    var e = state.form.target.elements;
    return (
      c.title ||
      e.title.value ||
      c.content ||
      state.quill.editor.scroll.domNode.innerText.trim()
    );
  }

  function chapterHasChanges(state) {
    var c = state.chapter;
    var e = state.form.target.elements;
    return (
      c.seqNo != e.seqNo.value ||
      c.title != e.title.value ||
      c.printChapterNumber != e.printChapterNumber.checked ||
      c.printTitle != e.printTitle.checked ||
      c.content != state.quill.editor.scroll.domNode.innerHTML.replaceAll(decodeURI("%3Cbr%3E"), decodeURI("%3Cbr/%3E")) ||
      false
    );
  }

  function onCancel() {
    var self = this;
    if (this.state.deleteWhenCancel) onDelete.bind(this)();
    else {
      dialogManager.show('Confirmation', 'Are you sure want to discard pending changes on this chapter?', 'yesno', function(event) {
        if (!event || event.data == 'yes') {
          self.emitEvent('cancel');
        }
      }, chapterHasChanges(this.state));
    }
  }



  function $render(_props, _slotView) {
    _context["entry"] = $inject("/component/entry");
    var entry = _context["entry"];
    _elementOpenStart("div", "");
    _attr("element", "dist.writer.chapter-editor-quill");
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
        _attr("id", "standalone-container");
        _attr("style", "margin-top:-15px; margin-left:-15px; margin-right:-15px; margin-bottom:-10px; height: calc(100vh - 50px); display:flex; flex-direction:column;");
        _elementOpenEnd("div");
        _elementOpenStart("div", "");
        _attr("id", "fields-container");
        _attr("class", "ql-toolbar ql-snow");
        _elementOpenEnd("div");
        var _params = {
          "type": "label",
          "naked": "naked",
          "prompt": "Sequence",
          "class": "custom-entry-prompt pull-left"
        };
        _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
        var _params = {
          "type": "checkbox",
          "traditional": "traditional",
          "prompt": "Print",
          "name": "printChapterNumber",
          "checked": data.printChapterNumber,
          "class": "pull-right",
          "style": "margin-top:1px;"
        };
        _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
        var _params = {
          "type": "number",
          "naked": "naked",
          "name": "seqNo",
          "value": data.seqNo
        };
        _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
        var _params = {
          "type": "label",
          "naked": "naked",
          "prompt": "Title",
          "class": "custom-entry-prompt pull-left"
        };
        _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
        var _params = {
          "type": "checkbox",
          "traditional": "traditional",
          "prompt": "Print",
          "name": "printTitle",
          "checked": data.printTitle,
          "class": "pull-right",
          "style": "margin-top:1px;"
        };
        _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
        var _params = {
          "type": "text",
          "naked": "naked",
          "name": "title",
          "value": data.title
        };
        _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
        _elementClose("div");
        _elementOpenStart("div", "");
        _attr("id", "toolbar-container");
        _elementOpenEnd("div");
        _elementOpenStart("span", "");
        _attr("class", "ql-formats");
        _elementOpenEnd("span");
        _elementOpenStart("select", "");
        _attr("class", "ql-font");
        _elementOpenEnd("select");
        _elementClose("select");
        _elementOpenStart("select", "");
        _attr("class", "ql-size");
        _elementOpenEnd("select");
        _elementClose("select");
        _elementClose("span");
        _elementOpenStart("span", "");
        _attr("class", "ql-formats");
        _elementOpenEnd("span");
        _elementOpenStart("button", "");
        _attr("class", "ql-bold");
        _elementOpenEnd("button");
        _elementClose("button");
        _elementOpenStart("button", "");
        _attr("class", "ql-italic");
        _elementOpenEnd("button");
        _elementClose("button");
        _elementOpenStart("button", "");
        _attr("class", "ql-underline");
        _elementOpenEnd("button");
        _elementClose("button");
        _elementOpenStart("button", "");
        _attr("class", "ql-strike");
        _elementOpenEnd("button");
        _elementClose("button");
        _elementClose("span");
        _elementOpenStart("span", "");
        _attr("class", "ql-formats");
        _elementOpenEnd("span");
        _elementOpenStart("select", "");
        _attr("class", "ql-color");
        _elementOpenEnd("select");
        _elementClose("select");
        _elementOpenStart("select", "");
        _attr("class", "ql-background");
        _elementOpenEnd("select");
        _elementClose("select");
        _elementClose("span");
        _elementOpenStart("span", "");
        _attr("class", "ql-formats");
        _elementOpenEnd("span");
        _elementOpenStart("button", "");
        _attr("class", "ql-script");
        _attr("value", "sub");
        _elementOpenEnd("button");
        _elementClose("button");
        _elementOpenStart("button", "");
        _attr("class", "ql-script");
        _attr("value", "super");
        _elementOpenEnd("button");
        _elementClose("button");
        _elementClose("span");
        _elementOpenStart("span", "");
        _attr("class", "ql-formats");
        _elementOpenEnd("span");
        _elementOpenStart("button", "");
        _attr("class", "ql-header");
        _attr("value", "1");
        _elementOpenEnd("button");
        _elementClose("button");
        _elementOpenStart("button", "");
        _attr("class", "ql-header");
        _attr("value", "2");
        _elementOpenEnd("button");
        _elementClose("button");
        _elementOpenStart("button", "");
        _attr("class", "ql-blockquote");
        _elementOpenEnd("button");
        _elementClose("button");
        _elementOpenStart("button", "");
        _attr("class", "ql-code-block");
        _elementOpenEnd("button");
        _elementClose("button");
        _elementClose("span");
        _elementOpenStart("span", "");
        _attr("class", "ql-formats");
        _elementOpenEnd("span");
        _elementOpenStart("button", "");
        _attr("class", "ql-list");
        _attr("value", "ordered");
        _elementOpenEnd("button");
        _elementClose("button");
        _elementOpenStart("button", "");
        _attr("class", "ql-list");
        _attr("value", "bullet");
        _elementOpenEnd("button");
        _elementClose("button");
        _elementOpenStart("button", "");
        _attr("class", "ql-indent");
        _attr("value", "-1");
        _elementOpenEnd("button");
        _elementClose("button");
        _elementOpenStart("button", "");
        _attr("class", "ql-indent");
        _attr("value", "+1");
        _elementOpenEnd("button");
        _elementClose("button");
        _elementClose("span");
        _elementOpenStart("span", "");
        _attr("class", "ql-formats");
        _elementOpenEnd("span");
        _elementOpenStart("button", "");
        _attr("class", "ql-direction");
        _attr("value", "rtl");
        _elementOpenEnd("button");
        _elementClose("button");
        _elementOpenStart("select", "");
        _attr("class", "ql-align");
        _elementOpenEnd("select");
        _elementClose("select");
        _elementClose("span");
        _elementOpenStart("span", "");
        _attr("class", "ql-formats");
        _elementOpenEnd("span");
        _elementOpenStart("button", "");
        _attr("class", "ql-link");
        _elementOpenEnd("button");
        _elementClose("button");
        _elementOpenStart("button", "");
        _attr("class", "ql-image");
        _elementOpenEnd("button");
        _elementClose("button");
        _elementOpenStart("button", "");
        _attr("class", "ql-video");
        _elementOpenEnd("button");
        _elementClose("button");
        _elementOpenStart("button", "");
        _attr("class", "ql-formula");
        _elementOpenEnd("button");
        _elementClose("button");
        _elementClose("span");
        _elementOpenStart("span", "");
        _attr("class", "ql-formats");
        _elementOpenEnd("span");
        _elementOpenStart("button", "");
        _attr("class", "ql-clean");
        _elementOpenEnd("button");
        _elementClose("button");
        _elementClose("span");
        _elementClose("div");
        _elementOpenStart("div", "");
        _attr("id", "editor-container");
        _attr("style", "flex-grow:1 !important; height:0 !important");
        _elementOpenEnd("div");
        _elementClose("div");
        _elementClose("div");
        _elementClose("form");
      }
      var promise = loadChapter.bind(self)();
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
    _elementClose("div");
  }
  if (typeof $render === "function") {
    $export.render = $render;
  }
  return $export;
})());