import React from "react";

export default function Footer() {
  return (
    <div className="footer-bg">
      <div fluid="true" className="">
        <div>
          <div >
            <h5 className="footer-top">Footer Content</h5>
            <p>
              Here you can use rows and columns here to organize your footer
              content.
            </p>
          </div>
          <div className="flex">
            <h5 className="">Links</h5>
            <ul className="clean-list">
              <li className="">
                <a href="#!">Link 1</a>
              </li>
              <li className="">
                <a href="#!">Link 2</a>
              </li>
              <li className="">
                <a href="#!">Link 3</a>
              </li>
              <li className="">
                <a href="#!">Link 4</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="">
        <div >
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.eventer.com"> eventer.com </a>
        </div>
      </div>
    </div>
  );
}
