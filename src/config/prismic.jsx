import * as prismic from "@prismicio/client";

export const client = prismic.createClient("haxtera", {
  accessToken:
    "MC5aZGNxS2hFQUFCOEFhTjdI.77-977-9Ne-_vXR677-9d--_ve-_vQEpXUXvv73vv73vv71hRe-_vUcYUBjvv71U77-9bDlS77-977-9",
  routes: [
    {
      type: "home",
      path: "/",
    },
  ],
});
