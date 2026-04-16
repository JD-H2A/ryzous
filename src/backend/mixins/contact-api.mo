import ContactTypes "../types/contact";
import CommonTypes "../types/common";
import ContactLib "../lib/contact";
import List "mo:core/List";

mixin (
  submissions : List.List<ContactTypes.ContactSubmission>,
) {
  public shared func submitContact(
    input : ContactTypes.ContactInput
  ) : async CommonTypes.Result<ContactTypes.ContactSubmission> {
    ContactLib.submit(submissions, submissions.size(), input);
  };

  public query func getContacts() : async [ContactTypes.ContactSubmission] {
    ContactLib.getAll(submissions);
  };
};
