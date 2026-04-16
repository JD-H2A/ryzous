module {
  public type Severity = { #Critical; #High; #Medium; #Low };

  public type ProjectStatus = { #Fixed; #InProgress };

  public type Project = {
    id : Nat;
    targetName : Text;
    vulnerabilityType : Text;
    severity : Severity;
    description : Text;
    beforeCode : Text;
    afterCode : Text;
    status : ProjectStatus;
    category : Text;
  };
};
