Package.describe({
  name: "ekuiter:elias-kuiter-de-shared",
  version: "0.50.0",
  summary: "Code for elias-kuiter.de shared by frontend and backend",
  documentation: null
});

Package.onUse(function(api) {
  api.versionsFrom("1.1.0.3");
  api.use(["underscore", "aldeed:collection2@2.5.0", "dburles:collection-helpers@1.0.3", "fourseven:scss@3.2.0",
  "cfs:standard-packages@0.5.9", "cfs:gridfs@0.0.33"]);
  api.use(["aldeed:moment-timezone@0.4.0", "chuangbo:marked@0.3.5"], "server");
  api.imply(["cfs:standard-packages", "cfs:gridfs"]);
  api.addFiles(["lib/collections.js"]);
  api.addFiles(["client/images.js"], "client");
  api.addFiles(["server/publications.js", "server/timezone.js"], "server");
  api.export("Projects");
  api.export("Categories");
  api.export("Images");
  api.export("Pictures", "client");
  api.export("ImageStore", "server");
  api.export("Timezone", "server");
});