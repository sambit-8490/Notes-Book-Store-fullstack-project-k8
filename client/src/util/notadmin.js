// client/src/util/notadmin.js

import Swal from 'sweetalert2';

import { currentUser } from "./currentUser";

export function notadmin() {

  if (currentUser?.role === "user") {

    Swal.fire({
      title: `Sorry ${currentUser.name}`,
      text: "You don't have permission to access this page",
      icon: "warning",
      confirmButtonColor: '#3085d6',
    }).then(() => {

      window.location.href = "/";

    });

  }

}
