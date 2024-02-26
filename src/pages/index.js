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
                  to="/build/subnet/hello-subnet"
                  header={{
                    label:"💡 Learn About EigenLayer"
                  }}
                  body={{
                    label:"Start your journey by reviewing an overview of the Eigenlayer ecosystem."
                  }}
                />
  
                <Card
                  to="intro"
                  header={{
                    label:"💙 Restake with EigenLayer"
                  }}
                  body={{
                    label:"Start your journey by reviewing an overview of the Eigenlayer ecosystem."
                  }}
                />
  
                <Card
                  to="/nodes/validate/add-a-validator"
                  header={{
                    label:"💻 Become an Operator"
                  }}
                  body={{
                    label:"Contribute to the EigenLayer ecosystem by running an Operator node."
                  }}
                />
  
  
                <Card
                  to="/nodes/validate/add-a-validator"
                  header={{
                    label:"🛠️ Build on EigenDA"
                  }}
                  body={{
                    label:"Integrate EigenDA into your rollup or Web3 application."
                  }}
                />


                <Card
                  to="/nodes/validate/add-a-validator"
                  header={{
                    label:"🚀 Launch Your AVS on EigenLayer"
                  }}
                  body={{
                    label:"Learn how to build your Web3 application as an AVS on EigenLayer."
                  }}
                />


                <Card
                  to="/nodes/validate/add-a-validator"
                  header={{
                    label:"📞 Platform Status"
                  }}
                  body={{
                    label:"Check the latest status of the EigenLayer app for any known outages."
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