module.exports = require("protobufjs").newBuilder({})['import']({
  "package": "protobuf",
  "messages": [{
    "name": "MoveMsg",
    "fields": [{
        "rule": "required",
        "type": "int32",
        "name": "typeid",
        "id": 1,
        "options": {
          "default": 0
        }
      },
      {
        "rule": "required",
        "type": "int32",
        "name": "divid",
        "id": 2
      },
      {
        "rule": "required",
        "type": "int32",
        "name": "x",
        "id": 3
      },
      {
        "rule": "required",
        "type": "int32",
        "name": "y",
        "id": 4
      }
    ]
  }]
}).build();