import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import styles from "./HomepageFeatures.module.css";
import Translate from "@docusaurus/Translate";

function Card({ to, header, body, externalIcon = false }) {
  /*
  Both the `header` and `body` expect an object with the following type
  header = {
    label: String, //
  }
  */

  return (
    <div className={clsx("col col--4 landing-link-container", styles.feature)}>
      <Link to={to} className="docs-landing-link">
        <div className="card__header link-body-header">
          <h3>
            {header.label}
          </h3>
        </div>
        <div className="link-body-container">
          <p>
            {body.label}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default Card;