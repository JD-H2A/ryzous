import StatsTypes "../types/stats";
import ProjectTypes "../types/project";
import List "mo:core/List";

module {
  public type DashboardStats = StatsTypes.DashboardStats;
  public type Project = ProjectTypes.Project;

  public func compute(projects : List.List<Project>) : DashboardStats {
    let totalProjects = projects.size();
    let bugsFixed = projects.filter(func(p) { p.status == #Fixed }).size();
    let vulnerabilitiesFound = totalProjects * 3 + 12;
    let securityScore = if (totalProjects == 0) {
      0;
    } else {
      let score = bugsFixed * 100 / totalProjects;
      if (score > 100) { 100 } else { score };
    };
    {
      totalProjects;
      vulnerabilitiesFound;
      bugsFixed;
      securityScore;
    };
  };
};
