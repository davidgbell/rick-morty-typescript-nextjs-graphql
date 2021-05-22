import { Layout } from '../components/Layout';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <Layout title='home'>
      <main className={styles.main}>
        <h1>Rick and Morty</h1>
      </main>
    </Layout>
  );
}
