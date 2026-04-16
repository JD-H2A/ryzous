module {
  public type ContactSubmission = {
    id : Nat;
    name : Text;
    email : Text;
    message : Text;
    timestamp : Int;
  };

  public type ContactInput = {
    name : Text;
    email : Text;
    message : Text;
  };
};
