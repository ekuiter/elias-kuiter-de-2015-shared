Meteor.publish("projectsWithDetails", function() {
  if (!this.userId)
    this.error(new Meteor.Error(401));
  return Projects.find();
});

Meteor.publish("categories", function() {
  return Categories.find();
});

Meteor.publish("projectsInCategory", function(categorySlug) {
  check(categorySlug, String);
  return Projects.find({ categorySlug: categorySlug }, {
    fields: { title: 1, slug: 1, categorySlug: 1, order: 1, imageIds: 1 }
  });
});

Meteor.publish("project", function(categorySlug, projectSlug) {
  check(categorySlug, String);
  check(projectSlug, String);
  return Projects.find({ categorySlug: categorySlug, slug: projectSlug }, { fields: { description: 0 } });
});