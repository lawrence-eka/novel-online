yalla.framework.addComponent("/dist/reader/home", (function() {
  var $patchChanges = yalla.framework.renderToScreen;
  var $inject = yalla.framework.createInjector("/dist/reader/home");
  var $export = {};
  var $path = "/dist/reader/home";
  var _elementName = "dist.reader.home";
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

  var tableOfContent = null;
  var tableOfBookmarks = null;
  var tableOfSearchResults = null;

  var fontSize = 1.0;

  function initState(props) {
    var state = {
      epub: props.folder && props.file && props.ext ? props.folder.replaceAll('?', '/') + '/' + props.file + '.' + props.ext : '',
    }

    //Book.open(state.epub); // Books can be opened later
    //debugger;

    return state;
  }

  function onBookListClicked(event) {
    //debugger;
    window.location.hash = "#app/review.home:book=" + event.data.id;
    //this.state.epub = 'upload/bookfiles/' + event.data.filename;
    console.log(this.state.epub);
    $patchChanges('reader');
  }

  function onSearch(event) {
    //console.log('here', event.data);
    var self = this;
    search(event.data).then(function(result) {
      tableOfSearchResults = result;
      updateSearchBarLocation.bind(self)(true);
      navbarManager.showMenu('searchDropDown');
    });

  }

  function search(text) {
    return new Promise(function(resolve) {
      var result = [];
      var promises = [];
      window.reader.book.toc.forEach(function(t) {
        promises.push(window.reader.book.chapter(t.href).loaded);
      });

      Promise.all(promises).then(function(babs) {
        //
        babs.forEach(function(bab) {
          result = result.concat(bab.find(text))
        });
        resolve(result);
      });
    })
  }

  function updateSearchBarLocation(toggle) {
    //var hasNavbar = !this.state.navbar.classList.contains('hide-navbar');
    var hasNavbar = navbarManager.isNavbarVisible();
    //console.log(hasNavbar);
    var hasSearchPanel = !(this.state.searchPanel.classList.contains('panel-slider-closed-no-navbar') || this.state.searchPanel.classList.contains('panel-slider-closed'));
    if (toggle) hasSearchPanel = !hasSearchPanel;
    var searchPanelClass = !hasSearchPanel ? hasNavbar ? 'panel-slider-closed' : 'panel-slider-closed-no-navbar' : !hasNavbar ? 'panel-slider-no-navbar' : '';
    this.state.searchPanel.classList.remove('panel-slider-closed', 'panel-slider-closed-no-navbar', 'panel-slider-no-navbar');
    if (searchPanelClass) this.state.searchPanel.classList.add(searchPanelClass);
  }

  function onCloseIconClicked() {
    window.location.hash = "#app/reader.home";
  }

  function onSearchIconClicked() {
    updateSearchBarLocation.bind(this)(true);
  }

  function onReduceFontIconClicked(iconName, isDisabled) {
    if (isDisabled) return;
    var newFontSize = ((fontSize * 10) - 1) / 10;
    fontSize = newFontSize;
    this.state.additionalIcons.find(function(i) {
      return i.name == 'reduceFont'
    }).disabled = fontSize <= 0.11;
    this.state.additionalIcons.find(function(i) {
      return i.name == 'increaseFont'
    }).disabled = fontSize >= 9.99;
    window.reader.book.setStyle("font-size", fontSize + "em");
  }

  function onIncreaseFontIconClicked(iconName, isDisabled) {
    if (isDisabled) return;
    var newFontSize = ((fontSize * 10) + 1) / 10;
    fontSize = newFontSize;
    this.state.additionalIcons.find(function(i) {
      return i.name == 'reduceFont'
    }).disabled = fontSize <= 0.11;
    this.state.additionalIcons.find(function(i) {
      return i.name == 'increaseFont'
    }).disabled = fontSize >= 9.99;
    window.reader.book.setStyle("font-size", fontSize + "em");
  }

  function onAdjustIconClicked() {
    var page = document.getElementsByName("bookPage")[0];
    page.classList.toggle('custom-book-page-inverted');
    var content = document.getElementsByName("pageContent")[0];
    content.classList.toggle('custom-book-page-content-inverted');
    window.reader.book.setStyle('color', content.classList.contains('custom-book-page-content-inverted') ? 'lightgrey' : 'black');
  }

  function onBookmarkIconClicked() {
    var cfi = window.reader.book.getCurrentLocationCfi();
    var bookmarked = window.reader.isBookmarked(cfi);
    var icon = this.state.additionalIcons.find(function(i) {
      return i.name == 'bookmark'
    });

    if (bookmarked === -1) { //-- Add bookmark
      window.reader.addBookmark(cfi);
      icon.icon = "fa fa-bookmark normal-icon";
      var curPage = window.reader.book.renderer.currentRenderedPage();
      var maxPage = window.reader.book.renderer.pagesInCurrentChapter();
      var spine = window.reader.book.spine.find(function(s) {
        return s.index == window.reader.book.spinePos
      });
      var toc = window.reader.book.toc.find(function(t) {
        return t.spinePos == window.reader.book.spinePos
      });
      var label = (maxPage > 1 ? 'Pg.' + curPage + '/' + maxPage + ' of ' : '');
      label += (label ? '"' : '') + (toc && toc.label ? toc.label : spine.id) + (label ? '"' : '');
      tableOfBookmarks = tableOfBookmarks || [];
      tableOfBookmarks.push({
        label: label,
        addr: cfi,
        cfi: cfi,
      });
    } else { //-- Remove Bookmark
      window.reader.removeBookmark(cfi);
      icon.icon = "fa fa-bookmark-o normal-icon";
      tableOfBookmarks = tableOfBookmarks.filter(function(b) {
        return b.cfi != cfi
      });
    }
  }

  function onLocationChanged(data) {
    //debugger;
    this.state.additionalIcons.find(function(i) {
      return i.name == 'bookmark'
    }).icon = window.reader.isBookmarked(data) != -1 ? "fa fa-bookmark normal-icon" : "fa fa-bookmark-o normal-icon";
    navbarManager.patchChanges();
  }

  function onContainerCreated() {
    this.state.additionalIcons = [{
        icon: "fa fa-bookmark-o normal-icon",
        name: "bookmark",
        click: onBookmarkIconClicked.bind(this),
      },
      {
        icon: "fa fa-text-height smaller-icon",
        name: "reduceFont",
        click: onReduceFontIconClicked.bind(this)
      },
      {
        icon: "fa fa-text-height normal-icon",
        name: "increaseFont",
        click: onIncreaseFontIconClicked.bind(this)
      },
      {
        icon: "fa fa-search normal-icon",
        name: "search",
        click: onSearchIconClicked.bind(this)
      },
      {
        icon: "fa fa-adjust normal-icon",
        name: "adjust",
        click: onAdjustIconClicked.bind(this)
      },
      {
        icon: "fa fa-times normal-icon pull-right",
        name: "close",
        click: onCloseIconClicked.bind(this)
      },
    ];

    navbarManager.set(readerMenu, this.state.additionalIcons, false);
    this.state.searchPanel = document.getElementsByName('searchPanel')[0];
    this.state.panel = this.target;
    this.state.searchPanel.classList.add('panel-slider', 'panel-slider-closed');
  }

  function Swipe(elem, callback) {
    var self = this;
    this.callback = callback;

    function handleEvent(e) {
      self.touchHandler(e);
    }

    elem.addEventListener('touchstart', handleEvent, false);
    elem.addEventListener('touchmove', handleEvent, false);
    elem.addEventListener('touchend', handleEvent, false);
  }
  Swipe.prototype.touches = {
    "touchstart": {
      "x": -1,
      "y": -1
    },
    "touchmove": {
      "x": -1,
      "y": -1
    },
    "touchend": false,
    "direction": "undetermined"
  };
  Swipe.prototype.touchHandler = function(event) {
    var touch;
    if (typeof event !== 'undefined') {
      if (typeof event.touches !== 'undefined') {
        touch = event.touches[0];
        switch (event.type) {
          case 'touchstart':
          case 'touchmove':
            this.touches[event.type].x = touch.pageX;
            this.touches[event.type].y = touch.pageY;
            break;
          case 'touchend':
            this.touches[event.type] = true;
            var x = (this.touches.touchstart.x - this.touches.touchmove.x),
              y = (this.touches.touchstart.y - this.touches.touchmove.y);
            if (x < 0) x /= -1;
            if (y < 0) y /= -1;
            if (x > y)
              this.touches.direction = this.touches.touchstart.x < this.touches.touchmove.x ? "right" : "left";
            else
              this.touches.direction = this.touches.touchstart.y < this.touches.touchmove.y ? "down" : "up";
            this.callback(event, this.touches.direction);
            break;
        }
      }
    }
  };

  function onReaderCreated() {
    var self = this;
    EPUBJS.Hooks.register("beforeChapterDisplay").pageTurns = function(callback, renderer) {
      function mouseClicked(e) {
        navbarManager.toggleNavbar();
        //this.state.navbar.classList.toggle('hide-navbar');
        this.state.panel.classList.toggle('custom-book-container-no-navbar');
        updateSearchBarLocation.bind(this)();
      }

      var lock = false;

      function arrowKeys(e) {
        if (lock) return;
        if (e.keyCode == 38) {
          reader.book.prevPage();
          lock = true;
          setTimeout(function() {
            lock = false;
          }, 100);
          e.preventDefault();
          return false;
        }
        if (e.keyCode == 40) {
          reader.book.nextPage();
          lock = true;
          setTimeout(function() {
            lock = false;
          }, 100);
          e.preventDefault();
          return false;
        }
      }
      renderer.setStyle("-webkit-user-select", "none");
      renderer.setStyle("user-select", "none");
      renderer.setStyle("-khtml-user-select", "none");
      renderer.setStyle("-ms-user-select", "none");
      renderer.setStyle("-moz-user-select", "none");

      renderer.doc.addEventListener('keydown', arrowKeys, false);
      renderer.doc.addEventListener('click', mouseClicked.bind(self), false);

      new Swipe(renderer.doc, function(event, direction) {
        event.preventDefault();
        switch (direction) {
          case "up":
            reader.book.prevPage();
            // Handle Swipe Up
            break;
          case "down":
            reader.book.nextPage();
            // Handle Swipe Down
            break;
          case "left":
            reader.book.nextPage();
            // Handle Swipe Left
            break;
          case "right":
            reader.book.prevPage();
            // Handle Swipe Right
            break;
        }
      });
      if (callback) callback();
    };

    var self = this;
    window.reader = ePubReader(this.state.epub, {
      generatePagination: false
    }, document.getElementsByName("pageContent")[0]);
    window.reader.book.getToc().then(function(toc) {
      tableOfContent = toc;
      $patchChanges('navbar');
    });
    //window.reader.book.generatePagination();
    window.reader.book.on('renderer:locationChanged', onLocationChanged.bind(this));

  }

  function readerMenu() {
    var me = storage.me.read();
    var menuReader = [{
        default: true,
        icon: "fa fa-bars smaller-icon",
        name: "tocDropDown",
        menu: function() {
          var menu = [];
          if (tableOfContent) {
            tableOfContent.forEach(function(c) {
              menu.push({
                long: c.label,
                addr: c.cfi,
                cfi: c.cfi,
              })
            });
          }
          return menu;
        },
        onClick: function(path) {
          if (path != undefined) {
            if (path == '') {
              if (storage.me.read()) {
                dpd.users.logout(function(err) {
                  //debugger;
                  storage.me.erase();
                  window.location.hash = '#app';
                });
              } else window.location.hash = '#app/user.login-form';
            } else {
              window.reader.book.gotoCfi(path);
            }
            return;
          }
        },

      },
      {
        icon: "fa fa-bookmark smaller-icon",
        name: "bookmarkDropDown",
        menu: function() {
          var menu = [];
          if (tableOfBookmarks) {
            tableOfBookmarks.forEach(function(b) {
              menu.push({
                long: b.label,
                addr: b.addr,
                cfi: b.cfi,
              })
            });
          }
          return menu;
        },
        onClick: function(path) {
          window.reader.book.gotoCfi(path)
        },
      },
      {
        icon: "fa fa-search smaller-icon",
        name: "searchDropDown",
        menu: function() {
          var menu = [];
          if (tableOfSearchResults) {
            tableOfSearchResults.forEach(function(s) {
              menu.push({
                long: s.excerpt,
                addr: s.cfi,
                cfi: s.cfi,
              })
            });
          }
          return menu;
        },
        onClick: function(path) {
          window.reader.book.gotoCfi(path)
        },
      }
    ];
    /**/
    return menuReader;
  }

  function $render(_props, _slotView) {
    _context["search-panel"] = $inject("/component/search-panel");
    var searchPanel = _context["search-panel"];
    _context["home"] = $inject("/component/home-button");
    var home = _context["home"];
    _context["books"] = $inject("/book-list/book-grid");
    var books = _context["books"];
    _elementOpenStart("div", "");
    _attr("element", "dist.reader.home");
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
    yalla.framework.registerRef("reader", IncrementalDOM.currentElement(), function() {
      if (_state.epub) {
        _elementOpenStart("div", "");
        _attr("class", "custom-book-container");
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
          onContainerCreated.bind(self)();
        });
        _elementOpenEnd("div");
        _elementOpenStart("span", "");
        _elementOpenEnd("span");
        yalla.framework.registerRef("search", IncrementalDOM.currentElement(), function() {
          var _params = {
            "name": "searchPanel",
            "onsearch": function(event) {
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
              onSearch.bind(self)(event);
            }
          };
          _context["search-panel"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
        })()
        _elementClose("span");
        _elementOpenStart("div", "");
        _attr("name", "bookPage");
        _attr("class", "custom-book-page");
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
          onReaderCreated.bind(self)();
        });
        _elementOpenEnd("div");
        _elementOpenStart("div", "");
        _attr("name", "pageContent");
        _attr("class", "custom-book-page-content");
        _elementOpenEnd("div");
        _elementClose("div");
        _elementClose("div");
        _elementClose("div");
      }
      if (!_state.epub) {
        _elementOpenStart("span", "");
        _elementOpenEnd("span");
        yalla.framework.registerRef("booklist", IncrementalDOM.currentElement(), function() {
          var _params = {
            "filterable": "filterable",
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
              onBookListClicked.bind(self)(event);
            }
          };
          _context["books"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
        })()
        _elementClose("span");
      }
    })()
    _elementClose("div");
  }
  if (typeof $render === "function") {
    $export.render = $render;
  }
  return $export;
})());