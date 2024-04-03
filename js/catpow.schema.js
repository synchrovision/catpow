(() => {
  var __defProp = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // ../js/catpow.schema/consts.jsx
  var consts_exports = {};
  __export(consts_exports, {
    conditionalSchemaKeys: () => conditionalSchemaKeys,
    minMaxKeys: () => minMaxKeys,
    reservedKeys: () => reservedKeys,
    schemaStatusFlag: () => schemaStatusFlag,
    typeSpecificKeys: () => typeSpecificKeys
  });
  var schemaStatusFlag = Object.freeze({
    input: 1,
    validation: 2
  });
  var reservedKeys = Object.freeze({
    "const": 1,
    "enum": 1,
    "oneOf": 1,
    "anyOf": 1,
    "$ref": 1,
    "minimum": 1,
    "maximum": 1,
    "multipleOf": 1,
    "minLength": 1,
    "maxLength": 1,
    "items": 1,
    "prefixItems": 1,
    "minItems": 1,
    "maxItems": 1,
    "contains": 1,
    "minContains": 1,
    "maxContains": 1,
    "properties": 1,
    "required": 1,
    "dependencies": 1,
    "dependentSchemas": 1,
    "dependentRequired": 1
  });
  var typeSpecificKeys = Object.freeze({
    number: ["minimum", "maximum", "multipleOf"],
    string: ["minLength", "maxLength", "pattern"],
    array: ["items", "prefixItems", "minItems", "maxItems", "contains", "minContains", "maxContains"],
    object: [
      "properties",
      "minProperties",
      "maxProperties",
      "propertyNames",
      "patternProperties",
      "additionalProperties",
      "unevaluatedProperties",
      "required",
      "depndencies",
      "dependentSchemas",
      "dependentRequired"
    ]
  });
  var minMaxKeys = Object.freeze({
    minimum: false,
    maximum: true,
    minLength: false,
    maxLength: true,
    minItems: false,
    maxItems: true,
    minContains: false,
    maxContains: true
  });
  var conditionalSchemaKeys = Object.freeze({
    allOf: true,
    anyOf: true,
    oneOf: true,
    if: false,
    then: false,
    else: false,
    dependentSchemas: true
  });

  // ../js/catpow.schema/extractDependencies.jsx
  var extractDependencies = (schema) => {
    if (schema.dependencies != null) {
      if (Array.isArray(Object.values(schema.dependencies)[0])) {
        return { dependentRequired: schema.dependencies };
      } else {
        return { dependentSchemas: schema.dependencies };
      }
    } else {
      const { dependentRequired, dependentSchemas } = schema;
      return { dependentRequired, dependentSchemas };
    }
  };

  // ../js/catpow.schema/getSubSchema.jsx
  var getSubSchema = (path, schema, rootSchema) => {
    let keys = path.split("/");
    if (keys[0] === "#") {
      keys.shift();
      schema = rootSchema;
    }
    keys.every((key) => {
      if (!schema.hasOwnProperty(key)) {
        schema = null;
        return false;
      }
      schema = schema[key];
      return true;
    });
    return schema;
  };

  // ../js/catpow.schema/find.jsx
  var find = (callback, schema, rootSchema, params = {}) => {
    if (schema == null) {
      return null;
    }
    const result = callback(schema, rootSchema);
    if (result != null) {
      return result;
    }
    if (!params.refStack != null) {
      params.refStack = /* @__PURE__ */ new WeakMap();
    }
    if (params.refStack.has(schema)) {
      return null;
    }
    params.refStack.set(schema, true);
    if (schema.allOf != null) {
      for (let i in schema.allOf) {
        const result2 = find(callback, schema.allOf[i], rootSchema, params);
        if (result2 != null) {
          return result2;
        }
      }
    }
    if (params.proactive) {
      if (schema.anyOf != null) {
        for (let i in schema.anyOf) {
          const result2 = find(callback, schema.anyOf[i], rootSchema, params);
          if (result2 != null) {
            return result2;
          }
        }
      }
      if (schema.oneOf != null) {
        for (let i in schema.oneOf) {
          const result2 = find(callback, schema.oneOf[i], rootSchema, params);
          if (result2 != null) {
            return result2;
          }
        }
      }
      for (let key in ["if", "then", "else"]) {
        if (schema[key] == null) {
          break;
        }
        const result2 = find(callback, schema[key], rootSchema, params);
        if (result2 != null) {
          return result2;
        }
      }
      const { dependentSchemas } = extractDependencies(schema);
      if (dependentSchemas) {
        for (let i in dependentSchemas) {
          const result2 = find(callback, dependentSchemas[i], rootSchema, params);
          if (result2 != null) {
            return result2;
          }
        }
      }
    }
    if (schema["$ref"] != null) {
      const refSchema = getSubSchema(schema.$ref, schema, rootSchema);
      const result2 = find(callback, refSchema, rootSchema, params);
      if (result2 != null) {
        return result2;
      }
    }
    return null;
  };

  // ../js/catpow.schema/getType.jsx
  var getType = (schema, rootSchema) => {
    return find((schema2) => {
      if (schema2.type != null) {
        return schema2.type;
      }
      if (schema2.properties != null) {
        return "object";
      }
      if (schema2.items != null || schema2.prefixItems != null) {
        return "array";
      }
      if (schema2.minimum != null || schema2.maximam != null || schema2.multipleOf != null) {
        return "number";
      }
      if (schema2.pattern != null || schema2.minLength != null || schema2.maxLength != null) {
        return "string";
      }
      if (schema2.const != null) {
        return typeof schema2.const;
      }
      if (schema2.default != null) {
        return typeof schema2.default;
      }
      if (schema2.enum != null && schema2.enum.length) {
        return typeof schema2.enum[0];
      }
    }, schema, rootSchema);
  };

  // ../js/catpow.schema/getResolvedSchema.jsx
  var cache = /* @__PURE__ */ new WeakMap();
  var getResolvedSchema = (schema, rootSchema) => {
    if (rootSchema == null) {
      rootSchema = schema;
    }
    if (cache.has(schema)) {
      return cache.get(schema);
    }
    let resolvedSchema;
    if (schema.hasOwnProperty("$ref")) {
      resolvedSchema = Object.assign(
        {},
        getResolvedSchema(
          getSubSchema(schema.$ref, schema, rootSchema),
          rootSchema
        ),
        schema
      );
    } else {
      resolvedSchema = Object.assign({}, schema);
    }
    if (resolvedSchema.type == null) {
      resolvedSchema.type = getType(resolvedSchema, rootSchema);
    }
    cache.set(schema, resolvedSchema);
    return resolvedSchema;
  };

  // ../js/catpow.schema/getMergedSchemaForValue.jsx
  var getMergedSchemaForValue = (value, schema, rootSchema) => {
    if (rootSchema == null) {
      rootSchema = schema;
    }
    const mergedSchema = {};
    find((schema2) => {
      mergeSchema(mergedSchema, schema2, rootSchema, { extend: false, value });
    }, schema, rootSchema, { proactive: false });
    return mergedSchema;
  };

  // ../js/catpow.schema/getMergedSchema.jsx
  var cache2 = /* @__PURE__ */ new WeakMap();
  var getMergedSchema = (schema, rootSchema) => {
    if (rootSchema == null) {
      rootSchema = schema;
    }
    if (cache2.has(schema)) {
      return cache2.get(schema);
    }
    const mergedSchema = {};
    find((schema2) => {
      mergeSchema(mergedSchema, schema2, rootSchema, { extend: false });
    }, schema, rootSchema, { proactive: false });
    cache2.set(schema, mergedSchema);
    return mergedSchema;
  };

  // ../js/catpow.schema/mergeSchema.jsx
  var mergeSchema = (targetSchema, schema, rootSchema, params = {}) => {
    const { extend = false, value = null } = params;
    const forValue = params.hasOwnProperty("value");
    for (let key in schema) {
      if (!reservedKeys[key] && targetSchema[key] == null) {
        targetSchema[key] = schema[key];
      }
    }
    if (schema.const != null) {
      if (extend) {
        if (targetSchema.enum !== null) {
          if (!targetSchema.enum) {
            targetSchema.enum = [];
          }
          targetSchema.enum.push(schema.const);
        }
      } else {
        targetSchema.const = schema.const;
      }
    } else if (extend && targetSchema.const != null) {
      targetSchema.const = null;
    }
    if (schema.enum != null) {
      if (extend) {
        if (targetSchema.enum == null) {
          if (targetSchema.const != null) {
            targetSchema.enum = schema.enum.slice();
            targetSchema.enum.push(targetSchema.const);
            targetSchema.const = null;
          }
        } else {
          targetSchema.enum.push.apply(
            targetSchema.enum,
            schema.enum.filter((val) => !targetSchema.enum.includes(val))
          );
        }
      } else {
        if (targetSchema.enum == null) {
          targetSchema.enum = schema.enum.slice();
        } else {
          targetSchema.enum = targetSchema.enum.filter((val) => schema.enum.includes(val));
        }
      }
    } else if (extend && targetSchema.enum != null) {
      targetSchema.enum = null;
    }
    for (let key in minMaxKeys) {
      if (schema[key] != null) {
        targetSchema[key] = Math[minMaxKeys[key] == extend ? "max" : "min"](targetSchema[key], schema[key]);
      } else if (extend && targetSchema[key] != null) {
        targetSchema[key] = null;
      }
    }
    if (schema.required != null) {
      if (extend) {
        if (targetSchema.required !== null) {
          if (targetSchema.required == null) {
            targetSchema.required = schema.required.slice();
          } else {
            targetSchema.required = targetSchema.required.filter((val) => schema.required.includes(val));
          }
        }
      } else {
        if (targetSchema.required == null) {
          targetSchema.required = schema.required.slice();
        } else {
          targetSchema.required.push.apply(
            targetSchema.required,
            schema.required.filter((val) => !targetSchema.required.includes(val))
          );
        }
      }
    } else if (extend && targetSchema.required != null) {
      targetSchema.required = null;
    }
    if (schema.properties != null) {
      if (targetSchema.properties == null) {
        targetSchema.properties = {};
      }
      for (let key in schema.properties) {
        const propSchema = forValue ? getMergedSchemaForValue(value || value[key], schema.properties[key], rootSchema) : getMergedSchema(schema.properties[key], rootSchema);
        if (targetSchema.properties[key] != null) {
          mergeSchema(targetSchema.properties[key], propSchema, rootSchema, params);
        } else {
          targetSchema.properties[key] = propSchema;
        }
      }
    }
    if (schema.items != null) {
      if (targetSchema.items == null) {
        targetSchema.items = getMergedSchema(schema.items, rootSchema);
        if (forValue && value != null) {
          targetSchema.itemsForValue = [];
          for (let i in value) {
            targetSchema.itemsForValue.push(
              getMergedSchemaForValue(value[i], schema.items, rootSchema)
            );
          }
        }
      }
    }
    const conditionalSchemas = [];
    if (schema.oneOf != null) {
      conditionalSchemas.push.apply(
        conditionalSchemas,
        forValue ? getMatchedSchemas(value, schema.oneOf, rootSchema, { ignoreRequired: true }) : schema.oneOf
      );
    }
    if (schema.anyOf != null) {
      conditionalSchemas.push.apply(
        conditionalSchemas,
        forValue ? getMatchedSchemas(value, schema.anyOf, rootSchema, { ignoreRequired: true }) : schema.anyOf
      );
    }
    const { dependentSchemas } = extractDependencies(schema);
    if (dependentSchemas != null) {
      if (forValue) {
        for (let key in dependentSchemas) {
          if (value[key] != null) {
            conditionalSchemas.push(dependentSchemas[key]);
          }
        }
      } else {
        conditionalSchemas.push.apply(
          conditionalSchemas,
          Object.values(dependentSchemas)
        );
      }
    }
    if (conditionalSchemas.length) {
      const mergedConditionalSchema = {};
      for (let i in conditionalSchemas) {
        if (forValue) {
          mergeSchema(
            mergedConditionalSchema,
            getMergedSchemaForValue(value, conditionalSchemas[i], rootSchema),
            rootSchema,
            { extend: true, value }
          );
        } else {
          mergeSchema(
            mergedConditionalSchema,
            getMergedSchemaForValue(value, conditionalSchemas[i], rootSchema),
            rootSchema,
            { extend: true }
          );
        }
      }
      mergeSchema(targetSchema, mergedConditionalSchema, rootSchema, params);
    }
  };

  // ../js/catpow.schema/mergeSchemas.jsx
  var mergeSchemas = (schemas, rootSchema, params = {}) => {
    const mergedSchema = Object.assign({}, schemas[0]);
    schemas.slice(1).forEach((schema) => mergeSchema(mergedSchema, schema, rootSchema, params));
    return mergedSchema;
  };

  // ../js/catpow.schema/getMatchedSchemas.jsx
  var getMatchedSchemas2 = (value, schemas, rootSchema, params) => {
    return schemas.filter((schema) => test(value, schema, rootSchema, params));
  };

  // ../js/catpow.schema/test.jsx
  var test = (value, schema, rootSchema, params = {}) => {
    const type = getType(schema, rootSchema);
    schema = getResolvedSchema(schema, rootSchema);
    const { ignoreRequired = false, recursive = false, onError = false } = params;
    const cb2 = (invalidBy, params2 = {}) => onError && onError(Object.Assign({ invalidBy, schema, value }, params2));
    if (schema.const != null && schema.const !== value) {
      return cb2("const");
    }
    if (schema.enum != null && !schema.enum.includes(value)) {
      return cb2("enum");
    }
    if (value == null) {
      return true;
    }
    switch (type) {
      case "boolean": {
        if (typeof value !== "boolean") {
          return cb2("type");
        }
        break;
      }
      case "integer":
      case "number": {
        if (type === "intger" && !Number.isInteger(value)) {
          return cb2("type");
        }
        if (schema.minimum != null && value < schema.minimum) {
          return cb2("minimum");
        }
        if (schema.maximum != null && value > schema.maximum) {
          return cb2("maximum");
        }
        if (schema.exclusiveMinimum != null) {
          if (typeof schema.exclusiveMinimum === "boolean") {
            if (schema.exclusiveMinimum === true && value <= schema.minimum) {
              return cb2("minimum");
            }
          } else {
            if (value <= schema.exclusiveMinimum) {
              return cb2("exclusiveMinimum");
            }
          }
        }
        if (schema.exclusiveMaximum != null) {
          if (typeof schema.exclusiveMaximum === "boolean") {
            if (schema.exclusiveMaximum === true && value >= schema.maximum) {
              return cb2("maximum");
            }
          } else {
            if (value >= schema.exclusiveMaximum) {
              return cb2("exclusiveMaximum");
            }
          }
        }
        if (schema.multipleOf != null) {
          if (value % schema.multipleOf !== 0) {
            return cb2("multipleOf");
          }
        }
        break;
      }
      case "string": {
        if (schema.pattern != null) {
          const reg = new RegExp(schema.pattern);
          if (!reg.test(value)) {
            return cb2("pattern");
          }
        }
        if (schema.minLength != null && value.length < schema.minLength) {
          return cb2("minLength");
        }
        if (schema.maxLength != null && value.length > schema.maxLength) {
          return cb2("maxLength");
        }
        break;
      }
      case "object": {
        if (typeof value !== "object" || Array.isArray(value)) {
          return cb2("type");
        }
        if (schema.required != null && !ignoreRequired) {
          for (let propertyName of schema.required) {
            if (value[propertyName] == null) {
              return cb2("required", { propertyName });
            }
          }
        }
        if (schema.additionalProperties != null && schema.additionalProperties === false) {
          if (Object.keys(value).some((key) => !schema.properties.hasOwnProperty(key))) {
            return cb2("additionalProperties");
          }
        }
        const { dependentRequired, dependentSchemas } = extractDependencies(schema);
        if (dependentRequired) {
          if (!ignoreRequired) {
            for (let keyPropertyName in dependentRequired) {
              if (value[keyPropertyName] == null) {
                continue;
              }
              for (let propertyName of dependentRequired[keyPropertyName]) {
                if (value[propertyName] == null) {
                  return cb2("dependentRequired", { propertyName });
                }
              }
            }
          }
        }
        if (dependentSchemas) {
          if (Object.keys(dependentSchemas).some((key) => {
            return value[key] != null && !test(value, dependentSchemas[key], rootSchema, params);
          })) {
            return cb2("dependentSchemas");
          }
        }
        const length = Object.keys(value).length;
        if (schema.minProperties != null && length < schema.minProperties) {
          return cb2("minProperties");
        }
        if (schema.maxProperties != null && length > schema.maxProperties) {
          return cb2("maxProperties");
        }
        if (recursive && schema.properties != null) {
          if (Object.keys(schema.properties).some((key) => {
            if (value[key] == null) {
              return false;
            }
            return test(
              value[key],
              schema.properties[key],
              rootSchema,
              Object.assign({}, params, { refStack: null })
            ) !== true;
          })) {
            return cb2("properties");
          }
        }
        break;
      }
      case "array": {
        if (schema.minItems != null && value.length < schema.minItems) {
          return cb2("minItems");
        }
        if (schema.maxItems != null && value.length > schema.maxItems) {
          return cb2("maxItems");
        }
        if (schema.prefixItems != null) {
          if (schema.prefixItems.some((itemSchema, index) => value[index] !== void 0 && test(value[index], itemSchema, rootSchema, params) !== true)) {
            return cb2("prefixItems");
          }
        }
        if (schema.contains != null) {
          const matchedItems = value.filter((item) => test(item, schema.contain, rootSchema, params) !== true);
          if (matchedItems.length === 0) {
            return cb2("contains");
          }
          if (schema.minContains != null && matchedItems.length < schema.minContains) {
            return cb2("minContains");
          }
          if (schema.maxContains != null && matchedItems.length > schema.maxContains) {
            return cb2("maxContains");
          }
        }
        if (schema.uniqueItems != null && schema.uniqueItems === true) {
          if (value.slice(0, -1).some((item, index) => value.indexOf(item, index + 1) !== -1)) {
            return cb2("uniqueItems");
          }
        }
        break;
      }
    }
    if (schema.oneOf != null) {
      const matchedSchemaLength = getMatchedSchemas2(value, schema.oneOf, rootSchema, params).length;
      if (ignoreRequired) {
        if (matchedSchemaLength === 0) {
          return cb2("oneOf");
        }
      } else {
        if (matchedSchemaLength !== 1) {
          return cb2("oneOf");
        }
      }
    }
    if (schema.anyOf != null) {
      if (schema.anyOf.every((subSchema) => test(value, subSchema, rootSchema) !== true)) {
        return cb2("anyOf");
      }
    }
    if (schema.allOf != null) {
      for (let subSchema of schema.allOf) {
        const result = test(value, subSchema, rootSchema);
        if (result !== true) {
          return result;
        }
      }
    }
    return true;
  };

  // ../js/catpow.schema/sanitize.jsx
  var sanitize = (value, schema, rootSchema) => {
    const type = getType(schema, rootSchema);
    schema = getResolvedSchema(schema, rootSchema);
    if (value == null) {
      return value;
    }
    if (schema.const != null && schema.const !== value) {
      return schema.const;
    }
    if (schema.enum != null && !schema.enum.includes(value)) {
      return null;
    }
    switch (type) {
      case "integer":
      case "number": {
        if (type === "intger" && !Number.isInteger(value)) {
          value = parseInt(value);
        }
        if (schema.minimum != null && value < schema.minimum) {
          value = schema.minimum;
        }
        if (schema.maximum != null && value > schema.maximum) {
          value = schema.maximum;
        }
        if (schema.exclusiveMinimum != null) {
          if (typeof schema.exclusiveMinimum === "boolean") {
            if (schema.exclusiveMinimum === true && value <= schema.minimum) {
              return cb("minimum");
            }
          } else {
            if (value <= schema.exclusiveMinimum) {
              return cb("exclusiveMinimum");
            }
          }
        }
        if (schema.exclusiveMaximum != null) {
          if (typeof schema.exclusiveMaximum === "boolean") {
            if (schema.exclusiveMaximum === true && value >= schema.maximum) {
              return cb("maximum");
            }
          } else {
            if (value >= schema.exclusiveMaximum) {
              return cb("exclusiveMaximum");
            }
          }
        }
      }
    }
    return value;
  };

  // ../js/catpow.schema/main.jsx
  var main = (rootSchema) => {
    const resolveSchema = (uri, schema, param) => {
      const resolvedSchema = getResolvedSchema(schema, rootSchema);
      Object.assign(resolvedSchema, param);
      if (resolvedSchema.$ref != null) {
        delete resolvedSchema.$ref;
      }
      const { parent } = param;
      for (let conditionalSchemaKey in conditionalSchemaKeys) {
        if (resolvedSchema[conditionalSchemaKey] == null) {
          continue;
        }
        if (conditionalSchemaKeys[conditionalSchemaKey]) {
          for (let key in resolvedSchema[conditionalSchemaKey]) {
            resolvedSchema[conditionalSchemaKey][key] = resolveSchema(uri, resolvedSchema[conditionalSchemaKey][key], { parent, isConditional: true });
          }
        } else {
          resolvedSchema[conditionalSchemaKey] = resolveSchema(uri, resolvedSchema[conditionalSchemaKey], { parent, isConditional: true });
        }
      }
      const { dependentSchemas } = extractDependencies(resolvedSchema);
      if (dependentSchemas != null) {
        for (let propertyName in dependentSchemas) {
          dependentSchemas[propertyName] = resolveSchema(uri, dependentSchemas[propertyName], { parent, isConditional: true });
        }
      }
      if (resolvedSchema.properties != null) {
        for (let key in resolvedSchema.properties) {
          resolvedSchema.properties[key] = resolveSchema(uri + "/" + key, resolvedSchema.properties[key], { parent: resolvedSchema });
        }
        if (resolvedSchema.required) {
          for (let key in resolvedSchema.required) {
            resolvedSchema.properties[key].isRequired = true;
          }
        }
      }
      if (resolvedSchema.prefixItems != null) {
        for (let index in resolvedSchema.prefixItems) {
          resolvedSchema.prefixItems[index] = resolveSchema(uri + "/" + index, resolvedSchema.prefixItems[index], { parent: resolvedSchema });
        }
      }
      if (resolvedSchema.items != null) {
        resolvedSchema.items = resolveSchema(uri + "/$", resolvedSchema.items, { parent: resolvedSchema });
      }
      return resolvedSchema;
    };
    const resolvedRootSchema = resolveSchema("#", rootSchema, {});
    const mergeSchemasProxy = (schemas, extend) => {
      return mergeSchemas(schemas, resolvedRootSchema, { extend });
    };
    const updateHandles = /* @__PURE__ */ new WeakMap();
    const getTypeOfValue = (value) => {
      if (value == null) {
        return "null";
      }
      if (Array.isArray(value)) {
        return "array";
      }
      return typeof value;
    };
    const getPossibleTypes = (schemas) => {
      const flags = {};
      schemas.forEach((schema) => flags[schema.type] = true);
      return flags;
    };
    const getKeyPropertyName = (schemas) => {
      return Object.keys(schemas[0].properties).find((key) => schemas.every((schema) => schema.properties[key] != null));
    };
    const walkAncestor = (agent, cb2) => {
      if (cb2(agent) === false) {
        return false;
      }
      if (agent.parent) {
        return walkAncestor(agent.parent, cb2);
      }
      return true;
    };
    const walkAncestorSchema = (agent, schema, cb2) => {
      if (cb2(agent, schema) === false) {
        return false;
      }
      if (agent.parent && schema.parent) {
        return walkAncestorSchema(agent.parent, schema.parent, cb2);
      }
      return true;
    };
    const walkDescendant = (agent, cb2) => {
      if (cb2(agent) === false) {
        return false;
      }
      agent.walkChildren((child) => walkDescendant(child, cb2));
      return true;
    };
    const walkDescendantSchema = (agent, schema, cb2) => {
      if (cb2(agent, schema) === false) {
        return false;
      }
      agent.walkChildren((child) => {
        for (let subSchema of child.matrix.schemas) {
          if (subSchema.parent === schema) {
            walkDescendantSchema(child, subSchema, cb2);
          }
        }
      });
      return true;
    };
    const getUnlimietedSchema = (schema) => {
      const unlimitedSchema = Object.assign({}, schema);
      delete unlimitedSchema.enum;
      delete unlimitedSchema.const;
      for (let key in minMaxKeys) {
        if (unlimitedSchema[key] != null) {
          delete unlimitedSchema[key];
        }
      }
      return unlimitedSchema;
    };
    const getMatrix = (schemas) => {
      const updateHandlesList = [];
      schemas.slice().forEach((schema) => {
        const test2 = (value, schema2) => test2(value, schema2, rootSchema);
        if (schema.if != null) {
          schemas.push(getUnlimietedSchema(schema.if));
          updateHandlesList.push((agent) => {
            const isValid = test2(agent.getValue(), schema.if);
            if (schema.then != null) {
              agent.setConditionalSchemaStatus(schema.then, isValid ? 3 : 0);
            }
            if (schema.else != null) {
              agent.setConditionalSchemaStatus(schema.else, isValid ? 0 : 3);
            }
          });
        }
        if (schema.allOf != null) {
          Array.push.apply(schemas, schema.allOf);
        }
        if (schema.anyOf != null) {
          schemas.push(mergeSchemasProxy(schema.anyOf, true));
        }
        if (schema.oneOf != null) {
          const keyPropertyName = getKeyPropertyName(schema.oneOf);
          updateHandlesList.push((agent) => {
            const keyValue = agent.getValue()[keyPropertyName];
            schema.oneOf.forEach((schema2) => {
              agent.setConditionalSchemaStatus(schema2, test2(keyValue, schema2.properties[keyPropertyName]) ? 3 : 0);
            });
          });
        }
        const { dependentRequired, dependentSchemas } = extractDependencies(schema);
        if (dependentSchemas != null) {
          updateHandlesList.push((agent) => {
            const value = agent.getValue();
            for (let name in dependentSchemas) {
              agent.setConditionalSchemaStatus(dependentSchemas[name], value[name] != null ? 3 : 0);
            }
          });
        }
        if (dependentRequired != null) {
          updateHandlesList.push((agent) => {
            const value = agent.getValue();
            for (let name in dependentRequired) {
              const flag = value[name] != null;
              dependentRequired[name].forEach((name2) => {
                agent.properties[name2].setConditionalRequiredFlag(schema, flag);
              });
            }
          });
        }
      });
      const matrix = createMatrix(schemas);
      updateHandles.set(matrix, (agent) => {
        updateHandlesList.forEach((cb2) => cb2(agent));
      });
      schemas.forEach((schema) => {
        if (schema.properties != null) {
          if (matrix.properties == null) {
            matrix.properties = {};
          }
          for (let key in schema.properties) {
            if (matrix.properties[key] == null) {
              matrix.properties[key] = [];
            }
            matrix.properties[key].push(schema.properties[key]);
          }
        }
        if (schema.prefixItems != null) {
          if (matrix.prefixItems == null) {
            matrix.prefixItems = [];
          }
          for (let index in schema.prefixItems) {
            if (matrix.prefixItems[index] == null) {
              matrix.prefixItems[index] = [];
            }
            matrix.prefixItems[index].push(schema.prefixItems[index]);
          }
        }
        if (schema.items != null) {
          if (matrix.items == null) {
            matrix.items = [];
          }
          matrix.items.push(schema.items);
        }
      });
      if (matrix.properties != null) {
        for (let key in matrix.properties) {
          matrix.properties[key] = getMatrix(matrix.properties[key]);
        }
      }
      if (matrix.prefixItems != null) {
        for (let index in matrix.prefixItems) {
          matrix.prefixItems[index] = getMatrix(matrix.prefixItems[index]);
        }
      }
      if (matrix.items != null) {
        matrix.items = getMatrix(matrix.items);
      }
      return matrix;
    };
    const createMatrix = (schemas) => {
      const possibleTypes = getPossibleTypes(schemas);
      const curries = {
        on: (agent) => {
          return (type, callback, arg = null) => {
            if (agent.eventListeners[type] == null) {
              agent.eventListeners[type] = /* @__PURE__ */ new Map();
            }
            agent.eventListeners[type].set(callback, arg);
          };
        },
        off: (agent) => {
          return (type, callback) => {
            if (agent.eventListeners[type] == null) {
              return;
            }
            return agent.eventListeners[type].delete(callback);
          };
        },
        trigger: (agent) => {
          return (event) => {
            if (typeof event === "string") {
              event = { type: event, bubbles: true };
            }
            event.target = agent;
            const cb2 = (agent2) => {
              if (agent2.eventListeners[event.type] == null) {
                return true;
              }
              let stopPropagation = false;
              agent2.eventListeners[event.type].forEach((arg, callback) => {
                if (callback(event, arg) === false) {
                  stopPropagation = true;
                }
              });
              return !stopPropagation;
            };
            if (event.bubbles) {
              walkAncestor(agent, cb2);
            } else {
              cb2(agent);
            }
          };
        },
        getAgent: (agent) => {
          return (path) => {
            if (!Array.isArray(path)) {
              path = path.split("/");
            }
            if (path.length === 0) {
              return agent;
            }
            const key = path.shift();
            if (isNaN(key)) {
              return agent.properties[key].getAgent(path);
            } else {
              const index = parseInt(key);
              if (agent.prefixItems != null) {
                if (index < agent.prefixItems.length) {
                  return agent.prefixItems[index].getAgent(path);
                } else {
                  return agent.prefixItems[index - agent.prefixItems.length].getAgent(path);
                }
              } else {
                return agent.items[index].getAgent(path);
              }
            }
          };
        },
        walkChildren: (agent) => {
          return (cb2) => {
            if (agent.properties != null) {
              for (let child of agent.properties) {
                cb2(child);
              }
            }
            if (agent.prefixItems != null) {
              for (let child of agent.prefixItems) {
                cb2(child);
              }
            }
            if (agent.items != null) {
              for (let child of agent.items) {
                cb2(child);
              }
            }
          };
        },
        getConditionalSchemaStatus: (agent) => {
          return (schema) => {
            return agent.conditionalSchemaStatus.get(schema);
          };
        },
        setConditionalSchemaStatus: (agent) => {
          return (schema, status) => {
            if (agent.conditionalSchemaStatus.get(schema) === status) {
              return status;
            }
            agent.conditionalSchemaStatus.set(schema, status);
            agent.setSchemaStatus(schema, agent.parent == null ? 3 : agent.parent.getSchemaStatus(schema.parent) & status);
          };
        },
        setConditionalRequiredFlag: (agent) => {
          return (schema, flag) => {
            if (agent.conditionalRequiredFlag.get(schema) === flag) {
              return flag;
            }
            agent.conditionalRequiredFlag.set(schema, flag);
            agent.isReqired = false;
            for (let [schema2, flag2] of agent.conditionalRequiredFlag.entries()) {
              if (flag2 && agent.getSchemaStatus(schema2) & 1) {
                agent.isReqired = true;
                break;
              }
            }
          };
        },
        getSchemaStatus: (agent) => {
          return (schema) => {
            if (agent.schemaStatus == null || !agent.schemaStatus.has(schema)) {
              return 1;
            }
            return agent.schemaStatus.get(schema);
          };
        },
        setSchemaStatus: (agent) => {
          return (schema, status) => {
            if (agent.schemaStatus.get(schema) === status) {
              return status;
            }
            agent.schemaStatus.set(schema, status);
            walkDescendantSchema(agent, schema, (agent2, schema2) => {
              const currentStatus = agent2.schemaStatus.get(schema2);
              let status2 = agent2.parent.schemaStatus.get(schema2.parent);
              if (agent2.conditionalSchemaStatus.has(schema2)) {
                status2 &= agent2.conditionalSchemaStatus.get(schema2);
              }
              if (status2 === currentStatus) {
                return false;
              }
              agent2.schemaStatus.set(schema2, status2);
            });
          };
        },
        getSchemas: (agent) => {
          return (status) => {
            return schemas.filter((schema) => (agent.getSchemaStatus(schema) & status) != 0);
          };
        },
        getSchemasForInput: (agent) => {
          return () => agent.getSchemas(1);
        },
        getSchemasForValidation: (agent) => {
          return () => agent.getSchemas(2);
        },
        getMergedSchema: (agent) => {
          const cache3 = {};
          return (status, extend = true) => {
            const key = Array.from(agent.schemaStatus.values()).join("") + "-" + status + "-" + (extend ? "e" : "");
            if (cache3[key] != null) {
              return cache3[key];
            }
            cache3[key] = mergeSchemasProxy(agent.getSchemas(status), extend);
            return cache3[key];
          };
        },
        getMergedSchemaForInput: (agent) => {
          return () => agent.getMergedSchema(1, true);
        },
        getMergedSchemaForValidation: (agent) => {
          return () => agent.getMergedSchema(2, false);
        },
        getValue: (agent) => {
          return () => agent.value;
        },
        setValue: (agent) => {
          return (value) => {
            agent.value = value;
            walkAncestor(agent, (agent2) => {
              agent2.update();
              agent2.validate();
            });
            agent.trigger({ type: "change", bubbles: true });
          };
        },
        deleteValue: (agent) => {
          return () => {
            delete agent.ref[agent.key];
            if (agent.onChange != null) {
              agent.onChange(null);
            }
            updateHandles.get(agent.matrix)(agent);
          };
        },
        update: (agent) => {
          return () => {
            const valueType = getTypeOfValue(agent.value);
            if (possibleTypes[valueType] == null) {
              return false;
            }
            if (agent.onChange != null) {
              agent.onChange(agent);
            }
            agent.ref[agent.key] = agent.value;
            updateHandles.get(agent.matrix)(agent);
            agent.trigger({ type: "update", bubbles: false });
          };
        },
        validate: (agent) => {
          return () => {
            if (agent.additionalValidaion != null) {
              agent.additionalValidaion(agent.value, agent.getMergedSchemaForValidation());
            }
            agent.invalidSchema = agent.getSchemas(1).find((schema) => {
              return !test(agent.value, schema, rootSchema);
            });
            if (agent.invalidSchema) {
              if (agent.onError != null) {
                agent.onError(agent, agent.invalidSchema);
              }
              agent.isValid = false;
            } else {
              agent.isValid = true;
            }
            agent.trigger({ type: "validate", bubbles: false });
          };
        },
        initialize: (agent) => {
          return () => {
            const mergedSchema = agent.getMergedSchemaForInput();
            if (mergedSchema.hasOwnProperty("default")) {
              agent.setValue(mergedSchema.default);
            }
            agent.trigger({ type: "initialize", bubbles: false });
          };
        },
        sanitize: (agent) => {
          return () => {
            let value = agent.getValue();
            const schemas2 = agent.getSchemas(2);
            for (const schema of schemas2) {
              value = sanitize(value, schema, rootSchema);
            }
            if (value !== agent.getValue()) {
              agent.setValue(value);
            }
            agent.trigger({ type: "sanitize", bubbles: false });
          };
        },
        setAdditionalValidaion: (agent) => {
          return (cb2) => {
            agent.additionalValidaion = cb2;
          };
        },
        setAdditionalInitialization: (agent) => {
          return (cb2) => {
            agent.additionalInitialization = cb2;
          };
        },
        setAdditionalSanitization: (agent) => {
          return (cb2) => {
            agent.additionalSanitization = cb2;
          };
        },
        getMessage: (agent) => {
          return () => agent.message;
        },
        setMessage: (agent) => {
          return (message) => {
            agent.message = message;
          };
        },
        getProperties: (agent) => {
          return () => {
            return agent.properties;
          };
        },
        getPrefixItems: (agent) => {
          return () => {
            return agent.prefixItems;
          };
        },
        getItems: (agent) => {
          return () => {
            return agent.items;
          };
        },
        addItem: (agent) => {
          return (item, index) => {
            agent.items.splice(index, 0, item);
            agent.items.forEach((item2, index2) => item2.key = index2);
          };
        },
        copyItem: (agent) => {
          return (from, to) => {
            const item = createAgent(
              agent.matrix,
              agent.value,
              to,
              JSON.parse(JSON.stringify(agent.items[from])),
              agent.parent
            );
            agent.addItem(to, item);
          };
        },
        moveItem: (agent) => {
          return (from, to) => {
            agent.items.splice(to, 0, agent.items.splice(from, 1)[0]);
            agent.items.forEach((item, index) => item.key = index);
          };
        },
        removeItem: (agent) => {
          return (index) => {
            agent.items.splice(index, 1);
            agent.items.forEach((item, index2) => item.key = index2);
          };
        }
      };
      return { possibleTypes, curries, schemas };
    };
    const createAgent = (matrix, ref, key, value, parent, params) => {
      const agent = { matrix, ref, key, value, parent };
      for (let functionName in matrix.curries) {
        agent[functionName] = matrix.curries[functionName](agent);
      }
      if (params != null) {
        Object.assign(agent, params);
      }
      agent.message = false;
      agent.schemaStatus = /* @__PURE__ */ new Map();
      agent.conditionalSchemaStatus = /* @__PURE__ */ new WeakMap();
      agent.conditionalRequiredFlag = /* @__PURE__ */ new Map();
      agent.eventListeners = {};
      for (let schema of matrix.schemas) {
        agent.schemaStatus.set(schema, 3);
        if (schema.isConditional) {
          agent.conditionalSchemaStatus.set(schema, 3);
        }
      }
      if (matrix.properties != null) {
        if (agent.value == null) {
          agent.value = value = {};
        }
        agent.properties = {};
        for (let propertyName in matrix.properties) {
          agent.properties[propertyName] = createAgent(
            matrix.properties[propertyName],
            value,
            propertyName,
            value[propertyName],
            agent
          );
        }
      }
      if (matrix.items != null) {
        if (agent.value == null) {
          agent.value = value = [];
        }
        if (value.length > 0) {
          agent.items = [];
          for (let index in value) {
            agent.items[index] = createAgent(matrix.items, value, index, value[index], agent);
          }
        } else {
          agent.items = [createAgent(matrix.items, value, 0, null, agent)];
        }
      }
      return agent;
    };
    const rootMatrix = getMatrix([resolvedRootSchema]);
    rootMatrix.createAgent = (data, params) => {
      const rootAgent = createAgent(rootMatrix, { data }, "data", data, null, params);
      return rootAgent;
    };
    return rootMatrix;
  };

  // ../js/catpow.schema/methods.jsx
  var methods_exports = {};
  __export(methods_exports, {
    extractDependencies: () => extractDependencies,
    find: () => find,
    getErrorMessage: () => getErrorMessage,
    getErrorMessageFormat: () => getErrorMessageFormat,
    getMatchedSchemas: () => getMatchedSchemas2,
    getMergedSchema: () => getMergedSchema,
    getMergedSchemaForValue: () => getMergedSchemaForValue,
    getPrimaryPropertyName: () => getPrimaryPropertyName,
    getResolvedSchema: () => getResolvedSchema,
    getSubSchema: () => getSubSchema,
    getType: () => getType,
    mergeSchema: () => mergeSchema,
    mergeSchemas: () => mergeSchemas,
    sanitize: () => sanitize,
    test: () => test
  });

  // ../js/catpow.schema/getErrorMessageFormat.jsx
  var getErrorMessageFormat = (key, schema) => {
    if (schema.message != null) {
      return schema.message;
    }
    if (schema.minimum != null || schema.maximum != null) {
      let message = "";
      if (schema.minimum != null) {
        message += schema.minimum + (schema.exclusiveMinimum ? "\u8D85" : "\u4EE5\u4E0A");
      }
      if (schema.maximum != null) {
        message += schema.maximum + (schema.exclusiveMaximum ? "\u672A\u6E80" : "\u4EE5\u4E0B");
      }
      message += "\u306E\u6570\u5024\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044";
      return message;
    }
    if (schema.exclusiveMinimum != null || schema.exclusiveMaximum != null) {
      let message = "";
      if (schema.exclusiveMinimum != null) {
        message += schema.exclusiveMinimum + "\u8D85";
      }
      if (schema.exclusiveMaximum != null) {
        message += schema.exclusiveMinimum + "\u672A\u6E80";
      }
      message += "\u306E\u6570\u5024\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044";
      return message;
    }
  };

  // ../js/catpow.schema/getErrorMessage.jsx
  var getErrorMessage = (key, schema) => {
    return getErrorMessageFormat(schema).replace(/{\w+}/g, (matches) => {
      const key2 = matches.slice(1, -1);
      if (schema[key2] != null) {
        return schema[key2];
      }
      return matches;
    });
  };

  // ../js/catpow.schema/getPrimaryPropertyName.jsx
  var getPrimaryPropertyName = (schema, rootSchema) => {
    if (getType(schema, rootSchema) !== "object") {
      return null;
    }
    const mergedSchema = getMergedSchema(schema, rootSchema);
    if (mergedSchema.properties["@type"] != null) {
      return "@type";
    }
    return Object.keys(mergedSchema.properties).find((key) => mergedSchema.properties[key].enum != null);
  };

  // ../js/catpow.schema/index.jsx
  window.Catpow.schema = main;
  Object.Assign(window.Catpow.schema, consts_exports, methods_exports);
})();
