yalla.framework.addComponent("/dist/component/search-panel", (function() {
  var $patchChanges = yalla.framework.renderToScreen;
  var $inject = yalla.framework.createInjector("/dist/component/search-panel");
  var $export = {};
  var $path = "/dist/component/search-panel";
  var _elementName = "dist.component.search-panel";
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
      show: props.show,
      //navbar: props.navbar,
    }
  }

  function onSearch(event) {
    this.emitEvent('search', event.data);
    //this.state.show = false;
    //$patchChanges('searchPanel');
  }

  function whatPanel(isSearchPanelOpened) {
    //var style="panel-slider";
    var style = "panel-slider " + (!isSearchPanelOpened ? 'panel-slider-closed' : '');
    //console.log('whatPanel', isSearchPanelOpened, style);
    return style;
  }

  function drawerCover(isSearchPanelOpened) {
    //var style="screen-cover";
    var style = isSearchPanelOpened ? "screen-cover" : 'screen-uncover';
    //console.log('drawerCover', isSearchPanelOpened, style);
    return style;
  }

  function hideMenu() {
    // this.state.show = false;
    // $patchChanges("searchPanel");
  }

  function onCreated() {
    //var navbars = document.getElementsByClassName("navbar-fixed-top");
    //var navbar = this.state.navbar || navbars.length ? navbars[navbars.length - 1] : null;
    //if(navbar) navbar.appendChild(this.target) ;
  }

  function $render(_props, _slotView) {
    _context["entry"] = $inject("/component/entry");
    var entry = _context["entry"];
    _context["panel"] = $inject("/component/panel");
    var panel = _context["panel"];
    _elementOpenStart("div", "");
    _attr("element", "dist.component.search-panel");
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
      onCreated.bind(self)();
    });
    _attr("name", _props.name);
    _attr("style", _props.style);
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
    yalla.framework.registerRef("searchPanel", IncrementalDOM.currentElement(), function() {
      var _params = {
        "type": "search",
        "naked": "naked",
        "name": "searchText",
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
      _context["entry"].render(typeof arguments[1] === "object" ? _merge(arguments[1], _params) : _params, function(slotName, slotProps) {});
    })()
    _elementClose("span");
    _elementClose("div");
  }
  if (typeof $render === "function") {
    $export.render = $render;
  }
  return $export;
})());