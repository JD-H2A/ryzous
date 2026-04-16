import ContactTypes "../types/contact";
import CommonTypes "../types/common";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public type ContactSubmission = ContactTypes.ContactSubmission;
  public type ContactInput = ContactTypes.ContactInput;
  public type Result<T> = CommonTypes.Result<T>;

  public func validateInput(input : ContactInput) : ?Text {
    let name = input.name.trim(#predicate(func(c) { c == ' ' }));
    let email = input.email.trim(#predicate(func(c) { c == ' ' }));
    let message = input.message.trim(#predicate(func(c) { c == ' ' }));

    if (name.size() == 0) {
      return ?"Name cannot be empty";
    };
    if (not email.contains(#char '@') or not email.contains(#char '.')) {
      return ?"Email must contain @ and a dot";
    };
    if (message.size() == 0) {
      return ?"Message cannot be empty";
    };
    null;
  };

  public func submit(
    submissions : List.List<ContactSubmission>,
    nextId : Nat,
    input : ContactInput,
  ) : Result<ContactSubmission> {
    switch (validateInput(input)) {
      case (?err) { #err(err) };
      case null {
        let trimmed : ContactInput = {
          name = input.name.trim(#predicate(func(c) { c == ' ' }));
          email = input.email.trim(#predicate(func(c) { c == ' ' }));
          message = input.message.trim(#predicate(func(c) { c == ' ' }));
        };
        let submission : ContactSubmission = {
          id = nextId;
          name = trimmed.name;
          email = trimmed.email;
          message = trimmed.message;
          timestamp = Time.now();
        };
        submissions.add(submission);
        #ok(submission);
      };
    };
  };

  public func getAll(submissions : List.List<ContactSubmission>) : [ContactSubmission] {
    submissions.toArray();
  };
};
