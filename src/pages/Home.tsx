import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
const logo = "../../assets/blocks.png"
declare const window: any;

const Home: React.FC = () => {
  const history = useHistory();

  const onVerify = () => {
    history.replace("/fetch");
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark">
          <IonTitle slot="start">
            <img className="logo" src={logo} />
          </IonTitle>
          <IonButton size="small" className="btn" color="danger" slot="end" onClick={onVerify}>Get Metadata</IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent color="dark">
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
