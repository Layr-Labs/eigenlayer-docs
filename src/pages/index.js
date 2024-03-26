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
          <h1
            align="center"
            title="tagline"
            style={{
              fontWeight: "700",
              marginBottom: "0px",
              fontSize: "x-large",
            }}
          >
            Welcome to the EigenLayer Documentation Site
          </h1>
          <section className={styles.features}>
            <div className="container">
              <div className="row cards__container">
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
                    label:"Learn how to run an EigenLayer node, and set up to operate for AVSs."
                  }}
                />
  

                <Card
                  to="eigenlayer/avs-guides/avs-developer-guide"
                  header={{
                    label:"Guides for AVS Developers"
                  }}
                  body={{
                    label:"Learn how to design, build, and launch an AVSs (Actively Validated Services) using EigenLayer restaking."
                  }}
                />


                <Card
                  to="eigenda/overview"
                  header={{
                    label:"EigenDA Resources for Rollups and Operators"
                  }}
                  body={{
                    label:"Guides for rollup developers to integrate EigenDA, and for EigenLayer operators to join the EigenDA network."
                  }}
                />


                <Card
                  to="status"
                  header={{
                    label:"Platform Status"
                  }}
                  body={{
                    label:"Outages, Status and Resolution details."
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
