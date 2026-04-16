import ContactTypes "types/contact";
import ProjectTypes "types/project";
import ProjectLib "lib/project";
import List "mo:core/List";
import ContactApiMixin "mixins/contact-api";
import ProjectApiMixin "mixins/project-api";
import StatsApiMixin "mixins/stats-api";

actor {
  let submissions = List.empty<ContactTypes.ContactSubmission>();
  let projects = List.empty<ProjectTypes.Project>();

  do {
    ProjectLib.seedProjects(projects);
  };

  include ContactApiMixin(submissions);
  include ProjectApiMixin(projects);
  include StatsApiMixin(projects);
};
