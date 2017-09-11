module.exports = {
  id: 'apply-defaults',

  initType: function(Type) {
    Type.prototype.applyDefaults = function() {
      function forEachProperty (_type, ctx) {
        var didSetProps = false;

        _type.forEachProperty(function(property) {
          var name = property.getName();
          var value = ctx.get(name);

          if (value === undefined) {
            var defaultValue = property.default;
            var defaultValueUndefined = typeof defaultValue === 'undefined';
            var type = property.getType();

            if (defaultValueUndefined && type.Model) {
              // Temporarily set this to an empty object, so we can walk the sub
              // properties
              ctx.set(name, {});
              var setProperties = forEachProperty(type, ctx.get(name));

              if (!setProperties) ctx.set(name, undefined);
              return;
            }

            if (!defaultValueUndefined && defaultValue !== null && defaultValue.constructor === Function) {
              defaultValue = defaultValue.call(ctx);
            }

            ctx.set(name, defaultValue);
            didSetProps = true;
          }
        });

        return didSetProps;
      }

      forEachProperty(Type, this);
    };
  }
};
