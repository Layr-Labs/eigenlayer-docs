import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Docs and Specs Unite!',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        We can combine technical documentation (aka protoocl specs) and docs.eigenlayer.xyz into one content repository.
      </>
    ),
  },
  {
    title: 'Easy for Eng team to Use',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Docusaurus leverages native markdown fordocs, git version control for better clarity and collaboration, and versioning of our docs.
      </>
    ),
  },
  {
    title: 'All the cool kids are doing it',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Most of&nbsp; 
        <a href="https://docs.google.com/document/d/1iGDJd-f8Cc0SG0XHcfRu17vleAm8_l-nsZK--5bKf0g/edit#bookmark=kix.6kzc8y4y16t4">
    our peers use docusaurus.
    </a>
      </>
    ),
  }
  
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
