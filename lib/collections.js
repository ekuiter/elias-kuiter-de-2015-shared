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
  imageIds: {
    type: [String],
    label: "Images",
    minCount: 1
  },
  "imageIds.$": {
    autoform: {
      afFieldInput: {
        type: "fileUpload",
        collection: "Images",
        accept: "image/*"
      }
    }
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
  },
  twoColumnLayout: {
    type: Boolean,
    label: "Two-column layout",
    defaultValue: false
  }
};

// inside the frontend autoform is not available, this prevents Collection2 from crashing
if (_.isEmpty(Package["aldeed:autoform"])) {
  delete projectSchema.categorySlug.autoform;
  delete projectSchema.description.autoform;
  delete projectSchema["imageIds.$"].autoform;
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
  },
  imageUrl: function(imageNumber, store) {
    imageNumber = imageNumber || 1;
    var image = Images.findOne(this.imageIds[imageNumber - 1]);
    if (!image)
      return "http://elias-kuiter.de/i/empty.gif";
    return image.url({ store: store });
  }
});

Categories.helpers({
  projects: function() {
    return Projects.find({ categorySlug: this.slug }, { sort: { order: 1 } });
  }
});