Package.describe({
  name: "ekuiter:elias-kuiter-de-shared",
  version: "0.28.0",
  summary: "Code for elias-kuiter.de shared by frontend and backend",
  documentation: null
});

Package.onUse(function(api) {
  api.versionsFrom("1.1.0.3");
  api.use("underscore");
  api.use("aldeed:collection2@2.5.0");
  api.use("dburles:collection-helpers@1.0.3");
  api.use("fourseven:scss@3.2.0");
  api.use("aldeed:moment-timezone@0.4.0", "server");
  api.addFiles("lib/collections.js");
  api.addFiles(["server/publications.js", "server/timezone.js"], "server");
  api.export("Projects");
  api.export("Categories");
  api.export("Timezone");
});