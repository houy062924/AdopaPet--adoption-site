import React from "react";    
import {renderAdoptionStatusButton} from "./renderadoptionstatusbutton";

test('render correct status button', () => {
  expect (renderAdoptionStatusButton(0)).toEqual(
    <div
      className="adoptButton">
        Start adoption process
    </div>
  )
  expect (renderAdoptionStatusButton(1)).toEqual(
    <div
      className="pendingButton">
        Pending
    </div>
  )
  expect (renderAdoptionStatusButton(2)).toEqual(
    <div
      className="acceptedButton">
        Application accepted
    </div>
  )
});