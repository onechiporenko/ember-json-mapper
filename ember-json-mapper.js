+(function() {

  Ember.JsonMapper = Ember.Namespace.create();

}).call(this);

(function() {

  var JsonMapper = Ember.JsonMapper,
    get = Ember.get,
    getWithDefaults = Ember.getWithDefault,
    isNone = Ember.isNone,
    set = Ember.set,
    keys = Ember.keys,
    assert = Ember.assert,
    typeOf = Ember.typeOf;

  function isObject(obj) {
    return 'object' === typeOf(obj) || 'instance' === typeOf(obj);
  }

  function getFromObject(source, key) {
    var _sub_k = get(key, 'key'),
      _default = get(key, 'default'),
      _v;
    assert('`key` or `default` should be defined', !(isNone(_default) && isNone(_sub_k)));
    if (isNone(_default)) {
      _v = get(source, _sub_k);
    }
    else {
      if (isNone(_sub_k)) {
        _v = _default;
      }
      else {
        _v = getWithDefaults(source, _sub_k, _default);
      }
    }
    return _v;
  }

  function setPath(obj, path, value) {
    var parts = path.split('.'),
      sub_path = '';
    parts.forEach(function(_path, _index) {
      assert('path parts can\'t be empty', _path.length);
      sub_path += '.' + _path;
      if (_index === parts.length - 1) {
        set(obj, sub_path, value);
        return;
      }
      if (isNone(get(obj, sub_path))) {
        set(obj, sub_path, {});
      }
    });
  }

  JsonMapper.map = function mapper(source, map) {

    if(!isObject(source)) assert('`source` should be an object', false);
    if(!isObject(map)) assert('`map` should be an object', false);

    var mapped = {},
      k = keys(map);

    k.forEach(function(key) {
      var _k = map[key],
        _v = isObject(_k) ? getFromObject(source, _k) : get(source, _k);

      if ('undefined' !== typeOf(_v)) {
        if ('array' === typeOf(_v)) {
          _v = _v.map(function(_sub_v) {
            var _map = get(_k, 'map');
            if (isNone(_map)) return _sub_v;
            return mapper(_sub_v, _map);
          });
        }
        setPath(mapped, key, _v);
      }

    });

    return mapped;
  };

}).call(this);
