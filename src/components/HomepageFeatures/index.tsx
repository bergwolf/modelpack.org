import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Standardized Model Packaging',
    description: (
      <>
        ModelPack provides a standardized format for packaging machine learning models,
        making it easier to distribute and deploy models across different platforms.
      </>
    ),
  },
  {
    title: 'Cloud Native',
    description: (
      <>
        Built with cloud-native principles, ModelPack integrates seamlessly with
        Kubernetes and other CNCF ecosystem tools for scalable model deployment.
      </>
    ),
  },
  {
    title: 'Framework Agnostic',
    description: (
      <>
        Works with any machine learning framework, allowing you to package and
        distribute models regardless of how they were trained.
      </>
    ),
  },
];

function Feature({title, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
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
