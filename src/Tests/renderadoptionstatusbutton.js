import React from "react";

function renderAdoptionStatusButton(adoptionstatus) {

  switch (adoptionstatus) {
    case 0:
      return <div
              className="adoptButton">
                Start adoption process
             </div>

    case 1:
      return <div
              className="pendingButton">
                Pending
             </div>

    case 2:
      return <div
              className="acceptedButton">
                Application accepted
             </div>
  }
}

export { renderAdoptionStatusButton };