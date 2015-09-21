Package.describe({
  name: "ekuiter:elias-kuiter-de-shared",
  version: "0.52.0",
  summary: "Code for elias-kuiter.de shared by frontend and backend",
  documentation: null
});

Package.onUse(function(api) {
  api.versionsFrom("1.1.0.3");
  api.use(["underscore", "aldeed:collection2@2.5.0", "dburles:collection-helpers@1.0.3", "fourseven:scss@3.2.0",
  "cfs:standard-packages@0.5.9"]);
  api.use(["aldeed:moment-timezone@0.4.0", "chuangbo:marked@0.3.5"], "server");
  api.imply(["cfs:standard-packages"]);
  api.addFiles(["lib/collections.js"]);
  api.addFiles(["server/publications.js", "server/timezone.js"], "server");
  api.export("Projects");
  api.export("Categories");
  api.export("Timezone", "server");
});