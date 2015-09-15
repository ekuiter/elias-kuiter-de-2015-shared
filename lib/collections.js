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
  url: {
    type: String,
    label: "URL"
  },
  imageUrl: {
    type: String,
    label: "Image URL"
  },
  categorySlug: {
    type: String,
    label: "Category",
    autoform: {
      options: function() {
        return _.map(Categories.find().fetch(), function(category) {
          return {
            label: category.title,
            value: category.slug
          };
        });
      }
    }
  }
};

// inside the frontend autoform is not available, this prevents Collection2 from crashing
if (_.isEmpty(Package["aldeed:autoform"]))
  delete projectSchema.categorySlug.autoform;

Schemas.Project = new SimpleSchema(projectSchema);

Schemas.Category = new SimpleSchema({
  title: {
    type: String,
    label: "Title"
  },
  slug: {
    type: String,
    label: "Slug"
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
    return Projects.find({ categorySlug: this.slug });
  }
});