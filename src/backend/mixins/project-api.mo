import ProjectTypes "../types/project";
import ProjectLib "../lib/project";
import List "mo:core/List";

mixin (projects : List.List<ProjectTypes.Project>) {
  public query func getProjects() : async [ProjectTypes.Project] {
    ProjectLib.getAll(projects);
  };

  public query func getProject(id : Nat) : async ?ProjectTypes.Project {
    ProjectLib.getById(projects, id);
  };
};
