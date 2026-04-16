import StatsTypes "../types/stats";
import ProjectTypes "../types/project";
import StatsLib "../lib/stats";
import List "mo:core/List";

mixin (projects : List.List<ProjectTypes.Project>) {
  public query func getDashboardStats() : async StatsTypes.DashboardStats {
    StatsLib.compute(projects);
  };
};
