import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';
import Card from "../components/Card";

function Home() {
    const context = useDocusaurusContext();
    const { siteConfig = {} } = context;
  
    return (
      <Layout title="Homepage" description="EigenLayer Documentation">
        <main className={styles.main}>
          <br />
          <section className={styles.features}>
            <div className="container">
              <h1
              title="tagline"
              className="landing-tagline"
            >
              Welcome to the EigenLayer Documentation Site
            </h1>
              <div className="grid-container">
                <Card
                  to="eigenlayer/overview"
                  header={{
                    label:"Intro to EigenLayer"
                  }}
                  body={{
                    label:"Start your journey with an overview of the protocol including key terms, features, and whitepaper."
                  }}
                />
  
                <Card
                  to="restakers/concepts/overview"
                  header={{
                    label:"Restakers"
                  }}
                  body={{
                    label:"Understand the different ways to restake, including with LSTs (liquid) and EigenPods (natively)."
                  }}
                />
  
                <Card
                  to="operators/concepts/operator-introduction"
                  header={{
                    label:"Node Operators"
                  }}
                  body={{
                    label:"Learn how to run an EigenLayer node and set up to operate for AVSs."
                  }}
                />
  

                <Card
                  to="developers/Concepts/avs-developer-guide"
                  header={{
                    label:"Developers"
                  }}
                  body={{
                    label:"Learn how to design, build, launch, and use an AVS (Autonomous Verifiable Service)."
                  }}
                />


                <Card
                  to="eigenlayer/concepts/rewards/rewards-concept"
                  header={{
                    label:"Rewards"
                  }}
                  body={{
                    label:"Learn about how to configure and claim Rewards."
                  }}
                />

                <Card
                  to="eigenlayer/resources/learning-resources"
                  header={{
                    label:"Resources"
                  }}
                  body={{
                    label:"Materials for deeper dives on the EigenLayer platform."
                  }}
                />



              </div>
            </div>
          </section>
        </main>

      </Layout>
    );
  }
  
  export default Home;
