import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';
import Card from "../components/Card";



function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  return (
    <Layout title="Homepage" description="EigenDA Documentation">
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
          EigenDA Documentation
        </h1>
        <section className={styles.features}>
          <div className="container">
            <div className="row cards__container">

              <Card
                to="overview"
                header={{
                  label: "Overview"
                }}
                body={{
                  label: "Start your journey with an overview of the EigenDA protocol"
                }}
              />

              <Card
                to="integrations-guides/dispersal/api-documentation/overview"
                header={{
                  label: "Learn: Network API Reference"
                }}
                body={{
                  label: "These pages document the details of how to integrate with EigenDA"
                }}
              />

              <Card
                to="integrations-guides/dispersal/quick-start"
                header={{
                  label: "Disperse your first blob"
                }}
                body={{
                  label: "Learn how EigenDA works by dispersing and retrieving a blob on the command line"
                }}
              />

              <Card
                to="integrations-guides/rollup-guides/op-stack/"
                header={{
                  label: "Launch an OP Stack Rollup"
                }}
                body={{
                  label: "Ready to launch a rollup on EigenDA? Get started here"
                }}
              />

              <Card
                to="operator-guides/overview"
                header={{
                  label: "Run an EigenDA node"
                }}
                body={{
                  label: "Look here for docs on spinning up an EigenDA node"
                }}
              />

              <Card
                to="https://forms.gle/CMSJTxQPXfG5HTQQ7"
                header={{
                  label: "Register for EigenDA Mainnet"
                }}
                body={{
                  label: "EigenDA Mainnet will soon be permissionless; until then please register here to launch your rollup"
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
