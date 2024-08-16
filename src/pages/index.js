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
              style={{
                fontWeight: "700",
                marginBottom: "0px",
                fontSize: "x-large",
                paddingTop: "55px",
                paddingBottom: "10px",
              }}
            >
              Welcome to the EigenLayer Documentation Site
            </h1>
              <div className="row cards__container docs-landing">
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
                  to="eigenlayer/restaking-guides/restaking-user-guide/"
                  header={{
                    label:"Guides for Restakers"
                  }}
                  body={{
                    label:"Understand the different ways to restake, including with LSTs (liquid) and EigenPods (natively)."
                  }}
                />
  
                <Card
                  to="eigenlayer/operator-guides/operator-introduction"
                  header={{
                    label:"Guides for Node Operators"
                  }}
                  body={{
                    label:"Learn how to run an EigenLayer node and set up to operate for AVSs."
                  }}
                />
  

                <Card
                  to="eigenlayer/avs-guides/avs-developer-guide"
                  header={{
                    label:"Guides for AVS Developers"
                  }}
                  body={{
                    label:"Learn how to design, build, and launch an AVS (Actively Validated Service)."
                  }}
                />


                <Card
                  to="eigenlayer/rewards-claiming/rewards-claiming-overview"
                  header={{
                    label:"Claim AVS Rewards"
                  }}
                  body={{
                    label:"Instructions for Stakers and Operators to claim rewards from AVS submissions."
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
