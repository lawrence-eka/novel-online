yalla.framework.addComponent("/dist/book-list/filter-sort", (function() {
  var $patchChanges = yalla.framework.renderToScreen;
  var $inject = yalla.framework.createInjector("/dist/book-list/filter-sort");
  var $export = {};
  var $path = "/dist/book-list/filter-sort";
  var _elementName = "dist.book-list.filter-sort";
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

  function onApplyFilter() {
    var e = this.target.form.elements;
    this.emitEvent('apply', {
      contains: e.contains.value,
      genres: e.genres.value,
      sort: e.sortBy.value
    });
  }

  function $render(_props, _slotView) {
    _context["entry"] = $inject("/component/entry");
    var entry = _context["entry"];
    _context["genre"] = $inject("/upload/genre-editor");
    var genre = _context["genre"];
    _elementOpenStart("div", "");
    _attr("element", "dist.book-list.filter-sort");
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
    _elementOpenStart("form", "");
    _elementOpenEnd("form");
    _elementOpenStart("div", "");
    _attr("class", "row");
    _elementOpenEnd("div");
    var _params = {
      "type": "select",
      "name": "sortBy",
      "prompt": "Sort By",
      "entries": [{
        text: 'Title',
        value: 'titleSortBy'
      }, {
        text: 'Stars',
        value: 'stars'
      }, {
        text: 'Upload Date',
        value: 'lastUpdatedDate'
      }, {
        text: 'Publish Year',
        value: 'year'
      }],
      "divClass": "col col-xs-12 col-sm-12 col-md-12 col-lg-12"
    };
    _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
    var _params = {
      "type": "text",
      "name": "contains",
      "prompt": "Search",
      "divClass": "col col-xs-12 col-sm-12 col-md-12 col-lg-12"
    };
    _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
    _elementOpenStart("div", "");
    _attr("class", "col col-xs-12 col-sm-12 col-md-12 col-lg-12");
    _elementOpenEnd("div");
    var _params = {
      "prompt": "Genres",
      "name": "genres"
    };
    _context["genre"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
    _elementClose("div");
    var _params = {
      "type": "button",
      "value": "Apply",
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
        onApplyFilter.bind(self)();
      },
      "divClass": "col col-xs-12 col-sm-12 col-md-12 col-lg-12"
    };
    _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
    _elementClose("div");
    _elementClose("form");
    _elementClose("div");
  }
  if (typeof $render === "function") {
    $export.render = $render;
  }
  return $export;
})());