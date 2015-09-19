Projects = new Mongo.Collection("projects");
Categories = new Mongo.Collection("categories");

var Schemas = {};

var projectSchema = {
  title: {
    type: String,
    label: "Title"
  },
  slug: {
    type: String,
    label: "Slug"
  },
  order: {
    type: Number,
    label: "Order",
    defaultValue: 999
  },
  categorySlug: {
    type: String,
    label: "Category",
    autoform: {
      options: function() {
        return _.map(Categories.find().fetch(), function(category) {
          return { label: category.title, value: category.slug };
        });
      }
    }
  },
  description: {
    type: String,
    label: "Description",
    autoform: {
      rows: 10
    }
  },
  descriptionHtml: {
    type: String,
    optional: true,
    autoValue: function() {
      var description = this.field("description");
      if (Meteor.isServer && description.isSet)
        return marked(description.value);
    }
  },
  images: {
    type: [String],
    label: "Images",
    minCount: 1
  },
  "images.$": {
    regEx: SimpleSchema.RegEx.Url
  },
  actions: {
    type: [Object],
    label: "Actions",
    optional: true
  },
  "actions.$.title": {
    type: String,
    label: "Title",
    defaultValue: "Website ansehen"
  },
  "actions.$.url": {
    type: String,
    label: "URL",
    regEx: SimpleSchema.RegEx.Url,
    defaultValue: "http://"
  },
  githubRepository: {
    type: String,
    label: "GitHub repository",
    optional: true
  }
};

// inside the frontend autoform is not available, this prevents Collection2 from crashing
if (_.isEmpty(Package["aldeed:autoform"])) {
  delete projectSchema.categorySlug.autoform;
  delete projectSchema.description.autoform;
}

Schemas.Project = new SimpleSchema(projectSchema);

Schemas.Category = new SimpleSchema({
  title: {
    type: String,
    label: "Title"
  },
  slug: {
    type: String,
    label: "Slug"
  },
  order: {
    type: Number,
    label: "Order"
  }
});

Projects.attachSchema(Schemas.Project);
Categories.attachSchema(Schemas.Category);

Projects.helpers({
  category: function() {
    return Categories.findOne({ slug: this.categorySlug });
  }
});

Categories.helpers({
  projects: function() {
    return Projects.find({ categorySlug: this.slug }, { sort: { order: 1 } });
  }
});