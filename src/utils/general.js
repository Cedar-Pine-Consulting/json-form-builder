import { toast } from "react-toastify";

export const formatStatus = (value) => {
  if (value) return "Active";
  return "Inactive";
};

export const capitalizeFirstLetter = (string = null) => {
  if (string === null) return;
  return string.charAt(0).toUpperCase() + string.slice(1);
};
export const groupBy = (arr, criteria) =>
  arr.reduce((obj, item) => {
    // Check if the criteria is a function to run on the item or a property of it
    const key =
      typeof criteria === "function" ? criteria(item) : item[criteria];

    // If the key doesn't exist yet, create it
    if (!Object.prototype.hasOwnProperty.call(obj, key)) {
      obj[key] = [];
    }

    // Push the value to the object
    obj[key].push(item);

    // Return the object to the next item in the loop
    return obj;
  }, {});

export const handleLogout = (navigate) => {
  toast.success("Successfully Signed Out!");
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  // remove SSO cookies
  // TODO: stash in constants
  document.cookie =
    "plnet:token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie =
    "plnet:user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  navigate("/login", { replace: true });
};
